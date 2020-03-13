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
          component: DatosPersonalesComponent, 
        },
        {
          path: 'examen',
          component: ExamenComponent, 
        }
      ]
    }
   
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
