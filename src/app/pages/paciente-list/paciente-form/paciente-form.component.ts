import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'zp-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    dni: new FormControl(''),
    nroHistoria: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    telefono: new FormControl(''),
    celular: new FormControl(''),
    direccion: new FormControl(''),
    lugarProcedencia: new FormControl(''),
    fechaInicio: new FormControl(new Date()),
    email: new FormControl(''),
    foto: new FormControl('')

  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Paciente){ // model="paciente"
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Paciente> = new EventEmitter<Paciente>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();



  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.valid) {
      this.enviar.emit(this.form.value); // Enviamos el modelo de datos: Doctor
    } else {
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
