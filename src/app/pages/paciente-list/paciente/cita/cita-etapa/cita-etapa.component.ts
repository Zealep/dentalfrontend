import { CitaService } from './../../../../../services/cita.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'zp-cita-etapa',
  templateUrl: './cita-etapa.component.html',
  styleUrls: ['./cita-etapa.component.css']
})
export class CitaEtapaComponent implements OnInit {

  idCita: number;
  estadoCita: string;
  
  constructor(private dialogRef: MatDialogRef<CitaEtapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private citaService: CitaService) { }

  ngOnInit(): void {
    this.idCita = this.data.idCita;
    this.estadoCita = 'PENDIENTE';
  }

  modificarEtapa(){
    this.citaService.modificarEtapa(this.idCita,this.estadoCita)
    .subscribe(x=>{
      this.dialogRef.close();
    });
  }
  cerrar(){
    this.dialogRef.close();
  }

}
