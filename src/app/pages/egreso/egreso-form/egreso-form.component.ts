import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Egreso } from 'src/app/models/egreso';

@Component({
  selector: 'zp-egreso-form',
  templateUrl: './egreso-form.component.html',
  styleUrls: ['./egreso-form.component.css']
})
export class EgresoFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    fechaEgreso: new FormControl(''),
    descripcion: new FormControl(''),
    costo: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Egreso){ 
    if(!m) {
      return;
    }
    console.log('set model', m);
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Egreso> = new EventEmitter<Egreso>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.valid) {
      console.log('model',this.form.value);
      this.enviar.emit(this.form.value); // Enviamos el modelo de datos: Egreso
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
