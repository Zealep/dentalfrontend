import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingreso } from 'src/app/models/ingreso';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IngresoService } from 'src/app/services/ingreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';

@Component({
  selector: 'zp-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  lista: Ingreso[] = [];
  displayedColumns:string[] = ['idIngreso', 'fechaIngreso', 'descripcion','monto','acciones'];
  dataSource: MatTableDataSource<Ingreso>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private ingresoService: IngresoService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadIngresos();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
   deleteIngreso(ingreso: Ingreso) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar ingreso',
         message: 'Deseas borrar el ingreso?'
       }
     });
 
     dialogRef.afterClosed()
       .subscribe(result => {
         if(result) {
           this.sendDeleteRequest(ingreso);
         }
       });
   }
 
   private loadIngresos(){
     this.ingresoService.getlistar().subscribe(data => {
       let ingresos = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(ingresos);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;    
     });
   }
 
   private sendDeleteRequest(ingreso: Ingreso) {
     this.ingresoService.eliminar(ingreso.idIngreso)
     .subscribe(response => {
       console.log('Ingreso has been deleted', response);
       this.loadIngresos();
       this.snackBar.open('Ingreso eliminado', 'Close', {
         duration: 3000
       });
     });
   }

}
