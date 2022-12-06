import { Component, OnInit } from '@angular/core';

import { RenapoService } from 'src/app/servicios/renapo.service';

@Component({
  selector: 'vex-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  val: number;

  constructor(
    private servicioRenapo: RenapoService
  ) { }

  ngOnInit(): void {
    //this.obtenerCURP();
  }

  /* public async obtenerCURP(){

    const respuesta = await this.servicioRenapo.ObtieneDatosCurp('COCM990909HQRLNR00');
    console.log(respuesta);
  } */
}
