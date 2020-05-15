import { MatSnackBar } from '@angular/material/snack-bar';
import { PacienteService } from 'src/app/services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertaService } from './../../../../services/alerta.service';
import { Alerta } from './../../../../models/alerta';
import { MatDialog } from '@angular/material/dialog';
import { AlertaFormComponent } from './alerta-form/alerta-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  alertas: Alerta[];
  alertasForm: FormGroup;
  arrayAlertas: any;
  idPaciente: number;
  paciente: Paciente = new Paciente;


  constructor(
    private dialog: MatDialog,
    private alertaService:AlertaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.obtenerPaciente(this.idPaciente);
    this.alertasForm = this.formBuilder.group({
      alertas: this.formBuilder.array([])
    });

    this.getAlertas();
  }

  getAlertas(){
    this.alertaService.getlistar()
    .subscribe(results=>{
      this.alertas = results;
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(AlertaFormComponent, {
      width: '550px',
      disableClose: true 
    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAlertas();
    });
  }

  toggle(event:any){
    const alertas = <FormArray>this.alertasForm.get('alertas') as FormArray;

    if(event.checked) {
      alertas.push(new FormControl(event.source.value))
    } else {
      const i = alertas.controls.findIndex(x => x.value === event.source.value);
      alertas.removeAt(i);
    }
    
    this.arrayAlertas = alertas;
   

  }
  obtenerPaciente(id:number){
    this.pacienteService.getById(id)
    .subscribe(x =>{
      this.paciente = x;
    })
  }

  saveAlertas(){

    let alertas:Alerta[]= [];


    for (let element of this.arrayAlertas.controls){
        let alerta = new Alerta();
        alerta.idAlerta = element.value;
        alertas.push(alerta);
    }

     this.paciente.alertas = alertas;
     
     this.pacienteService.registrarAlertas(this.paciente)
     .subscribe(result =>{
       this.snackBar.open('Alertas actualizadas del paciente','Close',
       {
         duration:4000
       }
       )
     })

  }

}
