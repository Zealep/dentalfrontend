import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from './../../services/producto.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../models/producto';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'zp-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  list: Producto[] = [];
  displayedColumns: string[] = [ 'categoria', 'codigo','nombre','descripcion','stock','stockMin','precioVenta','acciones'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productoService: ProductoService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute ,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private load(){
    this.productoService.getAll().subscribe(data => {
      let productos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(producto: Producto){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar producto',
        message: 'Deseas borrar el producto?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(producto);
        }
      });
  }

  private sendDeleteRequest(producto: Producto) {
    this.productoService.eliminar(producto.idProducto)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Producto eliminado', 'Cerrar', {
        duration: 3000
      });
    });
  }

  callEdit(idProducto: number){
    this.router.navigate(['/pages/producto/form',{product:idProducto}]);
  }

}

