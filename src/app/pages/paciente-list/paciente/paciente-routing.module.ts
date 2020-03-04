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
      path: ':id',
      component: PacienteComponent,
      children:[
        {
          path: 'datos',
          component: DatosPersonalesComponent
        }
      ]
    
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
