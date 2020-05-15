import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  id: number;
  doctor: Doctor;

  constructor(private route: ActivatedRoute,
              private service: DoctorService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el doctor, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(doctor => {
        this.doctor = doctor;
      });
  }

  submit(doctor : Doctor) {
    doctor.idDoctor = this.id;
    this.service.modificar(doctor)
      .subscribe(result => {
        this.router.navigate(['/pages/doctores']);
        this.snackBar.open('El doctor fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/doctores']);
  }


}
