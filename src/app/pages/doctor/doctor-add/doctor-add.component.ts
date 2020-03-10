import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from 'src/app/models/doctor';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {

  constructor(private service: DoctorService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() {
}

submit(doctor: Doctor) {
console.log('Going to save', doctor);
this.service.registrar(doctor)
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
console.log('The doctor has been added', result);
this.router.navigate(['/pages/doctores']);
// mensaje de confirmacion
this.snackBar.open('Doctor fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/doctores']);
}
}

