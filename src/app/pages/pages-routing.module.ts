import { ProductoFormComponent } from './producto/producto-form/producto-form.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaEditComponent } from './categoria/categoria-edit/categoria-edit.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { GuardService } from './../services/guard.service';
import { EmpresaComponent } from './empresa/empresa.component';
import { ReporteFinanzasComponent } from './reporte-finanzas/reporte-finanzas.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AlertaComponent } from './paciente-list/paciente/alerta/alerta.component';
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
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { ReporteControlesComponent } from './reporte-controles/reporte-controles.component';
import { PacienteAddComponent } from './paciente-list/paciente-add/paciente-add.component';
import { PacienteEditComponent } from './paciente-list/paciente-edit/paciente-edit.component';
import { EgresoComponent } from './egreso/egreso.component';
import { EgresoAddComponent } from './egreso/egreso-add/egreso-add.component';
import { EgresoEditComponent } from './egreso/egreso-edit/egreso-edit.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { IngresoAddComponent } from './ingreso/ingreso-add/ingreso-add.component';
import { IngresoEditComponent } from './ingreso/ingreso-edit/ingreso-edit.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CategoriaAddComponent } from './categoria/categoria-add/categoria-add.component';


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
        component: DashboardComponent,
        canActivate:[GuardService]
      },
      {
        path: 'agenda',
        component: AgendaComponent,
        canActivate:[GuardService]
      },
      {
        path: 'empresa',
        component: EmpresaComponent,
        canActivate:[GuardService]
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
        canActivate:[GuardService]
      },
      {
        path: 'reporte-pagos',
        component: ReportePagosComponent,
        canActivate:[GuardService]
      },
      {
        path: 'reporte-controles',
        component: ReporteControlesComponent,
        canActivate:[GuardService]
      },
      {
        path: 'reporte-finanzas',
        component: ReporteFinanzasComponent,
        canActivate:[GuardService]
      },

      {
        path: 'procedimientos', // /pages/procedimiento
        component: ProcedimientoComponent,
        canActivate:[GuardService]
      },
      {
        path: 'procedimiento/add',
        component: ProcedimientoAddComponent,
        canActivate:[GuardService]
      },

      {
        path: 'procedimiento/edit/:id',
        component: ProcedimientoEditComponent,
        canActivate:[GuardService]
      },
      {
        path: 'egresos',
        component: EgresoComponent,
        canActivate:[GuardService]
      },
      {
        path: 'egreso/add',
        component: EgresoAddComponent,
        canActivate:[GuardService]
      },
      {
        path: 'egreso/edit/:id',
        component: EgresoEditComponent,
        canActivate:[GuardService]
      },
      {
        path: 'ingresos',
        component: IngresoComponent,
        canActivate:[GuardService]
      },
      {
        path: 'ingreso/add',
        component: IngresoAddComponent,
        canActivate:[GuardService]
      },
      {
        path: 'ingreso/edit/:id',
        component: IngresoEditComponent,
        canActivate:[GuardService]
      },
      {
        path: 'categorias',
        component: CategoriaComponent,
        canActivate:[GuardService]
      },
      {
        path: 'categoria/add',
        component: CategoriaAddComponent,
        canActivate:[GuardService]
      },
      {
        path: 'categoria/edit/:id',
        component: CategoriaEditComponent,
        canActivate:[GuardService]
      },
       //CRUD PRODUCTO
       {
        path: 'producto',
        component: ProductoComponent
      },
      {
        path: 'producto/form',
        component: ProductoFormComponent
      },
      {
        path: 'doctores',
        component: DoctorComponent,
        canActivate:[GuardService]
      },
      {
        path: 'doctor/add',
        component: DoctorAddComponent,
        canActivate:[GuardService]
      },
      {
        path: 'doctor/edit/:id',
        component: DoctorEditComponent,
        canActivate:[GuardService]
      }
      ,
      {
        path: 'pacientes',
        component: PacienteListComponent,
        canActivate:[GuardService]
      },
      {
        path: 'paciente/add',
        component: PacienteAddComponent,
        canActivate:[GuardService]
      },
      {
        path: 'paciente/edit/:id',
        component: PacienteEditComponent,
        canActivate:[GuardService]
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
