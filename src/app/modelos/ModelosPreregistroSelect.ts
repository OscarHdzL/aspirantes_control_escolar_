export class PreRegistroSelect {
  accion:                     null;
  tblDomicilio:               TblDomicilio;
  tblContactos:               TblContacto[];
  tblDatosAcademicos:         TblDatosAcademicos;
  tblDiscapacidad:            TblDiscapacidad;
  tblDocsAspirante:           null;
  tblDocsAspirante_:          TblDocsAspirante[];
  id:                         number;
  clave:                      null;
  curp:                       string;
  rfc:                        null;
  nombre:                     string;
  paterno:                    string;
  materno:                    string;
  fechaNacimiento:            Date;
  tipoSanguineo:              number;
  numSeguridadSocial:         string;
  ingresoAprox:               number;
  catDocumentoNacionalidadId: null;
  docNacionalidad:            string;
  docSeguridadSocial:         string;
  discapacidad:               boolean;
  catDeporteId:               number;
  bovedaCatEstadoCivilId:     number;
  bovedaCatPaisesIso:         string;
  bovedaCatGeneroId:          number;
  bovedaCatSeguridadSocialId: number;
  enedsep:                    null;
  enedsepdoc:                 null;
  catOfertaeducativaId:       number;
  numeroPasaporte:            null;
  inclusion:                  Date;
}

export class TblContacto {
  id:                           number;
  tblDatosGeneralesAspiranteId: number;
  contacto:                     string;
  bovedaCatTipoContactoId:      number;
  complemento:                  null;
}

export class TblDatosAcademicos {
  id:                                    number;
  tblDatosGeneralesAspiranteId:          number;
  bovedaCatUbicaciongEstadoBachillerato: string;
  catCertificadoBachilleratoId:          number;
  escuela:                               string;
  promedio:                              number;
  tieneLicenciatura:                     boolean;
  licenciatura:                          string;
  bovedaCatUbicaciongEstadoLicenciatura: string;
  catTiempoPracticaId:                   number;
  catFrecuenciaPracticaId:               number;
  catNivelPracticaId:                    number;
  catParticipacionPracticaId:            number;
  inclusion:                             Date;
/*   catCertificadoBachillerato:            null;
  catFrecuenciaPractica:                 null;
  catNivelPractica:                      null;
  catParticipacionPractica:              null;
  catTiempoPractica:                     null; */
}

export class TblDiscapacidad {
  id:                           number;
  tblDatosGeneralesAspiranteId: number;
  catTipoDiscapacidadId:        number;
  catDeporteDiscapacidadId:     number;
  catInstitucionDiscapacidadId: number;
  catClasificacionDiscapacidadId: number;
  inclusion:                    Date;
/*   catDeporteDiscapacidad:       null;
  catInstitucionDiscapacidad:   null;
  catTipoDiscapacidad:          null;
  tblDatosGeneralesAspirante:   null; */
}

export class TblDocsAspirante {
  id:                           number;
  tblDatosGeneralesAspiranteId: number;
  tblDocumentosId:              number;
  archivo:                      string;
  activo:                       boolean;
  inclusion:                    Date;
  estatus:                      string;
  documento:                      string;
  catEstatusDocApiranteId:              number;
/*   tblDatosGeneralesAspirante:   null;
  tblDocumentos:                null; */
}

export class TblDomicilio {
  id:                           number;
  tblDatosGeneralesAspiranteId: number;
  codigoPostal:                 string;
  colonia:                      string;
  calle:                        string;
  noInterior:                   string;
  noExterior:                   string;
  referencia:                   string;
  bovedaCatUbicaciongEstado:    string;
  bovedaCatUbicaciongMunicipio: string;
}
