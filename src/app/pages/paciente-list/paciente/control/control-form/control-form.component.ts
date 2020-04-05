import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlService } from './../../../../../services/control.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { Control } from './../../../../../models/control';
import { Tratamiento } from 'src/app/models/tratamiento';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'zp-control-form',
  templateUrl: './control-form.component.html',
  styleUrls: ['./control-form.component.css']
})
export class ControlFormComponent implements OnInit {

  idPaciente: number;
  tratamientos: Tratamiento[];
  idControl: number;

    formGroup: FormGroup = new FormGroup({
    tratamientoFrm: new FormControl(''),
    fechaFrm: new FormControl(''),
    comentariosFrm: new FormControl(''),
  })

  constructor(private tratamientoService: TratamientoService,
    private snackBar: MatSnackBar,
    private controlService: ControlService,
    public dialogRef: MatDialogRef<ControlFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.idPaciente = this.data.idPaciente;
    this.getListTratamientosByPaciente(this.idPaciente);
    this.initEditForm(this.data);
  }

  getListTratamientosByPaciente(idPaciente:number){
    this.tratamientoService.findByPaciente(idPaciente)
    .subscribe(results =>{
      this.tratamientos = results
    });
  }

  initEditForm(data:any){
      if(data.idControl!=null){
        this.idControl = data.idControl;
        this.controlService.getById(data.idControl).subscribe(c =>{
          this.formGroup.controls['tratamientoFrm'].setValue(c.tratamiento.idTratamiento);
          this.formGroup.controls['fechaFrm'].setValue(c.fechaControl);
          this.formGroup.controls['comentariosFrm'].setValue(c.comentarios);
        });
      }

  }

  saveForm(){
    
    let control = new Control();
    let tratamiento = new Tratamiento();
 
    if(this.idControl!=0){
      control.idControl = this.idControl;
    }
    tratamiento.idTratamiento = this.formGroup.get('tratamientoFrm').value;
    control.tratamiento = tratamiento;
    control.fechaControl = this.formGroup.get('fechaFrm').value;
    control.comentarios = this.formGroup.get('comentariosFrm').value;
    
    this.controlService.registrar(control)
    .subscribe(result =>{
      this.dialogRef.close();
      this.snackBar.open('Se registro el control correctamente', 'Close', {
        duration: 5000
      });
    });
  }

  clearForm(){
    this.formGroup.reset();
  }
  
  close(){
    this.dialogRef.close();
  }

}
