import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }
  //Endpoints Formulario
 /*  public async login() : Promise <any> {
    return await this.getAsync(this.gatewayFormularioDinamico + 'Formulario/Consultar');
  } */
  login(objeto: any)
  {
      return this.postAsync(this.urlServiciosJWT + 'Login', objeto);
  }

  ObtenerToken(objeto: any)
  {
      return this.postAsync(this.urlServiciosJWT + 'Login/ObtenerToken', objeto);
  }


  getCustomers(objeto: any)
  {
      return this.getAsync(this.urlServiciosJWT + 'api/customers');
  }

}
