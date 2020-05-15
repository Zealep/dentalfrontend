import { Component, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/egreso';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresoService } from 'src/app/services/egreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-egreso-edit',
  templateUrl: './egreso-edit.component.html',
  styleUrls: ['./egreso-edit.component.css']
})
export class EgresoEditComponent implements OnInit {

  id: number;
  egreso: Egreso;

  constructor(private route: ActivatedRoute,
              private service: EgresoService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    // GET /products/:id
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el egreso, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(egreso => {
        this.egreso = egreso;
      });
  }

  submit(egreso : Egreso) {
    egreso.idEgreso = this.id;
    this.service.modificar(egreso)
      .subscribe(result => {
        this.router.navigate(['/pages/egresos']);
        this.snackBar.open('El egreso fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/egresos']);
  }


}

