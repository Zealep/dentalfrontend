import { AlertaComponent } from './alerta/alerta.component';
import { AgendarCitaComponent } from './cita/agendar-cita/agendar-cita.component';
import { PagoComprobanteComponent } from './pago/pago-comprobante/pago-comprobante.component';
import { ExamenListComponent } from './examen/examen-list/examen-list.component';
import { TratamientoListComponent } from './plan-tratamiento/tratamiento-list/tratamiento-list.component';
import { PlanTratamientoComponent } from './plan-tratamiento/plan-tratamiento.component';
import { PagoComponent } from './pago/pago.component';
import { ControlComponent } from './control/control.component';
import { CitaComponent } from './cita/cita.component';
import { ExamenComponent } from './examen/examen.component';
import { PacienteComponent } from './paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteListComponent } from '../paciente-list.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';


const routes: Routes = [
    {
      path: '',
      component: PacienteListComponent
    },
    {
      path: 'ver/:id',
      component: PacienteComponent,
      children: [
        {
          path: 'datos',
          component: DatosPersonalesComponent 
        },
        {
          path: 'examen',
          component: ExamenComponent 
        },
        {
          path: 'examenes',
          component: ExamenListComponent
        },
        {
          path: 'cita',
          component: CitaComponent
        },
        {
          path: 'agendar-cita',
          component: AgendarCitaComponent
        },
        {
          path: 'control',
          component: ControlComponent
        },
        {
          path: 'pago',
          component: PagoComponent
        },
        {
          path: 'pago-comprobante',
          component: PagoComprobanteComponent
        },
        {
          path: 'tratamiento',
          component: PlanTratamientoComponent
        },
        {
          path: 'tratamiento-list',
          component: TratamientoListComponent
        },
        {
          path: 'alerta',
          component: AlertaComponent
        }
      ]
    }
   
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
