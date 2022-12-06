
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSidenavContainer } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, startWith } from "rxjs/operators";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger80ms } from "src/@vex/animations/stagger.animation";
import { ConfigService } from "src/@vex/config/config.service";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { LayoutService } from "src/@vex/services/layout.service";
import { checkRouterChildsData } from "src/@vex/utils/check-router-childs-data";
import { RespuestaCURP } from "src/app/modelos/respuestaCURP.model";
import { ArchivoAspirante } from "src/app/modelos/respuesta.model";
import { RenapoService } from "src/app/servicios/renapo.service";

import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DatePipe, ViewportScroller } from "@angular/common";
import { ArchivoServices } from "src/app/servicios/archivos.service";
import { SwalServices } from "src/app/servicios/sweetalert2.services";
import { VariablesService } from "src/app/servicios/variableGL.service";
import { el } from "date-fns/locale";
import { VisorComponent } from "src/app/visor/visor.component";
import { PreregistroAspiranteService } from "src/app/servicios/preregistro-aspirante.service";
import {
  CatalogoCertificadoBachillerato,
  CatalogoClasificacionDiscapacidad,
  CatalogoDeporte,
  CatalogoDeporteDiscapacidad,
  CatalogoDocumentoNacionalidad,
  CatalogoDocumentos,
  CatalogoEstadoCivil,
  CatalogoFrecuenciaPractica,
  CatalogoGenero,
  CatalogoInstitucionDiscapacidad,
  CatalogoNivelPractica,
  CatalogoPais,
  CatalogoParticipacionPractica,
  CatalogoSeguridadSocial,
  CatalogoTiempoPractica,
  CatalogoTipoContacto,
  CatalogoTipoDiscapacidad,
  CatalogoTipoSanguineo,
  CatalogoUbicacion,
  PreRegistroComplex,
  TblContacto,
  TblDatosAcademico,
  TblDiscapacidad,
  TblDocAspiranteComplex,
  TblDomicilio,
} from "src/app/modelos/ModelosPreregistro";
import { PreRegistroSelect} from "src/app/modelos/ModelosPreregistroSelect"
import { Observable } from "rxjs";
import { ValidacionDocumentoComponent } from "./validacion-documento/validacion-documento.component";


@Component({
  selector: 'vex-carga-documentos-aspirante',
  templateUrl: './carga-documentos-aspirante.component.html',
  styleUrls: ['./carga-documentos-aspirante.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class CargaDocumentosAspiranteComponent  implements OnInit, AfterViewInit {
  token: string | undefined;
  //@ViewChild(MatTable) table: MatTable<any>;

  //tablaContacto
  @ViewChild("tablaContacto") tablaContacto: MatTable<any>;
  @ViewChild("tablaDocs") tablaDocs: MatTable<any>;
  @ViewChild("tablaDocumentosDos") tablaDocs2: MatTable<any>;

  //tablaDocs
  IDASPIRANTE: number;

  anio = new Date().getFullYear();

  showFiller = false;

  isLayoutVertical$ = this.configService.config$.pipe(
    map((config) => config.layout === "vertical")
  );
  isBoxed$ = this.configService.config$.pipe(map((config) => config.boxed));
  isToolbarFixed$ = this.configService.config$.pipe(
    map((config) => config.toolbar.fixed)
  );
  isFooterFixed$ = this.configService.config$.pipe(
    map((config) => config.footer.fixed)
  );
  isFooterVisible$ = this.configService.config$.pipe(
    map((config) => config.footer.visible)
  );
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isDesktop$ = this.layoutService.isDesktop$;

  patronCP = "^[0-9]{5}$";
  patronNSS = "^[0-9]{11}$";
  maskNSS = [ /\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/];

  scrollDisabled$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(
        this.router.routerState.root.snapshot,
        (data) => data.scrollDisabled
      )
    )
  );

  containerEnabled$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(
        this.router.routerState.root.snapshot,
        (data) => data.containerEnabled
      )
    )
  );

  searchOpen$ = this.layoutService.searchOpen$;
  layoutCtrl = new UntypedFormControl("boxed");

  FormularioNacionalidad: FormGroup;
  FormularioDatosGenerales: FormGroup;
  FormularioContacto: FormGroup;
  FormularioDireccion: FormGroup;
  FormularioEstudios: FormGroup;
  FormularioDiscapacidad: FormGroup;
  FormularioPoliticas: FormGroup;
  FormularioDocumentos: FormGroup;
  FormularioDocumentos2: FormGroup;
  public files: any[] = [];
  pipe = new DatePipe("en-US");
  archivos: ArchivoAspirante[] = [];
  archivo: ArchivoAspirante = {};
  dataSource: any[];
  dataSourceDocumentos: any[];

  displayedColumns: string[] = [
    "tipocontacto",
    "contacto",
    "adicional",
    //"acciones",
  ];
  displayedColumnsDocs: string[] = ["documento", "obligatorio",/*  "correcto", */ "visualizar", "estatus", "seleccionar"];

  //DEFAULT
  esMexicano = true;
  tieneLicenciatura = false;
  tieneDiscapacidad = false;
  curpValido = false;

  selectedFiles: Array<any>;
  listaSexos: CatalogoGenero[] = [];


  listaMunicipio: CatalogoUbicacion[] = [];
  listaColonia: CatalogoUbicacion[] = [];

  listaDeportes: CatalogoDeporte[] = [];
  listaNacionalidades: CatalogoPais[] = [];
  listaEstadoCivil: CatalogoEstadoCivil[] = [];
  listaIngresoFamiliar = [
    { id: 1, ingreso: "1,000 - 3,000" },
    { id: 2, ingreso: "3,000 - 6,000" },
  ];
  listaTipoSanguineo: Array<CatalogoTipoSanguineo> = [];

  listaTipoContacto: CatalogoTipoContacto[] = [];

/*   listaEstadoBachilleres = [
    { id: 1, estadobachilleres: "Estado de México" },
    { id: 2, estadobachilleres: "Ciudad de México" },
  ]; */

  listaEstadoBachilleres =  []

  listaTipoCertificado: CatalogoCertificadoBachillerato[] = [];


  listaEstadoLicenciatura = [];
  /* listaEstadoLicenciatura = [
    { id: 1, estadolicenciatura: "Estado de México" },
    { id: 2, estadolicenciatura: "Ciudad de México" },
  ]; */

  listaTiemproPractica: CatalogoTiempoPractica[] = [];
  listaFrecuencia: CatalogoFrecuenciaPractica[] = [];
  listaNivelAlcanzado: CatalogoNivelPractica[] = [];
  listaParticipandoEn: CatalogoParticipacionPractica[] = [];
  listaTipoDiscapacidad: CatalogoTipoDiscapacidad[] = [];
  listaDeporteClasifico: CatalogoDeporteDiscapacidad[] = [];
  listaClasificoDiscapacidad: CatalogoClasificacionDiscapacidad[] = [];
  listaInstitucionClasificoDiscapacidad: CatalogoInstitucionDiscapacidad[] = [];
  listaDocumentos: CatalogoDocumentos[] = [];
  listaTipoDocumentosNacionalidad: CatalogoDocumentoNacionalidad[] = [];
  listaSeguridadSocial: CatalogoSeguridadSocial[] = [];

  listaUbicacion: CatalogoUbicacion[] = [];
  listaEstados: string[] = [];
  preregistro: PreRegistroSelect;
  datosAspirante: any;


  filteredOptions: Observable<CatalogoPais[]>;

  columns: TableColumn<any>[] = [
    { label: "Documento", property: "name", type: "text", visible: true },
    { label: "Fecha", property: "actions", type: "text", visible: true },
    { label: "Ver", property: "ver", type: "button", visible: true },
    { label: "Eliminar", property: "eliminar", type: "button", visible: true },
  ];
  dataSource2: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  archivoSeleccionado: string;

  passwordInputType = "password";

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router,
    private servicioRenapo: RenapoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public matPaginatorIntl: MatPaginatorIntl,
    private cargaArchivosService: ArchivoServices,
    private swalService: SwalServices,
    private toastService: VariablesService,
    private preregistroService: PreregistroAspiranteService,
    private viewportScroller: ViewportScroller
  ) {


    this.datosAspirante = JSON.parse(localStorage.getItem("aspirante"))[0];
    this.IDASPIRANTE = this.datosAspirante.id;
    this.token = undefined;

    this.FormularioDocumentos2 = this.fb.group({
      documentos_: this.fb.array([]),
    });

/*  */
    this.FormularioNacionalidad = this.fb.group({
      deporte: [null, Validators.required],
      nacionalidad: [null, Validators.required],
      curp: [
        null,
        [
          Validators.required,
          Validators.minLength(18),
          Validators.maxLength(18),
        ],
      ],
      tipodocumentonacionalidad: [null],
      documentodigital: [null],
      numerodocumentonacionalidad: [null]
    });

    this.FormularioNacionalidad.disable();

    this.FormularioDatosGenerales = this.fb.group({
      nombre: [null, [Validators.required]],
      paterno: [null, [Validators.required]],
      materno: [null],
      estadocivil: [null, [Validators.required]],
      sexo: [null, [Validators.required]],
      fechanacimiento: [null, [Validators.required]],
      tiposanguineo: [null, [Validators.required]],
      ingresofamiliar: [null, [Validators.required]],
      seguridadsocial: [null, [Validators.required]],
      numeroseguridadsocial: [null, [Validators.required]],
    });

    //this.FormularioDatosGenerales.disable();

    this.FormularioContacto = this.fb.group({
      tipocontacto: [null, [Validators.required]],
      contacto: [null, [Validators.required]],
      adicional: [null],
    });

    this.FormularioContacto.disable();

    this.FormularioDireccion = this.fb.group({
      codigopostal: [
        { value: null, disabled: false },
        [Validators.required, Validators.pattern(this.patronCP)],
      ],
      estado: [{ value: null, disabled: true }, [Validators.required]],

      municipio: [{ value: null, disabled: true }, [Validators.required]],
      calle: [null, [Validators.required]],
      colonia: [{ value: null, disabled: false }, [Validators.required]],
      noext: [null, [Validators.required]],
      noint: [null],
      referencias: [null],
    });

    //this.FormularioDireccion.disable();

    this.FormularioEstudios = this.fb.group({
      nombrebachiller: [null,[Validators.required]],
      estadobachiller: [null,[Validators.required]],
      tipocertifica: [null,[Validators.required]],
      promediofinal: [null,[Validators.required]],
      tienelicenciatura: [null,[Validators.required]],
      nombrelicenciatura: [null],
      estadolicenciatura: [null],
      tiempopractica: [null,[Validators.required]],
      frecuencia: [null,[Validators.required]],
      nivelalcanzado: [null,[Validators.required]],
      participandoen: [null,[Validators.required]],
    });

    this.FormularioEstudios.disable();

    this.FormularioDiscapacidad = this.fb.group({
      tienediscapacidad: [null, [Validators.required]],
      tipodiscapacidad: [null, [Validators.required]],
      deporteclasifico: [null],
      institucionclasifico: [null],
      clasificodiscapacidad: [null],
    });

    this.FormularioDiscapacidad.disable();

    this.FormularioDocumentos = this.fb.group({
      basicfile: [null, [Validators.required]],
      tipoDocumento: [null, [Validators.required]],
      documentoSeleccionado: [null]
    });


  }



  public async obtenerPreregistro(){

    const respuesta = await this.preregistroService.obtenerPreregistroAspirante(this.IDASPIRANTE);
    return respuesta;
  }

  public async llenarFormularios(){
    const respuesta = await this.obtenerPreregistro();

    if(respuesta.exito){
      let PreRegistroSelect: PreRegistroSelect = respuesta.objeto;
      this.preregistro = respuesta.objeto;

      let pais = this.listaNacionalidades.find(
        (x) => x.iso.toUpperCase() == PreRegistroSelect.bovedaCatPaisesIso.toUpperCase()
      ).nombre;


      const estadoControl = this.FormularioDireccion.get("estado");
        const municipioControl = this.FormularioDireccion.get("municipio");

      if(PreRegistroSelect.curp){
        this.esMexicano = true;

        estadoControl.setValidators([Validators.required]);
        estadoControl.disable();

        municipioControl.setValidators([Validators.required]);
        municipioControl.disable();

      } else {
        this.esMexicano = false;

        estadoControl.clearValidators();
        estadoControl.enable();

        municipioControl.clearValidators();
        municipioControl.enable();
      }

      estadoControl.updateValueAndValidity();
      municipioControl.updateValueAndValidity();

      this.FormularioNacionalidad.patchValue({

		  deporte: PreRegistroSelect.catDeporteId,
		  //nacionalidad: PreRegistroSelect.bovedaCatPaisesIso,
      nacionalidad: pais,
		  curp: PreRegistroSelect.curp,
		  tipodocumentonacionalidad: PreRegistroSelect.catDocumentoNacionalidadId,
		  documentodigital: PreRegistroSelect.docNacionalidad,
      numerodocumentonacionalidad: PreRegistroSelect.numeroPasaporte
    }
      )

      this.FormularioDatosGenerales.patchValue({
        nombre: PreRegistroSelect.nombre,
        paterno: PreRegistroSelect.paterno,
        materno: PreRegistroSelect.materno,
        estadocivil: PreRegistroSelect.bovedaCatEstadoCivilId,
        sexo:  PreRegistroSelect.bovedaCatGeneroId,
        fechanacimiento:   PreRegistroSelect.fechaNacimiento,
        tiposanguineo:   PreRegistroSelect.tipoSanguineo,
        ingresofamiliar:   PreRegistroSelect.ingresoAprox,
        seguridadsocial:  PreRegistroSelect.bovedaCatSeguridadSocialId,
        numeroseguridadsocial:  PreRegistroSelect.numSeguridadSocial
      }
      );

      this.dataSource = [];

    PreRegistroSelect.tblContactos.forEach((contacto)=>{
      let con = {
        "tipocontacto": this.listaTipoContacto.find((x)=>x.id == contacto.bovedaCatTipoContactoId).tipo ,
        "contacto": contacto.contacto,
        "adicional": contacto.complemento
      }
      this.dataSource.push(con);
    });


      if(this.esMexicano){
        await this.obtenerCatalogoUbicacion(PreRegistroSelect.tblDomicilio.codigoPostal);
      }


      this.FormularioDireccion.patchValue(
       {
        codigopostal: PreRegistroSelect.tblDomicilio.codigoPostal,
      estado:  PreRegistroSelect.tblDomicilio.bovedaCatUbicaciongEstado,
      municipio:  PreRegistroSelect.tblDomicilio.bovedaCatUbicaciongMunicipio,
      calle:  PreRegistroSelect.tblDomicilio.calle,
      colonia:  PreRegistroSelect.tblDomicilio.colonia,
      noext:  PreRegistroSelect.tblDomicilio.noExterior,
      noint:  PreRegistroSelect.tblDomicilio.noInterior,
      referencias:  PreRegistroSelect.tblDomicilio.referencia
    }
      );


      this.FormularioEstudios.patchValue(
        {
          nombrebachiller: PreRegistroSelect.tblDatosAcademicos.escuela,
          estadobachiller: PreRegistroSelect.tblDatosAcademicos.bovedaCatUbicaciongEstadoBachillerato,
          tipocertifica: PreRegistroSelect.tblDatosAcademicos.catCertificadoBachilleratoId,
          promediofinal: PreRegistroSelect.tblDatosAcademicos.promedio,
          tienelicenciatura:  PreRegistroSelect.tblDatosAcademicos.tieneLicenciatura,
          nombrelicenciatura:  PreRegistroSelect.tblDatosAcademicos.licenciatura,
          estadolicenciatura:  PreRegistroSelect.tblDatosAcademicos.bovedaCatUbicaciongEstadoLicenciatura,
          tiempopractica:  PreRegistroSelect.tblDatosAcademicos.catTiempoPracticaId,
          frecuencia:      PreRegistroSelect.tblDatosAcademicos.catFrecuenciaPracticaId,
          nivelalcanzado:  PreRegistroSelect.tblDatosAcademicos.catNivelPracticaId,
          participandoen:  PreRegistroSelect.tblDatosAcademicos.catParticipacionPracticaId
    }
      );

      this.tieneLicenciatura = PreRegistroSelect.tblDatosAcademicos.tieneLicenciatura



      this.tieneDiscapacidad =  PreRegistroSelect.tblDiscapacidad ?  true : false;

      if(this.tieneDiscapacidad){
        await this.obtenerCatalogoClasificacionDiscapacidad(PreRegistroSelect.tblDiscapacidad.catDeporteDiscapacidadId);
      }

      this.FormularioDiscapacidad.patchValue(
        {
        tienediscapacidad: PreRegistroSelect.tblDiscapacidad ? true: false ,
        tipodiscapacidad:  PreRegistroSelect.tblDiscapacidad ? PreRegistroSelect.tblDiscapacidad.catTipoDiscapacidadId : null,
        deporteclasifico:  PreRegistroSelect.tblDiscapacidad ? PreRegistroSelect.tblDiscapacidad.catDeporteDiscapacidadId : null,
        institucionclasifico:  PreRegistroSelect.tblDiscapacidad ? PreRegistroSelect.tblDiscapacidad.catInstitucionDiscapacidadId : null,
        clasificodiscapacidad : PreRegistroSelect.tblDiscapacidad ? PreRegistroSelect.tblDiscapacidad.catClasificacionDiscapacidadId : null,
      });

//DESCOMENTAR
     const arrayFormGroup = [];
     this.listaDocumentos.forEach((documento) => {
       const formGroup: FormGroup = new FormGroup({});

       formGroup.addControl(
         "file",
         new FormControl(
          null,
           documento.obligatorio ? Validators.required : null
         )
        /*  new FormControl(
        { value: null, disabled: true}, documento.obligatorio ? Validators.required : null
         ) */
       );

       //



       formGroup.addControl("id", new FormControl(documento.id));
       formGroup.addControl("nombre", new FormControl(documento.nombre));

       if(this.preregistro.tblDocsAspirante_){

         formGroup.addControl("documentoAspiranteId", new FormControl((this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id)) ? this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id).id : 0));
         formGroup.addControl("token", new FormControl((this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id)) ? this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id).archivo : null));
         formGroup.addControl("estatus", new FormControl((this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id)) ? this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id).estatus : null));
       }else{
         formGroup.addControl("token", new FormControl(null));
         formGroup.addControl("documentoAspiranteId", new FormControl(0));
         formGroup.addControl("estatus", new FormControl(null));
       }


       formGroup.addControl(
         "obligatorio",
         new FormControl(documento.obligatorio)
       );
       arrayFormGroup.push(formGroup);
     });

     this.FormularioDocumentos2 = new FormGroup({
       documentos_: this.fb.array(arrayFormGroup),
     });




      /* this.FormularioPoliticas.patchValue(
        { "token": "03AIIukzi168k1zE9oU9QHc0mPXLavjmfOLjhdeTq0ubvfdctKs2Wjq57qp4xSw-IdAzRyLJ2E8gLy2pL2_pvDwKep-vUvpV9Ip5XVYFTckV7Fh2w2v8VqNWDdyOZIkwha3fPpZLDRBCBDWzPl6AsnaXgDEZcgxClTb7OkcW35Am5TzvkaHm-Z3fB3dkYt10jHKBxkXK5ohTSHIIbWuXLsP0udvE8bdE0NCpAjMyIT_Aju9hD6onE4l3Y0zdtDg66AYOnO9lqtgGLIFGJjCKpd4Gp1FgwBZNP0Gk_Dwk2yZS7pIRakW_iWltI05aTjfeXgDUMUNvGe6pCk3kC9Y51ZcAptj5vtMnBSveEyRV7sTgZ2wAUj395E3H_PNYeug-iuVtXcFFFmEwgw4vWNOAZaJo1bzx42hH0vjSwDXKIbbeLqkkpaQnL3N9Yuk499ZVpa7NvdpVKYhTeGpXR9ZwkeowL6dRedJgX6FrvhydLhmvsXT6TkuwR5gXDzV_Hth4DeotjtW8M9WHNRvA_lvIC_TTdGrUHX4PJ3nw", "aceptapoliticas": true }
      ); */

      this.actualizarTablaContactos();


      }

      this.onClick_('SeccionDocs')
  }


  public async actualizarDocumentos(){
    const respuesta = await this.obtenerPreregistro();

    if(respuesta.exito){
      let PreRegistroSelect: PreRegistroSelect = respuesta.objeto;
      this.preregistro = respuesta.objeto;

     const arrayFormGroup = [];
     this.listaDocumentos.forEach((documento) => {
       const formGroup: FormGroup = new FormGroup({});

       formGroup.addControl(
         "file",
         new FormControl(
          null,
           documento.obligatorio ? Validators.required : null
         )
        /*  new FormControl(
        { value: null, disabled: true}, documento.obligatorio ? Validators.required : null
         ) */
       );

       //



       formGroup.addControl("id", new FormControl(documento.id));
       formGroup.addControl("nombre", new FormControl(documento.nombre));

       if(this.preregistro.tblDocsAspirante_){

         formGroup.addControl("documentoAspiranteId", new FormControl((this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id)) ? this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id).id : 0));
         formGroup.addControl("token", new FormControl((this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id)) ? this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id).archivo : null));
         formGroup.addControl("estatus", new FormControl((this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id)) ? this.preregistro.tblDocsAspirante_.find((x)=>x.tblDocumentosId === documento.id).estatus : null));
       }else{
         formGroup.addControl("token", new FormControl(null));
         formGroup.addControl("documentoAspiranteId", new FormControl(0));
         formGroup.addControl("estatus", new FormControl(null));
       }


       formGroup.addControl(
         "obligatorio",
         new FormControl(documento.obligatorio)
       );
       arrayFormGroup.push(formGroup);
     });

     this.FormularioDocumentos2 = new FormGroup({
       documentos_: this.fb.array(arrayFormGroup),
     });
    }
      this.onClick_('SeccionDocs')
  }


  async ngOnInit() {
    //this.iniciarTablaDocumentosDos()
    this.iniciarTablaContacto();
    this.iniciarTablaArchivos();


//SE LLENA EL FORMULARIO


    this.FormularioDocumentos.clearValidators();
    this.FormularioEstudios.clearValidators();
    this.FormularioDatosGenerales.clearValidators();
    this.FormularioContacto.clearValidators();
    this.FormularioDireccion.clearValidators();
    this.FormularioEstudios.clearValidators();
    this.FormularioDiscapacidad.clearValidators();

    this.FormularioDocumentos.updateValueAndValidity();
    this.FormularioEstudios.updateValueAndValidity();
    this.FormularioDatosGenerales.updateValueAndValidity();
    this.FormularioContacto.updateValueAndValidity();
    this.FormularioDireccion.updateValueAndValidity();
    this.FormularioEstudios.updateValueAndValidity();
    this.FormularioDiscapacidad.updateValueAndValidity();

    await this.obtenerCatalogoDeporte();
    await this.obtenerCatalogoTipoSanguineo();
    await this.obtenerCatalogoDocumentoNacionalidad();
    await this.obtenerCatalogoCertificadoBachillerato();
    await this.obtenerCatalogoTiempoPractica();
    await this.obtenerCatalogoFrecuenciaPractica();
    await this.obtenerCatalogoNivelPractica();
    await this.obtenerCatalogoParticipacionPractica();
    await this.obtenerCatalogoTipoDiscapacidad();
    await this.obtenerCatalogoDeporteDiscapacidad();
    await this.obtenerCatalogoClasificacionDiscapacidad(1);
    await this.obtenerCatalogoInstitucionDiscapacidad();

    await this.obtenerCatalogoEstadoCivil();
    await this.obtenerCatalogoGenero();
    await this.obtenerCatalogoSeguridadSocial();
    await this.obtenerCatalogoTipoContacto();
    await this.obtenerCatalogoPais();

    await this.obtenerCatalogoEstado();
    await this.obtenerCatalogoDocumentos();

    /* const arrayFormGroup = [];
    this.listaDocumentos.forEach((documento) => {
      const formGroup: FormGroup = new FormGroup({});

      formGroup.addControl(
        "file",
        new FormControl(
          null,
          documento.obligatorio ? Validators.required : null
        )
      );
      formGroup.addControl("id", new FormControl(documento.id));
      formGroup.addControl("nombre", new FormControl(documento.nombre));
      formGroup.addControl("token", new FormControl(null));
      formGroup.addControl(
        "obligatorio",
        new FormControl(documento.obligatorio)
      );
      arrayFormGroup.push(formGroup);
    });

    this.FormularioDocumentos2 = new FormGroup({
      documentos_: this.fb.array(arrayFormGroup),
    });
 */
    this.filteredOptions = this.FormularioNacionalidad.get(
      "nacionalidad"
    ).valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );


    await this.llenarFormularios();


    this.formControlNacionalidadValueChanged();
    this.codigoPostalValueChanged();


    //lo utilizo ya que al parecer se atora la tabla de documentos y no se muestra nada
    this.cd.detectChanges();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  async verDocumento(archivo: ArchivoAspirante) {
    console.log("ver", archivo);
    let verArchivo = await this.cargaArchivosService.obtenerUrlCompleta(
      archivo.token
    );
    this.dialog
      .open(VisorComponent, {
        height: "80%",
        width: "90%",
        autoFocus: false,
        data: verArchivo,
      })
      .afterClosed()
      .subscribe(async (formulario: any) => {
        //this.ngOnInit();
        await this.actualizarDocumentos()
      });
  }

  eliminarDocumento(row: any) {
    console.log("clic eliminar", row);

    const index = this.archivos.indexOf(row);
    this.archivos.splice(index);
    this.actualizarTablaArchivos();
  }

  eliminarContacto(row: any) {
    console.log("clic eliminar", row);
    const index = this.dataSource.indexOf(row);
    this.dataSource.splice(index);

    if (this.dataSource.length > 0) {
      this.formularioContactoObligatorio(false);
    } else {
      this.formularioContactoObligatorio(true);
    }

    this.actualizarTablaContactos();
  }

  public formularioContactoObligatorio(habilitar: boolean) {
    const tipoContacto = this.FormularioContacto.get("tipocontacto");
    const contacto = this.FormularioContacto.get("contacto");
    if (habilitar) {
      tipoContacto.setValidators([Validators.required]);
      contacto.setValidators([Validators.required]);
      tipoContacto.updateValueAndValidity();
      contacto.updateValueAndValidity();
    } else {
      tipoContacto.clearValidators();
      contacto.clearValidators();
      tipoContacto.updateValueAndValidity();
      contacto.updateValueAndValidity();
    }
  }

  public async onFileChange(pFileList: FileList) {
    console.log("change archivo select", pFileList.item(0));
    if (pFileList.item(0).type == "application/pdf") {
      this.archivo.id = null;
      this.archivo.fecha = this.pipe.transform(Date.now(), "dd/MM/yyyy");
      this.archivo.name = pFileList.item(0).name;
      this.archivo.tamanio = pFileList.item(0).size.toString();
      this.archivo.tipo = pFileList.item(0).type;
      this.archivo.file = pFileList.item(0);
    } else {
      this.toastService.toastErr("El archivo tiene que estar en formato PDF");
    }

  }
  public async onFileChangeDrop(pFileList: File[]) {
    console.log("change archivo drop", pFileList[0]);
    if (pFileList[0].type == "application/pdf") {
      this.archivo.id = null;
      this.archivo.fecha = this.pipe.transform(Date.now(), "dd/MM/yyyy");
      this.archivo.name = pFileList[0].name;
      this.archivo.tamanio = pFileList[0].size.toString();
      this.archivo.tipo = pFileList[0].type;
      this.archivo.file = pFileList[0];
    } else {
      this.toastService.toastErr("El archivo tiene que estar en formato PDF");
    }

  }
  public async guardarArchivo(archivo: ArchivoAspirante) {
    const formData: any = new FormData();
    formData.append("file", archivo.file);
    const respuesta = await this.cargaArchivosService.agregar(formData);
    return respuesta;
  }

  public async saveFile() {
    console.log("clic", this.archivo);
    let res = await this.guardarArchivo(this.archivo);
    console.log(res);
    if (res.exito == true) {
      this.archivo.token = res.respuesta;
      this.archivos.push(this.archivo);
      this.swalService.alertaPersonalizado(
        res.exito,
        "Archivo guardado con exito!"
      );
      this.archivo = {};
      this.dataSource2 = this.archivos;

      //
    } else {
      this.toastService.toastErr("Error al guardar el archivo!");
      this.archivo = {};
    }

    this.actualizarTablaArchivos();

  }

  deleteFile(f) {
    this.files = this.files.filter(function (w) {
      return w.name != f.name;
    });
    this._snackBar.open("Successfully delete!", "Close", {
      duration: 2000,
    });
  }


  deleteFromArray(index) {
    console.log(this.files);
    this.files.splice(index, 1);
  }

  public iniciarTablaArchivos() {
    this.dataSource2 = new MatTableDataSource<ArchivoAspirante>(this.archivos);
    this.dataSource2.paginator = this.paginator;
    this.matPaginatorIntl.itemsPerPageLabel = "Archivos por página";
    this.matPaginatorIntl.previousPageLabel = "Anterior página";
    this.matPaginatorIntl.nextPageLabel = "Siguiente página";
    //this.tablaDocs.renderRows();
  }

  public iniciarTablaContacto() {
    this.dataSource = [];
  }

  public actualizarTablaArchivos() {
    this.dataSource2 = new MatTableDataSource<ArchivoAspirante>(this.archivos);
    this.dataSource2.paginator = this.paginator;
    this.matPaginatorIntl.itemsPerPageLabel = "Archivos por página";
    this.matPaginatorIntl.previousPageLabel = "Anterior página";
    this.matPaginatorIntl.nextPageLabel = "Siguiente página";
    this.tablaDocs.renderRows();
  }

  public actualizarTablaContactos() {
    this.dataSource = this.dataSource;
    this.tablaContacto.renderRows();
  }

  public iniciarTablaDocumentosDos() {

    const arrayFormGroup = [];
    this.listaDocumentos.forEach((documento) => {
      const formGroup: FormGroup = new FormGroup({});

      formGroup.addControl(
        "file",
        new FormControl(
          null,
          documento.obligatorio ? Validators.required : null
        )
      );
      formGroup.addControl("nombre", new FormControl(documento.nombre));
      formGroup.addControl(
        "obligatorio",
        new FormControl(documento.obligatorio)
      );
      arrayFormGroup.push(formGroup);
    });

    this.FormularioDocumentos2 = new FormGroup({
      documentos_: this.fb.array(arrayFormGroup),
    });

    this.tablaDocs2.renderRows();
  }

  public actualizarTablaDocumentosDos() {
    this.dataSource2 = new MatTableDataSource<ArchivoAspirante>(this.archivos);
    this.dataSource2.paginator = this.paginator;
    this.matPaginatorIntl.itemsPerPageLabel = "Archivos por página";
    this.matPaginatorIntl.previousPageLabel = "Anterior página";
    this.matPaginatorIntl.nextPageLabel = "Siguiente página";
    this.tablaDocs.renderRows();
  }

  ngAfterViewInit() {
    // forward navigation
    /*        this.sidenavContainer.scrollable.scrollTo({
        top: 0,
        start: 0
      }); */
  }

  toUpperCase(campo) {
    /* return event ? event.toUpperCase() : ''; */

    /*
    const obj = {};
obj[field] = this.rForm.controls[field].value.toUpperCase();
this.rForm.patchValue(obj);} */
    this;
  }

  public async obtenerCURP(curp) {
    const respuesta = await this.servicioRenapo.ObtieneDatosCurp(curp);
    return respuesta;
  }

  showForms() {
    console.log(this.FormularioEstudios.value);
    console.log(this.FormularioDatosGenerales.value);
    console.log(this.FormularioContacto.value);
    console.log(this.FormularioDireccion.value);
    console.log(this.FormularioEstudios.value);
    console.log(this.FormularioDiscapacidad.value);
  }

  showPassword() {
    this.passwordInputType = "text";
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = "password";
    this.cd.markForCheck();
  }

  submit() {
 /*    this.snackbar.open("Hooray! You successfully created your account.", null, {
      duration: 5000,
    }); */
  }

  async selectFile(event) {

    this.selectedFiles = event.target.files;
    console.log(event.target.files);

    const formData: any = new FormData();
    formData.append("file", event.target.files[0]);

    const respuesta = await this.cargaArchivosService.agregar(formData);
    if(respuesta.exito){
      this.FormularioNacionalidad.patchValue({
        documentodigital: respuesta.respuesta,
      });

      this.FormularioNacionalidad.updateValueAndValidity();
      this.cd.detectChanges();
    }


  }

  codigoPostalValueChanged() {
    this.FormularioDireccion.get("codigopostal").valueChanges.subscribe(
      async (cp: string) => {
        if(cp){
          const valido = this.FormularioDireccion.get("codigopostal").valid;

          if (valido) {
            if(this.esMexicano)
            {
              await this.obtenerCatalogoUbicacion(cp);
              this.FormularioDireccion.patchValue({
                estado: this.listaUbicacion[0].estado,
                municipio: this.listaUbicacion[0].municipio,
              });
            }
            else
            {
              this.listaUbicacion = [];
/*               this.FormularioDireccion.patchValue({
                estado: null,
                municipio: null,
              }); */
            }
          } else {
              this.listaUbicacion = [];
              /* this.FormularioDireccion.patchValue({
                estado: null,
                municipio: null,
              }); */
          }
        }
      }
    );
  }

  formControlNacionalidadValueChanged() {
    //Nacionalidad
    const curpControl = this.FormularioNacionalidad.get("curp");
    const tipodocumentonacionalidadControl = this.FormularioNacionalidad.get(
      "tipodocumentonacionalidad"
    );
    const documentodigitalControl =
      this.FormularioNacionalidad.get("documentodigital");

    //Direccion
    const codigopostalControl = this.FormularioDireccion.get("codigopostal");
    const estadoControl = this.FormularioDireccion.get("estado");
    const municipioControl = this.FormularioDireccion.get("municipio");
    const calleControl = this.FormularioDireccion.get("calle");
    const coloniaControl = this.FormularioDireccion.get("colonia");
    const noextControl = this.FormularioDireccion.get("noext");
    const nointControl = this.FormularioDireccion.get("noint");
    const referenciasControl = this.FormularioDireccion.get("referencias");


    this.FormularioNacionalidad.get("nacionalidad").valueChanges.subscribe(
      (nac: string) => {
        if (nac === "México") {
          //*********** SECCION NACIONALIDAD ******************** */
          this.esMexicano = true;
          curpControl.setValidators([
            Validators.required,
            Validators.minLength(18),
            Validators.maxLength(18),
          ]);
          tipodocumentonacionalidadControl.clearValidators();
          documentodigitalControl.clearValidators();
          curpControl.updateValueAndValidity();
          tipodocumentonacionalidadControl.updateValueAndValidity();
          documentodigitalControl.updateValueAndValidity();

          //*******************SECCION DIRECCION ********************* */

          codigopostalControl.setValidators([
            Validators.required,
            Validators.pattern(this.patronCP),
          ]);
          estadoControl.setValidators([Validators.required]);
          estadoControl.disable();
          municipioControl.setValidators([Validators.required]);
          municipioControl.disable();
          calleControl.setValidators([Validators.required]);
          calleControl.enable();
          coloniaControl.setValidators([Validators.required]);
          coloniaControl.enable();
          noextControl.setValidators([Validators.required]);
          noextControl.enable();

          codigopostalControl.updateValueAndValidity();
          estadoControl.updateValueAndValidity();
          municipioControl.updateValueAndValidity();
          calleControl.updateValueAndValidity();
          coloniaControl.updateValueAndValidity();
          noextControl.updateValueAndValidity();
          nointControl.updateValueAndValidity();
          referenciasControl.updateValueAndValidity();
        } else {
          if (nac !== "") {
            //*********** SECCION NACIONALIDAD ******************** */
            this.esMexicano = false;
            curpControl.clearValidators();
            //Se limpia el CURP
            this.FormularioNacionalidad.patchValue({
              curp: null,
            });

            tipodocumentonacionalidadControl.setValidators([
              Validators.required,
            ]);
            documentodigitalControl.setValidators([Validators.required]);
            curpControl.updateValueAndValidity();
            tipodocumentonacionalidadControl.updateValueAndValidity();
            documentodigitalControl.updateValueAndValidity();

            //***********SECCION DATOS GENERALES ******************** */
            //Al no ser mexicano, se habilitan los campos que se llenarian por respuesta del curp
            this.FormularioDatosGenerales.get("nombre").enable();
            this.FormularioDatosGenerales.get("paterno").enable();
            this.FormularioDatosGenerales.get("materno").enable();
            this.FormularioDatosGenerales.get("sexo").enable();
            this.FormularioDatosGenerales.get("fechanacimiento").enable();
            this.FormularioDatosGenerales.reset();

            //*******************SECCION DIRECCION ********************* */

            codigopostalControl.clearValidators();

            estadoControl.clearValidators();
            estadoControl.enable();

            municipioControl.clearValidators();
            municipioControl.enable();

            coloniaControl.clearValidators();
            coloniaControl.enable();

            calleControl.clearValidators();
            calleControl.enable();

            noextControl.clearValidators();
            noextControl.enable();

            nointControl.clearValidators();
            nointControl.enable();

            codigopostalControl.updateValueAndValidity();
            estadoControl.updateValueAndValidity();
            municipioControl.updateValueAndValidity();
            calleControl.updateValueAndValidity();
            coloniaControl.updateValueAndValidity();
            noextControl.updateValueAndValidity();
            nointControl.updateValueAndValidity();
          }
        }
      }
    );

    this.FormularioNacionalidad.get("curp").valueChanges.subscribe(
      async (curp: string) => {
        debugger
        if (curp) {
          if (curp.length === 18) {
            //el curp lo enviamos en mayusculas
            const respuesta = await this.obtenerCURP(curp.toUpperCase());
            if (respuesta.StatusOper === "EXITOSO") {
              await this.llenarDatosRespuestaRENAPO(respuesta);
              this.curpValido = true;

              this.toastService.toastSuccess("Se encontró CURP en RENAPO");
            } else {
              this.FormularioDatosGenerales.reset();
              this.toastService.toastErr(
                "No se encontró CURP en RENAPO: " + respuesta.Message
              );
              this.curpValido = false;
            }
          } else {
            this.curpValido = false;
            this.FormularioDatosGenerales.reset();
          }
        }
      }
    );

    this.FormularioEstudios.get("tienelicenciatura").valueChanges.subscribe(
      async (licenciatura: boolean) => {
        this.tieneLicenciatura = licenciatura;
        const nombrelicenciaturaControl = this.FormularioEstudios.get("nombrelicenciatura");
        const estadolicenciaturaControl = this.FormularioEstudios.get("estadolicenciatura");

        if (licenciatura) {
          this.tieneLicenciatura = true;

          nombrelicenciaturaControl.setValidators([Validators.required]);
          estadolicenciaturaControl.setValidators([Validators.required]);

        } else {
          this.tieneLicenciatura = false;

          this.FormularioEstudios.patchValue({
            nombrelicenciatura: null,
            estadolicenciatura: null
          });

          nombrelicenciaturaControl.clearValidators();
          estadolicenciaturaControl.clearValidators();
        }

        nombrelicenciaturaControl.updateValueAndValidity();
          estadolicenciaturaControl.updateValueAndValidity();
      }
    );

    this.FormularioDiscapacidad.get("deporteclasifico").valueChanges.subscribe(
      async (deporte: number) => {

        if(deporte){
          await this.obtenerCatalogoClasificacionDiscapacidad(deporte);
        }
      });


    this.FormularioDiscapacidad.get("tienediscapacidad").valueChanges.subscribe(
      async (discapacidad: boolean) => {
        this.tieneDiscapacidad = discapacidad;

        if (discapacidad) {
          this.tieneDiscapacidad = true;
        } else {
          this.tieneDiscapacidad = false;
        }
      }
    );
  }

  public limpiarFormulario;

  public llenarDatosRespuestaRENAPO(datosRenapo: RespuestaCURP) {
    let sexoCatalogo = datosRenapo.sexo === "H" ? 1 : 2;
    let fecha = this.formatoFechaRenapoADate(datosRenapo.fechNac);

    this.FormularioDatosGenerales.patchValue({
      nombre: datosRenapo.nombres,
      paterno: datosRenapo.apellido1,
      materno: datosRenapo.apellido2,
      sexo: sexoCatalogo,
      fechanacimiento: fecha,
    });

    //SE DESHABILITAN LOS CAMPOS QUE SE LLENARON CON LOS DATOS DE LA RESPUESTA DE RENAPO
    this.FormularioDatosGenerales.get("nombre").disable();
    this.FormularioDatosGenerales.get("paterno").disable();
    this.FormularioDatosGenerales.get("materno").disable();
    this.FormularioDatosGenerales.get("sexo").disable();
    this.FormularioDatosGenerales.get("fechanacimiento").disable();
  }

  public formatoFechaRenapoADate(fecha: string): Date {
    let arreglo = fecha.split("/");
    let _date = new Date(
      Number(arreglo[2]),
      Number(arreglo[1]) - 1,
      Number(arreglo[0])
    );

    console.log(_date);
    return _date;
  }

  public agregarContacto() {
    if (this.FormularioContacto.value) {
      if(this.FormularioContacto.value.tipocontacto != null && this.FormularioContacto.value.contacto != null && this.FormularioContacto.value.contacto != " "){
        this.dataSource.push(this.FormularioContacto.value);

      this.FormularioContacto.reset();
      this.formularioContactoObligatorio(false);
      this.actualizarTablaContactos();
      }
      else {

        this.toastService.toastInfo("Los campos Tipo de contacto y Contacto, son requeridos")
      }
    }
  }


  /* CONSULTAS CATALOGOS */




  public async obtenerCatalogoTipoSanguineo() {
    const respuesta = await this.preregistroService.obtenerCatalogTipoSanguineo();
    respuesta.exito
      ? (this.listaTipoSanguineo = respuesta.objeto)
      : (this.listaTipoSanguineo = []);
  }

  public async obtenerCatalogoDeporte() {
    const respuesta = await this.preregistroService.obtenerCatalogoDeporte();
    respuesta.exito
      ? (this.listaDeportes = respuesta.objeto)
      : (this.listaDeportes = []);
  }

  public async obtenerCatalogoDocumentoNacionalidad() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoDocumentoNacionalidad();
    respuesta.exito
      ? (this.listaTipoDocumentosNacionalidad = respuesta.objeto)
      : (this.listaTipoDocumentosNacionalidad = []);
  }

  public async obtenerCatalogoCertificadoBachillerato() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoCertificadoBachillerato();
    respuesta.exito
      ? (this.listaTipoCertificado = respuesta.objeto)
      : (this.listaTipoCertificado = []);
  }

  public async obtenerCatalogoTiempoPractica() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoTiempoPractica();
    respuesta.exito
      ? (this.listaTiemproPractica = respuesta.objeto)
      : (this.listaTiemproPractica = []);
  }

  public async obtenerCatalogoFrecuenciaPractica() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoFrecuenciaPractica();
    respuesta.exito
      ? (this.listaFrecuencia = respuesta.objeto)
      : (this.listaFrecuencia = []);
  }

  public async obtenerCatalogoNivelPractica() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoNivelPractica();
    respuesta.exito
      ? (this.listaNivelAlcanzado = respuesta.objeto)
      : (this.listaNivelAlcanzado = []);
  }

  public async obtenerCatalogoParticipacionPractica() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoParticipacionPractica();
    respuesta.exito
      ? (this.listaParticipandoEn = respuesta.objeto)
      : (this.listaParticipandoEn = []);
  }

  public async obtenerCatalogoTipoDiscapacidad() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoTipoDiscapacidad();
    respuesta.exito
      ? (this.listaTipoDiscapacidad = respuesta.objeto)
      : (this.listaTipoDiscapacidad = []);
  }

  public async obtenerCatalogoDeporteDiscapacidad() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoDeporteDiscapacidad();
    respuesta.exito
      ? (this.listaDeporteClasifico = respuesta.objeto)
      : (this.listaDeporteClasifico = []);
  }

  public async obtenerCatalogoClasificacionDiscapacidad(
    idDeporteDiscapacidad: number
  ) {
    const respuesta =
      await this.preregistroService.obtenerCatalogoClasificacionDiscapacidad(
        idDeporteDiscapacidad
      );
    respuesta.exito
      ? (this.listaClasificoDiscapacidad = respuesta.objeto)
      : (this.listaClasificoDiscapacidad = []);

  }

  public async obtenerCatalogoInstitucionDiscapacidad() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoInstitucionDiscapacidad();
    respuesta.exito
      ? (this.listaInstitucionClasificoDiscapacidad = respuesta.objeto)
      : (this.listaInstitucionClasificoDiscapacidad = []);
  }

  public async obtenerCatalogoEstadoCivil() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoEstadoCivil();
    respuesta.exito
      ? (this.listaEstadoCivil = respuesta.objeto)
      : (this.listaEstadoCivil = []);
  }

  public async obtenerCatalogoGenero() {
    const respuesta = await this.preregistroService.obtenerCatalogoGenero();
    respuesta.exito
      ? (this.listaSexos = respuesta.objeto)
      : (this.listaSexos = []);
  }

  public async obtenerCatalogoSeguridadSocial() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoSeguridadSocial();
    respuesta.exito
      ? (this.listaSeguridadSocial = respuesta.objeto)
      : (this.listaSeguridadSocial = []);
  }

  public async obtenerCatalogoTipoContacto() {
    const respuesta =
      await this.preregistroService.obtenerCatalogoTipoContacto();
    respuesta.exito
      ? (this.listaTipoContacto = respuesta.objeto)
      : (this.listaTipoContacto = []);
  }

  public async obtenerCatalogoPais() {
    const respuesta = await this.preregistroService.obtenerCatalogoPais();
    respuesta.exito
      ? (this.listaNacionalidades = respuesta.objeto)
      : (this.listaNacionalidades = []);
  }

  public async obtenerCatalogoUbicacion(codigoPostal: string) {
    const respuesta = await this.preregistroService.obtenerCatalogoUbicacion(
      codigoPostal
    );
    respuesta.exito
      ? (this.listaUbicacion = respuesta.objeto)
      : (this.listaUbicacion = []);

/*     if (this.listaUbicacion.length > 0) {
      this.toastService.toastSuccess(
        "Se encontrarón resultados con el código postal proporcionado. Por favor seleccione una colonia."
      );
    } */

    console.log("Ubicacion: ");
    console.log(this.listaUbicacion);
  }

  public async obtenerCatalogoEstado() {
    const respuesta = await this.preregistroService.obtenerCatalogoEstado();
    respuesta.exito
      ? (this.listaEstados = respuesta.objeto)
      : (this.listaEstados = []);

    this.listaEstadoBachilleres = this.listaEstados;
    this.listaEstadoLicenciatura = this.listaEstados;

    console.log("Estado: ");
    console.log(this.listaEstados);
  }

  public async obtenerCatalogoDocumentos() {
    const respuesta = await this.preregistroService.obtenerCatalogoDocumentos();
    respuesta.exito
      ? (this.listaDocumentos = respuesta.objeto)
      : (this.listaDocumentos = []);

    return this.listaDocumentos as CatalogoDocumentos[];
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();
    return this.listaNacionalidades.filter((option) =>
      option.nombre.toLowerCase().includes(filterValue)
    );
  }

  get documentos_(): FormArray {
    return this.FormularioDocumentos2.get("documentos_") as FormArray;
  }

  public async guardarPreregistro(accion: string) {

    let preregistro = new PreRegistroComplex();
    let domicilio = new TblDomicilio();
    let contactos = new Array<TblContacto>();
    let datosAcademicos = new TblDatosAcademico();
    let discapacidad = new TblDiscapacidad();
    let d = new Date();

    let fechaInclusion = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
     "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);;

    preregistro.id = this.preregistro.id;


    //preregistro.clave  = this.FormularioDatosGenerales.get('').value;
    preregistro.curp = this.FormularioNacionalidad.get("curp").value;
    //preregistro.rfc  = this.FormularioDatosGenerales.get('').value;
    preregistro.nombre = this.FormularioDatosGenerales.get("nombre").value;
    preregistro.paterno = this.FormularioDatosGenerales.get("paterno").value;
    preregistro.materno = this.FormularioDatosGenerales.get("materno").value;
    preregistro.fechaNacimiento =
      this.FormularioDatosGenerales.get("fechanacimiento").value;
    preregistro.tipoSanguineo =
      this.FormularioDatosGenerales.get("tiposanguineo").value;
    preregistro.numSeguridadSocial = this.FormularioDatosGenerales.get(
      "numeroseguridadsocial"
    ).value;
    preregistro.ingresoAprox =
      this.FormularioDatosGenerales.get("ingresofamiliar").value;
    preregistro.catDocumentoNacionalidadId = this.FormularioNacionalidad.get(
      "tipodocumentonacionalidad"
    ).value;
    preregistro.docNacionalidad = this.FormularioNacionalidad.get('documentodigital').value;
    preregistro.docSeguridadSocial = this.FormularioDatosGenerales.get(
      "numeroseguridadsocial"
    ).value;
    preregistro.discapacidad =
      this.FormularioDiscapacidad.get("tienediscapacidad").value;
    preregistro.catDeporteId = this.FormularioNacionalidad.get("deporte").value;
    preregistro.bovedaCatEstadoCivilId =
      this.FormularioDatosGenerales.get("estadocivil").value;
    preregistro.bovedaCatPaisesIso = this.listaNacionalidades.find(
      (x) => x.nombre == this.FormularioNacionalidad.get("nacionalidad").value
    ).iso;
    preregistro.bovedaCatGeneroId =
      this.FormularioDatosGenerales.get("sexo").value;
    preregistro.bovedaCatSeguridadSocialId =
      this.FormularioDatosGenerales.get("seguridadsocial").value;
    preregistro.enedsep = null;
    preregistro.enedsepdoc = null;
    preregistro.catOfertaeducativaId = 1;
    preregistro.numeroPasaporte = null;
    preregistro.inclusion = fechaInclusion;
    preregistro.accion = "INSERT";

    domicilio.id = 0;
    domicilio.tblDatosGeneralesAspiranteId = 0;
    domicilio.codigoPostal =                  this.FormularioDireccion.get("codigopostal").value ? this.FormularioDireccion.get("codigopostal").value : '';
    domicilio.colonia =                       this.FormularioDireccion.get("colonia").value ? this.FormularioDireccion.get("colonia").value : '';
    domicilio.calle =                         this.FormularioDireccion.get("calle").value ? this.FormularioDireccion.get("calle").value : '';
    domicilio.noInterior =                    this.FormularioDireccion.get("noint").value ? this.FormularioDireccion.get("noint").value : '';
    domicilio.noExterior =                    this.FormularioDireccion.get("noext").value ? this.FormularioDireccion.get("noext").value : '';
    domicilio.referencia =                    this.FormularioDireccion.get("referencias").value ? this.FormularioDireccion.get("referencias").value : '';
    domicilio.bovedaCatUbicaciongEstado =     this.FormularioDireccion.get("estado").value ? this.FormularioDireccion.get("estado").value : '';
    domicilio.bovedaCatUbicaciongMunicipio =  this.FormularioDireccion.get("municipio").value ? this.FormularioDireccion.get("municipio").value : '';


    preregistro.tblDomicilio = domicilio;

    //Contacto
 /*    this.dataSource.forEach((x) => {
      let con = new TblContacto();
      con.id = 0;
      con.tblDatosGeneralesAspiranteId = 0;
      con.contacto = x.contacto;
      con.bovedaCatTipoContactoId = x.tipocontacto;
      con.complemento = x.adicional;
      contactos.push(con);
    }); */

    preregistro.tblContactos = contactos;

/*     datosAcademicos.id = 0;
    datosAcademicos.tblDatosGeneralesAspiranteId = 0;
    datosAcademicos.bovedaCatUbicaciongEstadoBachillerato =
      this.FormularioEstudios.get("estadobachiller").value;
    datosAcademicos.catCertificadoBachilleratoId =
      this.FormularioEstudios.get("tipocertifica").value;
    datosAcademicos.escuela =
      this.FormularioEstudios.get("nombrebachiller").value;
    datosAcademicos.promedio =
      this.FormularioEstudios.get("promediofinal").value;
    datosAcademicos.tieneLicenciatura =
      this.FormularioEstudios.get("tienelicenciatura").value;
    datosAcademicos.licenciatura =
      this.FormularioEstudios.get("nombrelicenciatura").value;
    datosAcademicos.bovedaCatUbicaciongEstadoLicenciatura =
      this.FormularioEstudios.get("estadolicenciatura").value;
    datosAcademicos.catTiempoPracticaId =
      this.FormularioEstudios.get("tiempopractica").value;
    datosAcademicos.catFrecuenciaPracticaId =
      this.FormularioEstudios.get("frecuencia").value;
    datosAcademicos.catNivelPracticaId =
      this.FormularioEstudios.get("nivelalcanzado").value;
    datosAcademicos.catParticipacionPracticaId =
      this.FormularioEstudios.get("participandoen").value;
    datosAcademicos.inclusion = fechaInclusion */

    preregistro.tblDatosAcademicos = datosAcademicos;

/*     if(this.tieneDiscapacidad){
      discapacidad.id = 0;
      discapacidad.tblDatosGeneralesAspiranteId = 0;
      discapacidad.catTipoDiscapacidadId = this.FormularioDiscapacidad.get("tipodiscapacidad").value;
      discapacidad.catDeporteDiscapacidadId = this.FormularioDiscapacidad.get("deporteclasifico").value;
      discapacidad.catInstitucionDiscapacidadId = this.FormularioDiscapacidad.get("institucionclasifico").value;
      discapacidad.inclusion = fechaInclusion;
      preregistro.tblDiscapacidad = discapacidad;
    } */

    console.log(JSON.stringify(preregistro));

    //SE ENVIA LA LISTA DE DOCUMENTOS(TOKENS) EN EL MISMO SERVICIO QUE AGREGA REGISTRO
    let listaDocs = new Array<TblDocAspiranteComplex>();
    let lista =  this.FormularioDocumentos2.get('documentos_').value as any[];
    lista = lista.filter((x)=> x.token != null);

/*     lista.forEach(async (documento)=>{
      let tblDocumentosAspirantes = new TblDocAspiranteComplex();
      tblDocumentosAspirantes.id = 0
      tblDocumentosAspirantes.tblDatosGeneralesAspiranteId = 0;
      tblDocumentosAspirantes.tblDocumentosId = documento.id;
      tblDocumentosAspirantes.activo = true;
      tblDocumentosAspirantes.archivo = documento.token;
      listaDocs.push(tblDocumentosAspirantes);
    }); */

    preregistro.tblDocsAspirante = listaDocs;

    console.log(preregistro);

    let respuestaPreregistro = null;

    switch(accion){
      case 'DATOS_GENERALES':
        respuestaPreregistro = await this.preregistroService.actualizacionDatosGeneralesPreregistro(preregistro);
        break;
      case 'DOMICILIO':
        respuestaPreregistro = await this.preregistroService.actualizacionDomicilioPreregistro(preregistro);
        break;
    }

    if(respuestaPreregistro.exito){
      let idDatosGeneralesAspirante = respuestaPreregistro.id;

      this.toastService.toastSuccess(respuestaPreregistro.mensaje);
      //this.router.navigate(['/paginas/inicio']);
      await this.llenarFormularios()
    } else {
      this.toastService.toatsWarning(respuestaPreregistro.mensaje);
    }

  }


  public async enviarDocumentos(){


    let listaTotal = [];
    let lista =  this.FormularioDocumentos2.get('documentos_').value as any[];

        lista = lista.filter((x)=> x.token != null);

        lista.forEach(async (documento)=>{
          let tblDocumentosAspirantes = new TblDocAspiranteComplex();
          tblDocumentosAspirantes.id = 0
          tblDocumentosAspirantes.tblDatosGeneralesAspiranteId = this.IDASPIRANTE;
          tblDocumentosAspirantes.tblDocumentosId = documento.id;
          tblDocumentosAspirantes.activo = true;
          tblDocumentosAspirantes.archivo = documento.token;
          listaTotal.push(tblDocumentosAspirantes);
        });

        const respDoc = await this.preregistroService.altaListaDocumentosAspirante(listaTotal);

          if(respDoc.exito){
            this.toastService.toastSuccess("Se cargaron documentos");
            this.router.navigate(['/paginas/inicio']);
          }
          else {
            this.toastService.toatsWarning("ocurrio un error");
          }
}



  async my_handler_docs(ix: FormGroup){

    if(ix.value.file){
      if (ix.value.file._files[0].type == "application/pdf") {

        const formData: any = new FormData();
        formData.append("file", ix.value.file._files[0]);

        const respuesta = await this.cargaArchivosService.agregar(formData);
        if(respuesta.exito){
          ix.patchValue({
            token: respuesta.respuesta
          });
          ix.updateValueAndValidity();
          this.cd.detectChanges();
          this.toastService.toastInfo("Se cargó el documento");
        }
        else {
          this.toastService.toatsWarning(respuesta.mensaje);
        }
      } else {
        this.toastService.toatsWarning("Solo se admiten archivos PDF.");
        ix.patchValue({
          file: null
        });
      }
    }

 }

 public abrirDocumentoMigratorio(){

  if(this.preregistro.docNacionalidad){
    const url = this.cargaArchivosService.obtenerUrlCompleta(this.preregistro.docNacionalidad);
    window.open(url,"_blank");
  }
 }

 public abrirDocumento(token){

  if(token){
    const url = this.cargaArchivosService.obtenerUrlCompleta(token);
    window.open(url,"_blank");
  }
 }

 openModalValidacionDocumento(documento) {

  /*     let objeto = new EventoParticipantesModal;
      objeto.evento = evento;
      objeto.participantes = []; */

  const evento = {}
      this.dialog.open(ValidacionDocumentoComponent,{
        height: '70%',
        width: '85%',
        autoFocus: false,
        data: documento ? documento : null,
        disableClose: true
     }).afterClosed().subscribe(async( validacion: any) => {

        console.log('se guardo bien');

        //this.ngOnInit();
        await this.actualizarDocumentos()
      });
    }

    public onClick_(elementId: string): void {
      const element = document.querySelector('#SeccionDocs');
      element.scrollIntoView();
    }
}
