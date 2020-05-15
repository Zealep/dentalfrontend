import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'zp-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css']
})
export class PacienteEditComponent implements OnInit {
  id: number;
  paciente: Paciente;

  constructor(private route: ActivatedRoute,
              private service: PacienteService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
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
      });
  }

  submit(paciente : Paciente) {
    paciente.idPaciente = this.id;
    this.service.modificar(paciente)
      .subscribe(result => {
        this.router.navigate(['/pages/pacientes']);
        this.snackBar.open('El paciente fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/pacientes']);
  }


}
