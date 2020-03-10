import { ProcedimientoService } from 'src/app/services/procedimiento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Procedimiento } from 'src/app/models/procedimiento';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'zp-procedimiento-add',
  templateUrl: './procedimiento-add.component.html',
  styleUrls: ['./procedimiento-add.component.css']
})
export class ProcedimientoAddComponent implements OnInit {

  constructor(private service: ProcedimientoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() {
}

submit(procedimiento: Procedimiento) {
console.log('Going to save', procedimiento);
this.service.registrar(procedimiento)
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
console.log('The procedimiento has been added', result);
this.router.navigate(['/pages/procedimientos']);
// mensaje de confirmacion
this.snackBar.open('Procedimiento fue registrado', 'Close', {
duration: 3000// milliseconds
});
});
}

cancel() {
this.router.navigate(['/pages/procedimientos']);
}
}
