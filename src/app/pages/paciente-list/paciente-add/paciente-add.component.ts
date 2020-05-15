import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from 'src/app/models/paciente';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-paciente-add',
  templateUrl: './paciente-add.component.html',
  styleUrls: ['./paciente-add.component.css']
})
export class PacienteAddComponent implements OnInit {

  constructor(private service: PacienteService,
    private router: Router,
    private snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }
  submit(paciente: Paciente) {
    this.service.registrar(paciente)
      .pipe(
        catchError(error => {
          this.snackBar.open(error, null, {
            duration: 3000
          });
          // catch & replace
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.router.navigate(['/pages/pacientes']);
        // mensaje de confirmacion
        this.snackBar.open('Paciente fue registrado', 'Close', {
          duration: 3000// milliseconds
        });
      });
  }

  cancel() {
    this.router.navigate(['/pages/pacientes']);
  }
}

