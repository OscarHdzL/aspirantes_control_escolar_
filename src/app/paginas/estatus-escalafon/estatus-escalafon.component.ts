import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreregistroAspiranteService } from 'src/app/servicios/preregistro-aspirante.service';
import { Component, OnInit } from '@angular/core';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { Router } from '@angular/router';
import { AspiranteSesionModel } from 'src/app/modelos/aspirante-sesion.model';

@Component({
  selector: 'vex-estatus-escalafon',
  templateUrl: './estatus-escalafon.component.html',
  styleUrls: ['./estatus-escalafon.component.scss']
})
export class EstatusEscalafonComponent implements OnInit {

  datosAspirante: AspiranteSesionModel;

  ID_ASPIRANTE: number;
  escalafon: Escalafon;
  formularioEscalafon: FormGroup;
  accion = 'Visualizacion'
  //accion = 'Registro'

  constructor(
    private preregistroAspiranteService: PreregistroAspiranteService,
    private swalService: SwalServices,
    private toastService: VariablesService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.escalafon = new Escalafon();
    this.datosAspirante = JSON.parse(localStorage.getItem("aspirante"))[0];

    this.ID_ASPIRANTE = this.datosAspirante.id;

    this.formularioEscalafon = this.fb.group({
      tecnicoMet: null,
      conocimientosBd: null,
      ceneval: null,
      examenMedico:  [null,[Validators.requiredTrue]],
      examenMedicoDescripcion: null,
      cursoInduccion: [null,[Validators.requiredTrue]]
      //clave:  null,
      //curp:  null,
      //rfc:  null,
      //nombre:  null,
      //paterno: null,
      //materno:  null,
      //fechaNacimiento:  null,
    });

  }

  async ngOnInit() {
    this.escalafon = await this.obtenerEscalafon();
    await this.llenarFormulario();
  }

  public llenarFormulario(){
    debugger
    if(this.escalafon){
        this.formularioEscalafon = this.fb.group({
        tecnicoMet: [(this.escalafon.tecnicoMet) ? ((this.escalafon.tecnicoMet > 0) ? this.escalafon.tecnicoMet: null): null, [Validators.required]],
        conocimientosBd: [(this.escalafon.conocimientosBd) ? ((this.escalafon.conocimientosBd > 0) ? this.escalafon.conocimientosBd: null): null, [Validators.required]],
        ceneval: [(this.escalafon.ceneval) ? ((this.escalafon.ceneval > 0) ? this.escalafon.ceneval: null): null, [Validators.required]],
        examenMedico:  [this.escalafon.examenMedico,[Validators.requiredTrue]],
        examenMedicoDescripcion: this.escalafon.examenMedicoDescripcion,
        cursoInduccion:  [this.escalafon.cursoInduccion,[Validators.requiredTrue]],
        clave:  this.escalafon.clave,
        //curp:  this.escalafon.curp,
        //rfc:  this.escalafon.rfc,
        //nombre:  this.escalafon.nombre,
        //paterno: this.escalafon.paterno,
        //materno:  this.escalafon.materno,
        //fechaNacimiento:  this.escalafon.fechaNacimiento,
      });
    } else {
      this.escalafon = new Escalafon();
      this.formularioEscalafon = this.fb.group({
        tecnicoMet: [null, [Validators.required]],
        conocimientosBd: [null , [Validators.required]],
        ceneval: [null, [Validators.required]],
        examenMedico:  [null, [Validators.requiredTrue]],
        examenMedicoDescripcion: null,
        cursoInduccion: [null, [Validators.requiredTrue]],
        clave:  null,
        //curp:  null,
        //rfc:  null,
        //nombre:  null,
        //paterno: null,
        //materno:  null,
        //fechaNacimiento:  null,
      });



      //alert("No se encontro informacion")

      this.toastService.toatsWarning("No se encontró información sobre el proceso de admisión. ")
    }


    if(this.accion == 'Visualizacion'){

/*       this.formularioEscalafon.get('tecnicoMet').disable();
      this.formularioEscalafon.get('conocimientosBd').disable();
      this.formularioEscalafon.get('ceneval').disable();
      this.formularioEscalafon.get('examenMedico').disable();
      this.formularioEscalafon.get('examenMedicoDescripcion').disable();
      this.formularioEscalafon.get('cursoInduccion').disable(); */

    }

  console.log(this.formularioEscalafon);
  }

  public async obtenerEscalafon(){

    const respuesta = await this.preregistroAspiranteService.obtenerEscalafonByIdaspirante(this.ID_ASPIRANTE);
    console.log(respuesta.objeto);

    return (respuesta.objeto)? respuesta.objeto[0] : null;
  }


  public mostrarAprobacion(){

    /* if(this.formularioEscalafon.get('tecnicoMet').valid ||
    this.formularioEscalafon.get('conocimientosBd').valid ||
    this.formularioEscalafon.get('ceneval').valid ||
    this.formularioEscalafon.get('examenMedico').valid ||
    this.formularioEscalafon.get('examenMedicoDescripcion').valid ||
    this.formularioEscalafon.get('cursoInduccion').valid ){ */

    /*
    if(this.formularioEscalafon.valid){
      return true;
    } else {
      return false;
    } */



    if(this.escalafon){
      if(
          (this.escalafon.tecnicoMet > 0 ) &&
          (this.escalafon.conocimientosBd > 0) &&
          (this.escalafon.ceneval > 0) &&
          (this.escalafon.examenMedico == true) &&
          (this.escalafon.cursoInduccion == true)
      ){
        return true;
      } else {
        return false;
      }


    }
    else {
      return false;
    }

  }


}


export class Escalafon{
    idEscalafon: number;
    idAspirante: number;
    tecnicoMet: number;
    conocimientosBd: number;
    ceneval: number;
    examenMedico: boolean;
    examenMedicoDescripcion: string;
    cursoInduccion: boolean;
    clave?: any;
    curp: string;
    rfc?: any;
    nombre: string;
    paterno: string;
    materno: string;
    fechaNacimiento: Date;

}
