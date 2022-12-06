import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreregistroAspiranteService extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }
  //Endpoints Formulario
 /*  public async obtenerFormularios() : Promise <any> {
    return await this.getAsync(this.gatewayFormularioDinamico + 'Formulario/Consultar');
  }
  altaFormulario(objeto: any)
  {
      return this.postAsync(this.gatewayFormularioDinamico + 'Formulario/Agregar', objeto);
  } */


  public async loginAspirante(objeto: any)
  {
    return this.postAsync(this.urlServicioControlEscolar + 'PreRegistro/Login', objeto);
  }


  public async obtenerPeriodoPorOfertaEducativa(idOfertaEducativa) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'PreRegistro/SelectPeriodoDispByOfertaEducativa/'+ idOfertaEducativa);
  }


  public async altaPreregistro(objeto: any)
  {
    return this.postAsync(this.urlServicioControlEscolar + 'PreRegistro/Alta', objeto);
  }

  public async actualizacionDatosGeneralesPreregistro(objeto: any)
  {
    return this.postAsync(this.urlServicioControlEscolar + 'PreRegistro/ActualizacionDatosGenerales', objeto);
  }

  public async actualizacionDomicilioPreregistro(objeto: any)
  {
    return this.postAsync(this.urlServicioControlEscolar + 'PreRegistro/ActualizacionDomicilio', objeto);
  }

  public async altaDocumentosAspirante(objeto: any)
  {
    return this.postAsync(this.urlServicioControlEscolar + 'Documentos/AltaDocumentoAspirante', objeto);
  }

  public async altaListaDocumentosAspirante(objeto: any)
  {
    return this.postAsync(this.urlServicioControlEscolar + 'Documentos/AltaListaDocumentosAspirante', objeto);
  }

  public async ActualizarDocumentoAspirante(objeto: any)
  {
    return this.postAsync(this.urlServicioControlEscolar + 'Documentos/ActualizarDocumentoAspirante', objeto);
  }

  public async obtenerPreregistroAspirante(idPreregistro: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'PreRegistro/SelectById?id='+idPreregistro);
  }

  public async obtenerCatalogoDeporte() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/Deporte');
  }

  public async obtenerCatalogTipoSanguineo() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/TipoSanguineo');
  }

  public async obtenerCatalogoDocumentoNacionalidad() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/DocumentoNacionalidad');
  }

  public async obtenerCatalogoCertificadoBachillerato() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/CertificadoBachillerato');
  }

  public async obtenerCatalogoTiempoPractica() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/TiempoPractica');
  }

  public async obtenerCatalogoFrecuenciaPractica() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/FrecuenciaPractica');
  }

  public async obtenerCatalogoNivelPractica() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/NivelPractica');
  }

  public async obtenerCatalogoParticipacionPractica() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/ParticipacionPractica');
  }

  public async obtenerCatalogoTipoDiscapacidad() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/TipoDiscapacidad');
  }

  public async obtenerCatalogoDeporteDiscapacidad() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/DeporteDiscapacidad');
  }

  public async obtenerCatalogoClasificacionDiscapacidad(idDeporteDiscapacidad: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/ClasificacionDiscapacidad?DeporteId='+idDeporteDiscapacidad);
  }

  public async obtenerCatalogoInstitucionDiscapacidad() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/InstitucionDiscapacidad');
  }



  public async obtenerCatalogoEstadoCivil() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'CatalogosBoveda/EstadoCivil');
  }

  public async obtenerCatalogoGenero() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'CatalogosBoveda/Genero');
  }

  public async obtenerCatalogoSeguridadSocial() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'CatalogosBoveda/SeguridadSocial');
  }

  public async obtenerCatalogoTipoContacto() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'CatalogosBoveda/TipoContacto');
  }

  public async obtenerCatalogoPais() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'CatalogosBoveda/Pais');
  }

  public async obtenerCatalogoUbicacion(codigoPostal: string) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'CatalogosBoveda/Ubicacion?codigoPostal='+codigoPostal);
  }

  public async obtenerCatalogoEstado() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'CatalogosBoveda/Estado');
  }


  public async obtenerCatalogoDocumentos() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Documentos/GetAllDocumentos');
  }


  public async obtenerObservacionesDocumento(DocumentoAspiranteId: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Documentos/GetObservacionesDocumento/'+ DocumentoAspiranteId);
  }

  public async obtenerEscalafones() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Escalafones/GetAllEscalafon');
  }
  public async obtenerEscalafonByIdaspirante(AspiranteId: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Escalafones/GetByIdAspirante?idAspirante='+ AspiranteId);
  }





}
