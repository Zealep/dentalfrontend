import { Component, OnInit, ViewChild } from '@angular/core';
import { Egreso } from 'src/app/models/egreso';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EgresoService } from 'src/app/services/egreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';

@Component({
  selector: 'zp-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.css']
})
export class EgresoComponent implements OnInit {

  lista: Egreso[] = [];
  displayedColumns:string[] = ['idEgreso', 'fechaEgreso', 'descripcion','costo','acciones'];
  dataSource: MatTableDataSource<Egreso>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private egresoService: EgresoService,private snackBar: MatSnackBar, public route: ActivatedRoute ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEgresos();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
   deleteEgreso(egreso: Egreso) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar egreso',
         message: 'Deseas borrar el egreso?'
       }
     });
 
     dialogRef.afterClosed()
       .subscribe(result => {
         if(result) {
           this.sendDeleteRequest(egreso);
         }
       });
   }
 
   private loadEgresos(){
     this.egresoService.getlistar().subscribe(data => {
       let egresos = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(egresos);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;    
     });
   }
 
   private sendDeleteRequest(egreso: Egreso) {
     this.egresoService.eliminar(egreso.idEgreso)
     .subscribe(response => {
       console.log('Egreso has been deleted', response);
       this.loadEgresos();
       this.snackBar.open('Egreso eliminado', 'Close', {
         duration: 3000
       });
     });
   }

}
