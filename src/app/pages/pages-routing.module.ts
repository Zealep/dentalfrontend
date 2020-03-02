import { ProcedimientoComponent } from './procedimiento/procedimiento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';


const routes: Routes = [
  {
    path:'',
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
        path: 'procedimiento', // /pages/procedimiento
        component: ProcedimientoComponent
      },
      {
        path: 'paciente', // /pages/procedimiento
        component: PacienteComponent
      }
    
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
