import { Component, OnInit } from '@angular/core';
import { IngresoService } from 'src/app/services/ingreso.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingreso } from 'src/app/models/ingreso';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-ingreso-add',
  templateUrl: './ingreso-add.component.html',
  styleUrls: ['./ingreso-add.component.css']
})
export class IngresoAddComponent implements OnInit {

  constructor(private service: IngresoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(ingreso: Ingreso) {
this.service.registrar(ingreso)
.pipe(
catchError(error => {
this.snackBar.open(error, null, {
  duration: 3000
});
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/ingresos']);
this.snackBar.open('Ingreso fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/ingresos']);
}
}
