import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';


@NgModule({
  declarations: [DatosPersonalesComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule
  ]
})
export class PacienteModule { }
