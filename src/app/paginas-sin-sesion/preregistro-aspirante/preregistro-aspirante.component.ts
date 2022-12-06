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
import { ComponenteayudaComponent } from "../componenteayuda/componenteayuda.component";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DatePipe } from "@angular/common";
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
  periodoRegistro,
  PreRegistroComplex,
  TblContacto,
  TblDatosAcademico,
  TblDiscapacidad,
  TblDocAspiranteComplex,
  TblDomicilio,
} from "src/app/modelos/ModelosPreregistro";
import { Observable } from "rxjs";
import { debug } from "console";

@Component({
  selector: "vex-preregistro-aspirante",
  templateUrl: "./preregistro-aspirante.component.html",
  styleUrls: ["./preregistro-aspirante.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreregistroAspiranteComponent implements OnInit, AfterViewInit {
  token: string | undefined;
  //@ViewChild(MatTable) table: MatTable<any>;

  //tablaContacto
  @ViewChild("tablaContacto") tablaContacto: MatTable<any>;
  @ViewChild("tablaDocs") tablaDocs: MatTable<any>;
  @ViewChild("tablaDocumentosDos") tablaDocs2: MatTable<any>;

  //tablaDocs

  anio = new Date().getFullYear();

  showFiller = false;


  patronCP = "^[0-9]{5}$";
  patronNSS = "^[0-9]{11}$";


  maskNSS = [ /\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/];


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
  dataSource: any[] = [];
  dataSourceDocumentos: any[];

  displayedColumns: string[] = [
    "nombreContacto",
    "contacto",
    "adicional",
    "acciones",
  ];
  displayedColumnsDocs: string[] = ["documento", "obligatorio", "correcto", "seleccionar"];

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


  listaEstadoBachilleres =  []

  listaTipoCertificado: CatalogoCertificadoBachillerato[] = [];


  listaEstadoLicenciatura = [];


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

  ID_OFERTA_EDUCATIVA = 1

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
    private preregistroService: PreregistroAspiranteService
  ) {
    this.token = undefined;

    this.FormularioDocumentos2 = this.fb.group({
      documentos_: this.fb.array([]),
    });

    this.FormularioNacionalidad = this.fb.group({
      deporte: [null, Validators.required],
      //nacionalidad: [null, Validators.required],
      nacionalidad: ['MÉXICO', Validators.required],
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
      numerodocumentonacionalidad: [null],
    });

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

    this.FormularioContacto = this.fb.group({
      nombreContacto: [null],
      tipocontacto: [null, [Validators.required]],
      contacto: [null, [Validators.required]],
      adicional: [null],
    });

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

    this.FormularioDiscapacidad = this.fb.group({
      tienediscapacidad: [null, [Validators.required]],
      tipodiscapacidad: [null],
      deporteclasifico: [null],
      institucionclasifico: [null],
      clasificodiscapacidad: [null]
    });
    this.FormularioDocumentos = this.fb.group({
      basicfile: [null, [Validators.required]],
      tipoDocumento: [null, [Validators.required]],
      documentoSeleccionado: [null]
    });

    this.FormularioPoliticas = this.fb.group({
      token: [null, [Validators.required]],
      aceptapoliticas: [null, [Validators.requiredTrue]],
    });
  }

  async ngOnInit() {

    const existePeriodoActivo = await this.obtenerPeriodoRegistroPorOferta()

    if(!existePeriodoActivo){
      this.router.navigate(['/inicio']);
      return;
    }

    this.iniciarTablaContacto();
    this.iniciarTablaArchivos();


/* SE OBTIENEN LOS CATALOGOS DEL FORMULARIO */
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
    //await this.obtenerCatalogoClasificacionDiscapacidad(1);
    await this.obtenerCatalogoInstitucionDiscapacidad();

    await this.obtenerCatalogoEstadoCivil();
    await this.obtenerCatalogoGenero();
    await this.obtenerCatalogoSeguridadSocial();
    await this.obtenerCatalogoTipoContacto();
    await this.obtenerCatalogoPais();

    await this.obtenerCatalogoEstado();
    await this.obtenerCatalogoDocumentos();


/* SE OBTIENEN LOS CATALOGOS DEL FORMULARIO */
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

    this.filteredOptions = this.FormularioNacionalidad.get(
      "nacionalidad"
    ).valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );


    //await this.llenarFormularios();


    this.formControlValuesChanged();
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
      .subscribe((formulario: any) => {
        this.ngOnInit();
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

  openConfirmDialog(pIndex): void {
    const dialogRef = this.dialog.open(ComponenteayudaComponent, {
      panelClass: "modal-xs",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
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

    if (event.target.files.item(0).type == "application/pdf") {
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
    } else {
      this.toastService.toastErr("Solo se admiten archivos PDF.");
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
              this.FormularioDireccion.patchValue({
                estado: null,
                municipio: null,
              });
            }
          } else {
              this.listaUbicacion = [];
              this.FormularioDireccion.patchValue({
                estado: null,
                municipio: null,
              });
          }
        }
      }
    );
  }

  formControlValuesChanged() {
    //Nacionalidad
    const curpControl = this.FormularioNacionalidad.get("curp");
    const tipodocumentonacionalidadControl = this.FormularioNacionalidad.get(
      "tipodocumentonacionalidad"
    );

    const numerodocumentonacionalidadControl = this.FormularioNacionalidad.get(
      "numerodocumentonacionalidad"
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
        if (nac === "MÉXICO") {
          //*********** SECCION NACIONALIDAD ******************** */
          this.esMexicano = true;
          curpControl.setValidators([
            Validators.required,
            Validators.minLength(18),
            Validators.maxLength(18),
          ]);
          tipodocumentonacionalidadControl.clearValidators();
          numerodocumentonacionalidadControl.clearValidators();
          documentodigitalControl.clearValidators();
          curpControl.updateValueAndValidity();
          tipodocumentonacionalidadControl.updateValueAndValidity();
          numerodocumentonacionalidadControl.updateValueAndValidity();
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
            numerodocumentonacionalidadControl.setValidators([
              Validators.required
            ]);
            documentodigitalControl.setValidators([Validators.required]);
            curpControl.updateValueAndValidity();
            tipodocumentonacionalidadControl.updateValueAndValidity();
            numerodocumentonacionalidadControl.updateValueAndValidity();
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


        const tienediscapacidadControl = this.FormularioDiscapacidad.get('tienediscapacidad');
        const tipodiscapacidadControl = this.FormularioDiscapacidad.get('tipodiscapacidad');
        const deporteclasificoControl = this.FormularioDiscapacidad.get('deporteclasifico');
        const institucionclasificoControl = this.FormularioDiscapacidad.get('institucionclasifico');
        const clasificodiscapacidadControl = this.FormularioDiscapacidad.get('clasificodiscapacidad');




        this.tieneDiscapacidad = discapacidad;


        if (discapacidad) {

          this.tieneDiscapacidad = true;




          tipodiscapacidadControl.setValidators([Validators.required]);
          deporteclasificoControl.setValidators([Validators.required]);
          institucionclasificoControl.setValidators([Validators.required]);
          clasificodiscapacidadControl.setValidators([Validators.required]);

          tipodiscapacidadControl.updateValueAndValidity();
          deporteclasificoControl.updateValueAndValidity();
          institucionclasificoControl.updateValueAndValidity();
          clasificodiscapacidadControl.updateValueAndValidity();


        } else {
          this.tieneDiscapacidad = false;
          tipodiscapacidadControl.clearValidators();
          deporteclasificoControl.clearValidators();
          institucionclasificoControl.clearValidators();
          clasificodiscapacidadControl.clearValidators();

          tipodiscapacidadControl.updateValueAndValidity();
          deporteclasificoControl.updateValueAndValidity();
          institucionclasificoControl.updateValueAndValidity();
          clasificodiscapacidadControl.updateValueAndValidity();

        }
      }
    );

    this.FormularioContacto.get("tipocontacto").valueChanges.subscribe(
     async (tipocontacto) => {

      if(tipocontacto){
        this.FormularioContacto.patchValue({
          nombreContacto: this.listaTipoContacto.find((x)=>x.id == tipocontacto).tipo
        });
      }

      if(tipocontacto == 4){// 4 es correo
        const contactoControl = this.FormularioContacto.get("contacto");

        contactoControl.setValidators([Validators.required, Validators.email]);
        contactoControl.updateValueAndValidity();
      } else if(tipocontacto) {
        const contactoControl = this.FormularioContacto.get("contacto");
        contactoControl.setValidators([Validators.required]);
        contactoControl.updateValueAndValidity();
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

    if (this.listaUbicacion.length > 0) {
      this.toastService.toastSuccess(
        "Se encontrarón resultados con el código postal proporcionado. Por favor seleccione una colonia."
      );
    } else {
      this.toastService.toatsWarning(
        "No se encontrarón resultados con el código postal proporcionado."
      );
    }

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

  public async guardarPreregistro() {
    let preregistro = new PreRegistroComplex();
    let domicilio = new TblDomicilio();
    let contactos = new Array<TblContacto>();
    let datosAcademicos = new TblDatosAcademico();
    let discapacidad = new TblDiscapacidad();
    let d = new Date();

    let fechaInclusion = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
     "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);;

    preregistro.id = 0;


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
    preregistro.numeroPasaporte = this.FormularioNacionalidad.get('numerodocumentonacionalidad').value;
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
    preregistro.catOfertaeducativaId = this.ID_OFERTA_EDUCATIVA;
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
    this.dataSource.forEach((x) => {
      let con = new TblContacto();
      con.id = 0;
      con.tblDatosGeneralesAspiranteId = 0;
      con.contacto = x.contacto;
      con.bovedaCatTipoContactoId = x.tipocontacto;
      con.complemento = x.adicional;
      contactos.push(con);
    });

    preregistro.tblContactos = contactos;

    datosAcademicos.id = 0;
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
    datosAcademicos.inclusion = fechaInclusion

    preregistro.tblDatosAcademicos = datosAcademicos;

    if(this.tieneDiscapacidad){
      discapacidad.id = 0;
      discapacidad.tblDatosGeneralesAspiranteId = 0;
      discapacidad.catTipoDiscapacidadId = this.FormularioDiscapacidad.get("tipodiscapacidad").value;
      discapacidad.catDeporteDiscapacidadId = this.FormularioDiscapacidad.get("deporteclasifico").value;
      discapacidad.catInstitucionDiscapacidadId = this.FormularioDiscapacidad.get("institucionclasifico").value;
      discapacidad.catClasificacionDiscapacidadId = this.FormularioDiscapacidad.get("clasificodiscapacidad").value;
      discapacidad.inclusion = fechaInclusion;
      preregistro.tblDiscapacidad = discapacidad;
    }

    console.log(JSON.stringify(preregistro));

    //SE ENVIA LA LISTA DE DOCUMENTOS(TOKENS) EN EL MISMO SERVICIO QUE AGREGA REGISTRO
    let listaDocs = new Array<TblDocAspiranteComplex>();
    let lista =  this.FormularioDocumentos2.get('documentos_').value as any[];
    lista = lista.filter((x)=> x.token != null);

    lista.forEach(async (documento)=>{
      let tblDocumentosAspirantes = new TblDocAspiranteComplex();
      tblDocumentosAspirantes.id = 0
      tblDocumentosAspirantes.tblDatosGeneralesAspiranteId = 0;
      tblDocumentosAspirantes.tblDocumentosId = documento.id;
      tblDocumentosAspirantes.activo = true;
      tblDocumentosAspirantes.archivo = documento.token;
      listaDocs.push(tblDocumentosAspirantes);
    });

    preregistro.tblDocsAspirante = listaDocs;

    console.log(preregistro);

      const respuestaPreregistro = await this.preregistroService.altaPreregistro(preregistro);

      if(respuestaPreregistro.exito){
        let idDatosGeneralesAspirante = respuestaPreregistro.id;

      /*let lista =  this.FormularioDocumentos2.get('documentos_').value as any[];

        lista = lista.filter((x)=> x.token != null);

        lista.forEach(async (documento)=>{
          let tblDocumentosAspirantes = new TblDocAspiranteComplex();
          tblDocumentosAspirantes.id = 0
          tblDocumentosAspirantes.tblDatosGeneralesAspiranteId = idDatosGeneralesAspirante;
          tblDocumentosAspirantes.tblDocumentosId = documento.id;
          tblDocumentosAspirantes.activo = true;
          tblDocumentosAspirantes.archivo = documento.token;

          const respDoc = await this.preregistroService.altaDocumentosAspirante(tblDocumentosAspirantes);

          if(respDoc.exito){
            this.toastService.toastSuccess("Se cargo documento");
          }
          else {
            this.toastService.toatsWarning("ocurrio un error");
          }


        }); */

        this.toastService.toastSuccess("Se guardó el preregistro");
        this.router.navigate(['/inicio']);

      } else {
        this.toastService.toatsWarning(respuestaPreregistro.mensaje);
      }

  }


  async my_handler_docs(ix: FormGroup){

    if(ix.value.file){
      const formData: any = new FormData();
      formData.append("file", ix.value.file._files[0]);

      const respuesta = await this.cargaArchivosService.agregar(formData);
      if(respuesta.exito){
        ix.patchValue({
          token: respuesta.respuesta
        });
        ix.updateValueAndValidity();
        this.cd.detectChanges();
        this.toastService.toastSuccess("Se guardó el documento: " + respuesta.respuesta);
      }
      else {
        this.toastService.toatsWarning(respuesta.mensaje);
      }
    }

 }

 async obtenerPeriodoRegistroPorOferta(){
  const respuesta = await this.preregistroService.obtenerPeriodoPorOfertaEducativa(this.ID_OFERTA_EDUCATIVA);
    if(respuesta.exito){
     let periodo: periodoRegistro = respuesta.objeto[0];
      //let fechaInicio: Date =

      const [year, month, day ] =  (periodo.fechaInicio.substring(0,10)).split('-');
      var fechaIni = new Date(Number(year), (Number(month) - 1), Number(day));

      const [year2, month2, day2 ] =  (periodo.fechaFin.substring(0,10)).split('-');
      var fechaFin = new Date(Number(year2), (Number(month2) - 1), Number(day2));

      const fechaActual = new Date();
      if( fechaIni <= fechaActual && fechaActual <= fechaFin){
        //this.toastService.toastSuccess('Periodo de inscripción activo');
        console.log('Periodo de inscripción activo');
        return true;
      } else {
        this.toastService.toastErr('No hay periodo de registro activo');
        //this.router.navigate(['/inicio']);
        return false;
      }
    }else{
      this.toastService.toastErr('No se encontró periodo de registro');
        this.router.navigate(['/inicio']);
        return false;
    }
 }


 public validad
}
