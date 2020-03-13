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
  { state: 'examen', type: 'link', name: 'Imagenes y archivos', icon: 'collections' },
  { state: 'control', type: 'link', name: 'Controles', icon: 'date_range' },
  { state: 'cita', type: 'link', name: 'Citas', icon: 'alarm_add' },
  { state: 'tratamiento', type: 'link', name: 'Planes de tratamiento', icon: 'assignment' },
  { state: 'pago', type: 'link', name: 'Pagos', icon: 'payment' },
];


@Component({
  selector: 'zp-sidebar-paciente',
  templateUrl: './sidebar-paciente.component.html',
  styleUrls: ['./sidebar-paciente.component.scss']
})
export class SidebarPacienteComponent implements OnInit {
  
  id: number;
  paciente: Paciente = null;
  
  constructor(private route: ActivatedRoute,private service: PacienteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log('id find',this.id);
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
        console.log('paciente getById', paciente);
        this.paciente = paciente;
      });
  }

  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
