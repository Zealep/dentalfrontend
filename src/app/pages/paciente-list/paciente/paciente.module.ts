import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { ExamenComponent } from './examen/examen.component';
import { PlanTratamientoComponent } from './plan-tratamiento/plan-tratamiento.component';
import { ControlComponent } from './control/control.component';
import { CitaComponent } from './cita/cita.component';
import { PagoComponent } from './pago/pago.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TratamientoListComponent } from './plan-tratamiento/tratamiento-list/tratamiento-list.component';
import { ExamenListComponent } from './examen/examen-list/examen-list.component';
import { ProcedimientoDialogComponent } from './plan-tratamiento/procedimiento-dialog/procedimiento-dialog.component';
import { PagoComprobanteComponent } from './pago/pago-comprobante/pago-comprobante.component';
import { AgendarCitaComponent } from './cita/agendar-cita/agendar-cita.component';
import { CitaFormComponent } from './cita/cita-form/cita-form.component';
import { ControlFormComponent } from './control/control-form/control-form.component';
import { AlertaComponent } from './alerta/alerta.component';
import { AlertaFormComponent } from './alerta/alerta-form/alerta-form.component';
import { CitaEtapaComponent } from './cita/cita-etapa/cita-etapa.component';
import {NgxPrintModule} from 'ngx-print';
import { LightboxModule } from 'ngx-lightbox';
import { IncreaseImageComponent } from './examen/increase-image/increase-image.component';
import { OdontogramaComponent } from './odontograma/odontograma.component';
import { AddOdontogramaComponent } from './odontograma/add-odontograma/add-odontograma.component';


@NgModule({
  declarations: [DatosPersonalesComponent, ExamenComponent, PlanTratamientoComponent, ControlComponent, CitaComponent, PagoComponent, TratamientoListComponent, ExamenListComponent, ProcedimientoDialogComponent, PagoComprobanteComponent, AgendarCitaComponent, CitaFormComponent, ControlFormComponent, AlertaComponent, AlertaFormComponent, CitaEtapaComponent, IncreaseImageComponent, OdontogramaComponent, AddOdontogramaComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,
    LightboxModule
  ],
  providers:[
    DatePipe
  ]
})
export class PacienteModule { }
