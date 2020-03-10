import { ProcedimientoService } from 'src/app/services/procedimiento.service';
import { Component, OnInit } from '@angular/core';
import { Procedimiento } from 'src/app/models/procedimiento';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-procedimiento-edit',
  templateUrl: './procedimiento-edit.component.html',
  styleUrls: ['./procedimiento-edit.component.css']
})
export class ProcedimientoEditComponent implements OnInit {

  id: number;
  procedimiento: Procedimiento;

  constructor(private route: ActivatedRoute,
              private service: ProcedimientoService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    // GET /products/:id
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el procedimiento, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(procedimiento => {
        console.log('procedimiento', procedimiento);
        this.procedimiento = procedimiento;
      });
  }

  submit(procedimiento : Procedimiento) {
    procedimiento.idProcedimiento = this.id;
    console.log('Going to update', procedimiento);
    this.service.modificar(procedimiento)
      .subscribe(result => {
        console.log('Update finished', result);
        this.router.navigate(['/pages/procedimientos']);
        this.snackBar.open('El procedimiento fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/procedimientos']);
  }


}
