import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Paciente } from 'src/app/models/paciente';
import { Doctor } from 'src/app/models/doctor';
import { Cita } from 'src/app/models/cita';
import { catchError } from 'rxjs/operators';
import { CitaService } from './../../../../../services/cita.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from 'src/app/services/doctor.service';
import { Component, OnInit, Inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'zp-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css']
})
export class CitaFormComponent implements OnInit {
  
  doctors: Doctor[];
  idPaciente: number;
  idCita: number;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  formGroup: FormGroup = new FormGroup({
    doctorFrm: new FormControl(''),
    fechaFrm: new FormControl(''),
    estadoFrm: new FormControl(''),
    asuntoFrm: new FormControl(''),
  })
  
  constructor(private doctorService: DoctorService, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private citaService: CitaService,
    public dialogRef: MatDialogRef<CitaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
   this.idPaciente = this.data.idPaciente;
    this.listDoctors();
    this.initEditForm(this.data);
  }

  private listDoctors() {
    this.doctorService.getlistar()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los doctores, intentalo mas tarde', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(doctor => {
        this.doctors = doctor;
      });
  }


  saveForm(){
    let cita = new Cita();
    let doctor = new Doctor();
    let paciente = new Paciente();

    doctor.idDoctor = this.formGroup.get('doctorFrm').value;
    //paciente.idPaciente = this.idPaciente;

    cita.doctor = doctor;
    paciente.idPaciente = this.idPaciente;
    cita.paciente = paciente;
    let fechaZone = this.formGroup.get('fechaFrm').value;
    fechaZone = new Date(fechaZone - fechaZone.getTimezoneOffset() * 60000)
    cita.fechaHora = fechaZone;
    cita.etapa = this.formGroup.get('estadoFrm').value;
    cita.asunto = this.formGroup.get('asuntoFrm').value;

    if(this.idCita!=0){
      cita.idCita = this.idCita;
    }
    
    this.citaService.registrar(cita)
    .subscribe(result =>{
      this.clearForm();
      
      this.snackBar.open('Se registro la cita correctamente', 'Close', {
        duration: 5000
      });
    });
  }

  initEditForm(data:any){
    console.log('entro edit cita',data)
    if(data.idCita!=null){
      this.idCita = data.idCita;
      this.citaService.getById(data.idCita).subscribe(c =>{
        this.formGroup.controls['doctorFrm'].setValue(c.doctor.idDoctor);
        this.formGroup.controls['fechaFrm'].setValue(new Date(c.fechaHora));
        this.formGroup.controls['estadoFrm'].setValue(c.etapa);
        this.formGroup.controls['asuntoFrm'].setValue(c.asunto);
      });
    }

}

  clearForm(){
    this.formGroup.reset();
  }
  
  close(){
    this.dialogRef.close();
  }

}
