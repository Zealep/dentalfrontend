import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PacienteService } from 'src/app/services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';

@Component({
  selector: 'zp-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {

  lista: Paciente[] = [];
  displayedColumns:string[] = ['idPaciente', 'apellidos', 'nombres','dni','nroHistoria','fechaNacimiento','telefono','celular','direccion','lugarProcedencia','email','acciones'];
  dataSource: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private pacienteService: PacienteService,private snackBar: MatSnackBar, public route: ActivatedRoute,private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.loadPacientes();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
   deletePaciente(paciente: Paciente) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar Paciente',
         message: 'Deseas borrar el paciente?'
       }
     });
 
     dialogRef.afterClosed()
       .subscribe(result => {
         if(result) {
           this.sendDeleteRequest(paciente);
         }
       });
   }
 
   private loadPacientes(){
     this.pacienteService.getlistar().subscribe(data => {
       let pacientes = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(pacientes);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;    
     });
   }
 
   private sendDeleteRequest(paciente: Paciente) {
     this.pacienteService.eliminar(paciente.idPaciente)
     .subscribe(response => {
       console.log('Paciente fue eliminado', response);
       this.loadPacientes();
       this.snackBar.open('Paciente eliminado', 'Close', {
         duration: 3000
       });
     });
   }

}
