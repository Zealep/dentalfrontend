import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Ingreso } from 'src/app/models/ingreso';

@Component({
  selector: 'zp-ingreso-form',
  templateUrl: './ingreso-form.component.html',
  styleUrls: ['./ingreso-form.component.css']
})
export class IngresoFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    fechaIngreso: new FormControl(''),
    descripcion: new FormControl(''),
    monto: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Ingreso){ 
    if(!m) {
      return;
    }
    console.log('set model', m);
    this.form.patchValue(m);
  }

  @Output() submit: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.valid) {
      console.log('model',this.form.value);
      this.submit.emit(this.form.value); // Enviamos el modelo de datos: Egreso
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}