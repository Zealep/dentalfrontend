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


@NgModule({
  declarations: [PagesComponent, DashboardComponent, ProcedimientoComponent, PacienteComponent, SidebarPacienteComponent, PacienteListComponent],
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
