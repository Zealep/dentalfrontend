import { ProcedimientoEditComponent } from './procedimiento/procedimiento-edit/procedimiento-edit.component';
import { ProcedimientoAddComponent } from './procedimiento/procedimiento-add/procedimiento-add.component';
import { ProcedimientoComponent } from './procedimiento/procedimiento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorAddComponent } from './doctor/doctor-add/doctor-add.component';
import { DoctorEditComponent } from './doctor/doctor-edit/doctor-edit.component';
import { AgedaComponent } from './ageda/ageda.component';
import { RecaudacionComponent } from './recaudacion/recaudacion.component';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { ReporteControlesComponent } from './reporte-controles/reporte-controles.component';
import { PacienteAddComponent } from './paciente-list/paciente-add/paciente-add.component';
import { PacienteEditComponent } from './paciente-list/paciente-edit/paciente-edit.component';


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
        path: 'agenda',
        component: AgedaComponent
      },
      {
        path: 'recaudacion',
        component: RecaudacionComponent
      },
      {
        path: 'reporte-pagos',
        component: ReportePagosComponent
      },
      {
        path: 'reporte-controles',
        component: ReporteControlesComponent
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
      },
      {
        path:'doctores',
        component:DoctorComponent,
      },
      {
        path:'doctor/add',
        component: DoctorAddComponent
      },
      {
        path:'doctor/edit/:id',
        component: DoctorEditComponent
      }
      ,
      {
        path: 'pacientes', 
        component: PacienteListComponent
      },
      {
        path: 'paciente/add',
        component: PacienteAddComponent
      },
      {
        path: 'paciente/edit/:id',
        component: PacienteEditComponent
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
