import { AgendaFormComponent } from './../agenda-form/agenda-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaService } from './../../../services/cita.service';
import { CitaDTO } from './../../../models/dto/cita';
import { Cita } from 'src/app/models/cita';
import { Paciente } from 'src/app/models/paciente';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'zp-agenda-search',
  templateUrl: './agenda-search.component.html',
  styleUrls: ['./agenda-search.component.css']
})
export class AgendaSearchComponent implements OnInit {
  cita: CitaDTO ;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private citaService: CitaService,
    private dialogRef:MatDialogRef<AgendaSearchComponent>,
     @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.cita = this.data.cita;    
  }

  close(){
    this.dialogRef.close();
  }

  delete(){
      this.citaService.eliminar(this.cita.idCita)
      .subscribe(result =>{
        this.snackBar.open('Se elimino la cita','Cerrar',
        {duration:3000})
        this.dialogRef.close();
      })
  }

  edit(){
    const dialogRef = this.dialog.open(AgendaFormComponent, {
      data:{
        idCita: this.cita.idCita
      },
      width: '550px',
      disableClose: true 
    
    });

    dialogRef.afterClosed().subscribe(result => {
        this.dialogRef.close();
    });
   

  }

  convertToDTO(cita:Cita){
    let citaDTO = new CitaDTO();
    citaDTO.apellidosDoctor = cita.doctor.apellidos
    citaDTO.nombresDoctor = cita.doctor.nombres
    citaDTO.apellidosPaciente = cita.paciente.apellidos
    citaDTO.nombresPaciente = cita.paciente.apellidos
    citaDTO.fechaHora = cita.fechaHora
    citaDTO.asunto = cita.asunto
   this.cita = citaDTO;
  }
 

}
