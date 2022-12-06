import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'vex-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  ID_OFERTA_EDUCATIVA_PREREGISTRO = 1
  anio = new Date().getFullYear();
  constructor(
    private servicioAuth: AutenticacionService
  ) { }

  async ngOnInit(){
   /*  const respuesta = await this.servicioAuth.getCustomers({});
    console.log(respuesta); */
  }


  public click(msj){
    alert(msj);
  }
/*
  public irAPreregistro(){

  }

  public irAAccesoAspirante(){

  } */
}
