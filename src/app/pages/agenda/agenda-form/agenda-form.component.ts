import { PacienteService } from 'src/app/services/paciente.service';
import { CitaService } from './../../../services/cita.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Paciente } from 'src/app/models/paciente';
import { Doctor } from 'src/app/models/doctor';
import { Cita } from 'src/app/models/cita';
import { catchError, startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from 'src/app/services/doctor.service';
import { Component, OnInit, Inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'zp-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {

  doctors: Doctor[];
  idCita: number;

  pacientes: Paciente[] = [];
  myControlPaciente: FormControl = new FormControl();
  filteredOptionsPaciente: Observable<any[]>;
  pacienteSeleccionado: Paciente;

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
    private pacienteService: PacienteService,
    public dialogRef: MatDialogRef<AgendaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.listDoctors();
   
    this.listPacientes();
    this.filteredOptionsPaciente = this.myControlPaciente.valueChanges
    .pipe(
      startWith(null),
      map(val => this.filterPaciente(val))
    );
    this.initEditForm(this.data);
  }

  private listPacientes() {
    this.pacienteService.getlistar()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los pacientes, intentalo mas tarde', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(paciente => {
        this.pacientes = paciente;
      });
  }

  private filterPaciente(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()));    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()));    }
  }

  displayFnPaciente(val: Paciente) {
    return val ? `${val.apellidos} ${val.nombres}` : val;
  }

  seleccionarPaciente(e) {
    this.pacienteSeleccionado = e.option.value;
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

    doctor.idDoctor = this.formGroup.get('doctorFrm').value;
    //paciente.idPaciente = this.idPaciente;

    cita.doctor = doctor;
    cita.paciente = this.pacienteSeleccionado;
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
      this.close();
      if(this.idCita!=0){
        this.snackBar.open('Se modifico la cita correctamente', 'Close', {
          duration: 5000
        });
      }
      else{
        this.snackBar.open('Se registro la cita correctamente', 'Close', {
          duration: 5000
        });
      }
     
    });

    this.dialogRef.close();
  }

  initEditForm(data:any){
    if(data!=null){
      this.idCita = data.idCita;
      this.citaService.getById(data.idCita).subscribe(c =>{
        this.formGroup.controls['doctorFrm'].setValue(c.doctor.idDoctor);
        this.myControlPaciente.setValue(c.paciente);
        this.pacienteSeleccionado=c.paciente;
        this.formGroup.controls['fechaFrm'].setValue(new Date(c.fechaHora));
        this.formGroup.controls['estadoFrm'].setValue(c.etapa);
        this.formGroup.controls['asuntoFrm'].setValue(c.asunto);
      });
    }

}

  clearForm(){
    this.formGroup.reset();
    this.myControlPaciente.reset();
  }
  
  close(){
    this.dialogRef.close();
  }


}
