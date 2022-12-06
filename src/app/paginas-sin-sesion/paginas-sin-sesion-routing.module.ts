import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PreregistroAspiranteComponent } from './preregistro-aspirante/preregistro-aspirante.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormularioDinamicoComponent } from './formulario-dinamico/formulario-dinamico.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSesionAspiranteComponent } from './inicio-sesion-aspirante/inicio-sesion-aspirante.component';

const rutas: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'sesion-aspirante',
    component: InicioSesionAspiranteComponent
  },
  {
    path: 'preregistro-aspirante',
    component: PreregistroAspiranteComponent
  },
  {
    path: 'formulario',
    component: FormularioComponent
  }
  ,
  {
    path: 'formulario-dinamico',
    component: FormularioDinamicoComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule]
})
export class PaginasSinSesionRoutingModule { }

