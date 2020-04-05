import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertaService } from './../../../../../services/alerta.service';
import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/models/alerta';

@Component({
  selector: 'zp-alerta-form',
  templateUrl: './alerta-form.component.html',
  styleUrls: ['./alerta-form.component.css']
})
export class AlertaFormComponent implements OnInit {

  alertas: Alerta[];
  nombreAlerta: string;

  constructor(
    private alertaService:AlertaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AlertaFormComponent>
  ) { }

  ngOnInit(): void {
    this.getAlertas();

  }

  saveAlerta(){
    let alerta = new Alerta();
    alerta.nombre = this.nombreAlerta;
    this.alertaService.registrar(alerta)
    .subscribe(result=>{
      this.getAlertas();
      this.snackBar.open('Se registro la alerta correctamente', 'Close', {
        duration: 3000
      });
    })
  }

  getAlertas(){
    this.alertaService.getlistar()
    .subscribe(results=>{
      this.alertas = results;
    });
  }
  close(){
    this.dialogRef.close();
  }

}
