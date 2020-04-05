import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'zp-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    dni: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    telefono: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl(''),
    nroCop: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Doctor){ // model="doctor"
    if(!m) {
      return;
    }
    console.log('set model', m);
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.valid) {
      console.log('model',this.form.value);
      this.enviar.emit(this.form.value); // Enviamos el modelo de datos: Doctor
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
