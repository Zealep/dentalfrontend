import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/models/ingreso';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresoService } from 'src/app/services/ingreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-ingreso-edit',
  templateUrl: './ingreso-edit.component.html',
  styleUrls: ['./ingreso-edit.component.css']
})
export class IngresoEditComponent implements OnInit {

  
  id: number;
  ingreso: Ingreso;

  constructor(private route: ActivatedRoute,
              private service: IngresoService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    // GET /products/:id
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el ingreso, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(ingreso => {
        this.ingreso = ingreso;
      });
  }

  submit(ingreso : Ingreso) {
    ingreso.idIngreso = this.id;
    this.service.modificar(ingreso)
      .subscribe(result => {
        this.router.navigate(['/pages/ingresos']);
        this.snackBar.open('El ingreso fue modificado', 'Close', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/ingresos']);
  }


}

