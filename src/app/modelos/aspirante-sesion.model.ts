export interface AspiranteSesionModel {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  nombreCompleto: string;
  numeroPasaporte?: string;
  curp?: string;
  cat_ofertaeducativa_id: number;
}
