import { CitaFormComponent } from './cita-form/cita-form.component';
import { Cita } from './../../../../models/cita';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogModel } from './../../../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from './../../../../services/doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from './../../../../services/cita.service';
import { Component, OnInit } from '@angular/core';
import { CitaEtapaComponent } from './cita-etapa/cita-etapa.component';

@Component({
  selector: 'zp-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  displayedColumns:string[] = ['acciones','asunto','dentista','fecha','hora','estado'];
  idPaciente : number;
  dsCitas: MatTableDataSource<Cita>;
  


  constructor(private citaService:CitaService,
              private route:ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.getAllCitas(this.idPaciente);
  }


  getAllCitas(id:number){
    this.citaService.getListarByPaciente(id)
    .subscribe(items =>{
      this.dsCitas = new MatTableDataSource(items);
    });
  }
  deleteCita(cita: Cita) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar cita',
        message: 'Deseas borrar la cita?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(cita);
        }
      });
  }

  private sendDeleteRequest(cita: Cita) {
    this.citaService.eliminar(cita.idCita)
    .subscribe(response => {
      this.getAllCitas(this.idPaciente);
      this.snackBar.open('Cita eliminada', 'Close', {
        duration: 3000
      });
    });
  }

  editar(cita:Cita){
    const dialogRef = this.dialog.open(CitaFormComponent, {
      data: { idPaciente:this.idPaciente,
              idCita:cita.idCita},
      width: '550px',
      disableClose: true 
    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCitas(this.idPaciente);
    });
  }

  changeEtapa(cita: Cita){
    const dialogRef = this.dialog.open(CitaEtapaComponent, {
      data: { idCita:cita.idCita},
      width: '300px',
      disableClose: true 
    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCitas(this.idPaciente);
    });
  }

}
