import { Component, OnInit } from '@angular/core';
import { EgresoService } from 'src/app/services/egreso.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Egreso } from 'src/app/models/egreso';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-egreso-add',
  templateUrl: './egreso-add.component.html',
  styleUrls: ['./egreso-add.component.css']
})
export class EgresoAddComponent implements OnInit {

  constructor(private service: EgresoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(egreso: Egreso) {
console.log('Going to save', egreso);
this.service.registrar(egreso)
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
console.log('The egreso has been added', result);
this.router.navigate(['/pages/egresos']);
// mensaje de confirmacion
this.snackBar.open('Egreso fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/egresos']);
}
}
