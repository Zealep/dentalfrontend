import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcedimientoComponent } from './procedimiento/procedimiento.component';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteComponent } from './paciente-list/paciente/paciente.component';
import { SidebarPacienteComponent } from './paciente-list/sidebar-paciente/sidebar-paciente.component';
import { PacienteModule } from './paciente-list/paciente/paciente.module';
import { PacienteFormComponent } from './paciente-list/paciente-form/paciente-form.component';
import { PacienteAddComponent } from './paciente-list/paciente-add/paciente-add.component';
import { PacienteEditComponent } from './paciente-list/paciente-edit/paciente-edit.component';
import { ProcedimientoEditComponent } from './procedimiento/procedimiento-edit/procedimiento-edit.component';
import { ProcedimientoAddComponent } from './procedimiento/procedimiento-add/procedimiento-add.component';
import { ProcedimientoFormComponent } from './procedimiento/procedimiento-form/procedimiento-form.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorFormComponent } from './doctor/doctor-form/doctor-form.component';
import { DoctorAddComponent } from './doctor/doctor-add/doctor-add.component';
import { DoctorEditComponent } from './doctor/doctor-edit/doctor-edit.component';
import { AgedaComponent } from './ageda/ageda.component';
import { RecaudacionComponent } from './recaudacion/recaudacion.component';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { ReporteControlesComponent } from './reporte-controles/reporte-controles.component';


@NgModule({
  declarations: [PagesComponent, DashboardComponent, ProcedimientoComponent, PacienteComponent, SidebarPacienteComponent, PacienteListComponent, PacienteFormComponent, PacienteAddComponent, PacienteEditComponent, ProcedimientoEditComponent, ProcedimientoAddComponent, ProcedimientoFormComponent, DoctorComponent, DoctorFormComponent, DoctorAddComponent, DoctorEditComponent, AgedaComponent, RecaudacionComponent, ReportePagosComponent, ReporteControlesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    PacienteModule
  ]
})
export class PagesModule { }
