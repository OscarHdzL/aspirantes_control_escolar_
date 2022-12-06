import { EstatusEscalafonComponent } from './estatus-escalafon/estatus-escalafon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CuestionarioConvocatoriaComponent } from './cuestionario-convocatoria/cuestionario-convocatoria.component';
import { CargaDocumentosAspiranteComponent } from './carga-documentos-aspirante/carga-documentos-aspirante.component';
import { AuthGuard } from '../auth.guard';


const rutas: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cuestionario-convocatoria',
    component: CuestionarioConvocatoriaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'carga-documentos-aspirante',
    component: CargaDocumentosAspiranteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'escalafon',
    component: EstatusEscalafonComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
