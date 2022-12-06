import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CatalogoDeporte{
  id: number;
  deporte: string;
  activo: boolean;
  tblDatosGeneralesAspirantes: any[];
}

export class CatalogoDocumentoNacionalidad{
  id: number;
  documento: string;
  activo: boolean;
  tblDatosGeneralesAspirantes: any[];
}

export class CatalogoCertificadoBachillerato{
  id: number;
  bachillerato: string;
  tblDatosAcademicos: any[];
}


export class CatalogoTiempoPractica{
  id: number;
  rango: string;
  tblDatosAcademicos: any[];
}


export class CatalogoFrecuenciaPractica{
  id: number;
  frecuencia: string;
  tblDatosAcademicos: any[];
}

export class CatalogoNivelPractica{
  id: number;
  nivel: string;
  tblDatosAcademicos: any[];
}

export class CatalogoParticipacionPractica{
  id: number;
  participacion: string;
  tblDatosAcademicos: any[];
}


export class CatalogoTipoDiscapacidad{
  id: number;
  discapacidad: string;
  tblDiscapacidads: any[];
}


export class CatalogoDeporteDiscapacidad{
  id: number;
  deporte: string;
  relDeporteNivelClasificacions: any[];
  tblDiscapacidads: any[];
}

export class CatalogoClasificacionDiscapacidad{
/*   id: number;
  catDeporteDiscapacidadId: number;
  catNivelClasificacionId: number;
  catDeporteDiscapacidad?: any;
  catNivelClasificacion: CatNivelClasificacion;
  catClasificacionDiscapacidads: CatClasificacionDiscapacidad[]; */

  id: number;
  clasificacion: string;
  idDeporte: number;
  deporte: string;
  idNivel: number;
  nivel: string;
}

export class CatNivelClasificacion {
  id: number;
  nivel: string;
  relDeporteNivelClasificacions: any[];
}

export class CatClasificacionDiscapacidad {
  id: number;
  relDeporteNivelClasificacionId: number;
  clasificacion: string;
  relDeporteNivelClasificacion?: any;
  tblDiscapacidadClasificacions: any[];
}

export class CatalogoInstitucionDiscapacidad{
  id: number;
  institucion: string;
  tblDiscapacidads: any[];
}

export class CatalogoEstadoCivil{
  id: number;
  descripcion: string;
  activo: boolean;
  inclusion: Date;
}


export class CatalogoGenero{
  catId: number;
        catName: string;
        activo: boolean;
}

export class CatalogoSeguridadSocial{
  id: number;
  catSeguridadSocial1: string;
}

export class CatalogoTipoContacto{
  id: number;
  tipo: string;
  tipoContacto: string;
}

export class CatalogoPais{
  id: number;
  iso: string;
  nombre: string;
}

export class CatalogoUbicacion{
  id: number;
  catEstadoId: number;
  codigoPostal: string;
  colonia: string;
  municipio: string;
  estado: string;
  ciudad: string;
  inclusion: Date;
}

export class CatalogoDocumentos{
  id: number;
  tblPeriodoRegistroId: number;
  nombre: string;
  descripcion: string;
  obligatorio: boolean;
  extensiones: string;
  activo: boolean;
  inclusion: Date;
  tblPeriodoRegistro?: any;
  tblDocumentosAspirantes: any[];
  token?: string

}



export class PreRegistroComplex {
  id: number;
  clave: string;
  curp: string;
  rfc: string;
  nombre: string;
  paterno: string;
  materno: string;
  fechaNacimiento: string;
  tipoSanguineo: string;
  numSeguridadSocial: string;
  ingresoAprox: number;
  catDocumentoNacionalidadId: number;
  docNacionalidad: string;
  docSeguridadSocial: string;
  discapacidad: boolean;
  catDeporteId: number;
  bovedaCatEstadoCivilId: number;
  bovedaCatPaisesIso: string;
  bovedaCatGeneroId: number;
  bovedaCatSeguridadSocialId: number;
  enedsep: string;
  enedsepdoc: string;
  catOfertaeducativaId: number;
  numeroPasaporte: string;
  inclusion: string;
  accion: string;
  tblDomicilio: TblDomicilio;
  tblContactos: TblContacto[];
  tblDatosAcademicos: TblDatosAcademico;
  tblDiscapacidad: TblDiscapacidad;
  tblDocsAspirante: Array<TblDocAspiranteComplex>;
}

export class TblDomicilio {
  id: number;
  tblDatosGeneralesAspiranteId: number;
  codigoPostal: string;
  colonia: string;
  calle: string;
  noInterior: string;
  noExterior: string;
  referencia: string;
  bovedaCatUbicaciongEstado: string;
  bovedaCatUbicaciongMunicipio: string;
}

export class TblContacto {
  id: number;
  tblDatosGeneralesAspiranteId: number;
  contacto: string;
  bovedaCatTipoContactoId: number;
  complemento: string;
}

export class TblDatosAcademico {
  id: number;
  tblDatosGeneralesAspiranteId: number;
  bovedaCatUbicaciongEstadoBachillerato: string;
  catCertificadoBachilleratoId: number;
  escuela: string;
  promedio: number;
  tieneLicenciatura: boolean;
  licenciatura: string;
  bovedaCatUbicaciongEstadoLicenciatura: string;
  catTiempoPracticaId: number;
  catFrecuenciaPracticaId: number;
  catNivelPracticaId: number;
  catParticipacionPracticaId: number;
  inclusion: string | null;
}

export class TblDiscapacidad {
  id: number;
  tblDatosGeneralesAspiranteId: number;
  catTipoDiscapacidadId: number;
  catDeporteDiscapacidadId: number;
  catInstitucionDiscapacidadId: number;
  catClasificacionDiscapacidadId: number;
  inclusion: string;
}


export class TblDocAspiranteComplex {
  id?: number;
  tblDatosGeneralesAspiranteId?: number;
  tblDocumentosId?: number;
  archivo: string;
  activo: boolean;
}

export class CatalogoTipoSanguineo{
  id: number;
  tiposanguineo: string;
}


export class tblDocumentosAspirtanteObservaciones{
  id: number;
  tblDocumentosAspiranteId: number;
  documento: string;
  catEstatusDocApirante: number;
  estatusDocApirante: number;
  observacion: string;
  inclusion: string;
  icon: string;
  color: string;
  esUltimoEstatus: boolean;
  mostrarBotonOtroArchivo: boolean;
  archivoHistorico: string;
}



export class periodoRegistro {
  idPeriodo: number;
  descripcionCorta: string;
  fechaInicio: string;
  fechaFin: string;
  periodo: number;
  activo: boolean;
  idOfertaEducativa: number;
  ofertaEducativa: string;
  sigla: string;
}
