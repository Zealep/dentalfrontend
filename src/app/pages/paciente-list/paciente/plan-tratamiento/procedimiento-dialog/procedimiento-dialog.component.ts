import { TratamientoDetalle } from './../../../../../models/tratamientoDetalle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { Procedimiento } from 'src/app/models/procedimiento';
import { ProcedimientoService } from 'src/app/services/procedimiento.service';
import { startWith, map, catchError } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'zp-procedimiento-dialog',
  templateUrl: './procedimiento-dialog.component.html',
  styleUrls: ['./procedimiento-dialog.component.css']
})
export class ProcedimientoDialogComponent implements OnInit {

  
  procedimientos: Procedimiento[] = [];
  myControlProcedimiento: FormControl = new FormControl();
  filteredOptionsProcedimiento: Observable<any[]>;
  procedimientoSeleccionado: Procedimiento;

  idProcedimientoModel: number;
  precioModel: number;
  cantidadModel: number;
  piezasModel: string;
  observacionModel: string;

  constructor(private procedimientoService: ProcedimientoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProcedimientoDialogComponent>
    ) { }

  ngOnInit(): void {
    this.listProcedimientos();
    this.filteredOptionsProcedimiento = this.myControlProcedimiento.valueChanges
    .pipe(
      startWith(null),
      map(val => this.filterProcedimiento(val))
    );
  }

  
  private listProcedimientos() {
    this.procedimientoService.getlistar()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los procedimientos, intentalo mas tarde', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(procedimiento => {
        this.procedimientos = procedimiento;
      });
  }

  private filterProcedimiento(val: any) {
    if (val != null && val.idProcedimiento > 0) {
      return this.procedimientos.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.procedimientos.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFnProcedimiento(val: Procedimiento) {
    return val ? `${val.nombre}` : val;
  }

  seleccionarProcedimiento(e) {
    this.procedimientoSeleccionado = e.option.value;
    this.precioModel = e.option.value.costo;
  }

  send(){

      let detalleTratamiento = new TratamientoDetalle();
      let procedimiento = new Procedimiento();
      procedimiento = this.procedimientoSeleccionado; 
      detalleTratamiento.procedimiento = procedimiento;
      detalleTratamiento.precio = this.precioModel;
      detalleTratamiento.cantidad = this.cantidadModel;
      detalleTratamiento.piezas = this.piezasModel;
      detalleTratamiento.observacion = this.observacionModel;
      detalleTratamiento.total = this.cantidadModel * this.precioModel;
      this.dialogRef.close(detalleTratamiento);

  }

  close(){
    this.dialogRef.close();
  }

}
