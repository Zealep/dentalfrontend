
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Procedimiento } from 'src/app/models/procedimiento';

@Component({
  selector: 'zp-procedimiento-form',
  templateUrl: './procedimiento-form.component.html',
  styleUrls: ['./procedimiento-form.component.css']
})
export class ProcedimientoFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    costo: new FormControl(''),
    descripcion: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Procedimiento){ // model="procedimiento"
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Procedimiento> = new EventEmitter<Procedimiento>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.valid) {
      this.enviar.emit(this.form.value); // Enviamos el modelo de datos: Procedimiento
    } else {
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
