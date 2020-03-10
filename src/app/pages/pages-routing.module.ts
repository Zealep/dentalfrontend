import { ProcedimientoEditComponent } from './procedimiento/procedimiento-edit/procedimiento-edit.component';
import { ProcedimientoAddComponent } from './procedimiento/procedimiento-add/procedimiento-add.component';
import { ProcedimientoComponent } from './procedimiento/procedimiento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteListComponent } from './paciente-list/paciente-list.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [ // 
      {
        path: '', // 
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard', // /pages/dashboard
        component: DashboardComponent
      },

      {
        path: 'procedimientos', // /pages/procedimiento
        component: ProcedimientoComponent
      },
      {
        path: 'procedimiento/add',
        component: ProcedimientoAddComponent
      },

      {
        path: 'procedimiento/edit/:id',
        component: ProcedimientoEditComponent
      }
      ,
      {
        path: 'pacientes', // /pages/paciente
        component: PacienteListComponent
      },
      {
        path: 'paciente',
        loadChildren: () => import('./paciente-list/paciente/paciente.module').then(m => m.PacienteModule)
      }

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
