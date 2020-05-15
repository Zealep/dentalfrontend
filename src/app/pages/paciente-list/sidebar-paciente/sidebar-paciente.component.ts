import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'datos', type: 'link', name: 'Datos personales', icon: 'person' },
  { state: 'examenes', type: 'link', name: 'Imagenes y archivos', icon: 'collections' },
  { state: 'control', type: 'link', name: 'Controles', icon: 'class' },
  { state: 'odontograma', type: 'link', name: 'Odontograma', icon: 'ballot' },
  { state: 'cita', type: 'link', name: 'Citas', icon: 'date_range' },
  { state: 'tratamiento-list', type: 'link', name: 'Planes de tratamiento', icon: 'assignment' },
  { state: 'pago', type: 'link', name: 'Pagos', icon: 'payment' },
  { state: 'alerta', type: 'link', name: 'Alertas', icon: 'notification_important' }
];


@Component({
  selector: 'zp-sidebar-paciente',
  templateUrl: './sidebar-paciente.component.html',
  styleUrls: ['./sidebar-paciente.component.scss']
})
export class SidebarPacienteComponent implements OnInit {
  
  id: number;
  paciente: Paciente = null;
  alertas: string;
  
  constructor(private route: ActivatedRoute,private service: PacienteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el paciente, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(paciente => {
        this.paciente = paciente;
        this.getAlertas(this.paciente);
      });
  }

  getAlertas(paciente:Paciente){
    let alertas: string[] = []
    for( let p of paciente.alertas){
      alertas.push(p.nombre)
    }
  
    this.alertas = alertas.toString();
  }

  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
