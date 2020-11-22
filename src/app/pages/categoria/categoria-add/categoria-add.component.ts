import { catchError } from 'rxjs/operators';
import { Categoria } from './../../../models/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

constructor(private service: CategoriaService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(categoria: Categoria) {
this.service.save(categoria)
.pipe(
catchError(error => {
this.snackBar.open(error, null, {
  duration: 3000
});
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/categorias']);
this.snackBar.open('Categoria fue registrada', 'Cerrar', {
duration: 3000
});
});
}

cancel() {
this.router.navigate(['/pages/categorias']);
}
}
