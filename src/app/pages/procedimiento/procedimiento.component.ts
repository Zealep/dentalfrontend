import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Procedimiento } from 'src/app/models/procedimiento';
import { MatSort } from '@angular/material/sort';
import { ProcedimientoService } from 'src/app/services/procedimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'zp-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {
  lista: Procedimiento[] = [];
  displayedColumns:string[] = ['idProcedimiento', 'nombre', 'costo','descripcion','acciones'];
  dataSource: MatTableDataSource<Procedimiento>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private procedimientoService: ProcedimientoService,private snackBar: MatSnackBar, public route: ActivatedRoute,private dialog: MatDialog) { }

  ngOnInit(): void {
   this.loadProcedimientos();
  }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProcedimiento(procedimiento: Procedimiento) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar Procedimiento',
        message: 'Deseas borrar el procedimiento?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(procedimiento);
        }
      });
  }

  private loadProcedimientos(){
    this.procedimientoService.getlistar().subscribe(data => {
      let procedimientos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(procedimientos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    });
  }

  private sendDeleteRequest(procedimiento: Procedimiento) {
    this.procedimientoService.eliminar(procedimiento.idProcedimiento)
    .subscribe(response => {
      console.log('Procedimiento has been deleted', response);
      this.loadProcedimientos();
      this.snackBar.open('Procedimiento eliminado', 'Close', {
        duration: 3000
      });
    });
  }

}
