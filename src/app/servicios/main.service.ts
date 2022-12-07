import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaModel } from '../modelos/respuesta.model';



@Injectable({
  providedIn: 'root'
})
export class MainService {
  url_renapo = 'https://wsrenapo.conade.gob.mx/';
/*   gatewayServiciosEnedPreRegistro  = 'http://10.10.0.175:8428/';
  gatewayServiciosEnedPreRegistroAdministracion  = 'http://10.10.0.32:9071/';
  gatewayFormularioDinamico = 'http://10.10.0.175:8429/';
  */
  //gatewayFormularioDinamico = 'https://localhost:7217/'
  urlServiciosJWT = 'https://localhost:7243/'
  //gatawayArchivos = 'http://10.10.0.32:8065/'
  gatawayArchivos = 'http://198.251.71.105:90/'
  //urlServicioControlEscolar = 'http://10.10.0.32:8056/Servicios/'
  urlServicioControlEscolar = 'https://localhost:7243/';


//

  constructor(public httpClient: HttpClient) { }
  getAsync(url: string): Promise<any> {
    return new Promise(resolve => {
      const subscription = this.httpClient.get<any>(url)
        .subscribe(
          data => {
            subscription.unsubscribe();
            resolve(data);

          }, error => {
            subscription.unsubscribe();
            resolve({
              EXITO: false,
              MENSAJE: error.message.toString(),
              RESPUESTA: error.error.text
            } as RespuestaModel);
          });
    });
  }

  postAsync(url: string, objeto: any): Promise<any> {

    return new Promise(resolve => {

      const subscription = this.httpClient.post(url, objeto)
        .subscribe(
          data => {

            subscription.unsubscribe();

            resolve(data ? data : { EXITO: true } as RespuestaModel);
          },
          error => {

            subscription.unsubscribe();

            return resolve({
              EXITO: false,
              MENSAJE: error.message.toString(),
              RESPUESTA: null
            } as RespuestaModel);
          });
    });
  }

  putAsync(url: string, objeto: any): Promise<any> {
    return new Promise(resolve => {
      const subscription = this.httpClient.put(url, objeto)
        .subscribe(
          data => {

            subscription.unsubscribe();

            resolve(data ? data : { EXITO: true } as RespuestaModel);
          },
          error => {

            subscription.unsubscribe();

            return resolve({
              EXITO: false,
              MENSAJE: error.message.toString(),
              RESPUESTA: null
            } as RespuestaModel);
          });
    });
  }

  deleteAsync(url: string): Promise<any> {

    return new Promise(resolve => {

      const subscription = this.httpClient.delete<any>(url)
        .subscribe(
          data => {

            subscription.unsubscribe();

            resolve(data ? data : { EXITO: true } as RespuestaModel);

          }, error => {

            subscription.unsubscribe();

            resolve({
              EXITO: false,
              MENSAJE: error.message.toString(),
              RESPUESTA: null
            } as RespuestaModel);
          });
    });
  }

}

