import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';

@Component({
  selector: 'zp-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  lista: Doctor[] = [];
  displayedColumns:string[] = ['idDoctor', 'apellidos', 'nombres','dni','fechaNacimiento','telefono','celular','email','nroCop','acciones'];
  dataSource: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  
  constructor(private doctorService: DoctorService, private snackBar: MatSnackBar, public route: ActivatedRoute, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.loadDoctores();
   }
    applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
   deleteDoctor(doctor: Doctor) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       maxWidth: '600px',
       data: <ConfirmDialogModel>{
         title: 'Eliminar Doctor',
         message: 'Deseas borrar el doctor?'
       }
     });
 
     dialogRef.afterClosed()
       .subscribe(result => {
         if(result) {
           this.sendDeleteRequest(doctor);
         }
       });
   }
 
   private loadDoctores(){
     this.doctorService.getlistar().subscribe(data => {
       let doctores = JSON.parse(JSON.stringify(data));
       this.dataSource = new MatTableDataSource(doctores);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;    
     });
   }
 
   private sendDeleteRequest(doctor: Doctor) {
     this.doctorService.eliminar(doctor.idDoctor)
     .subscribe(response => {
       console.log('Doctor has been deleted', response);
       this.loadDoctores();
       this.snackBar.open('Doctor eliminado', 'Close', {
         duration: 3000
       });
     });
   }
}
