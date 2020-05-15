import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { EgresoService } from 'src/app/services/egreso.service';
import { IngresoService } from 'src/app/services/ingreso.service';
import { PagoService } from './../../services/pago.service';
import { Component, OnInit} from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'zp-reporte-finanzas',
  templateUrl: './reporte-finanzas.component.html',
  styleUrls: ['./reporte-finanzas.component.css']
})
export class ReporteFinanzasComponent implements OnInit {

  fechaInicio: Date;
  fechaFin: Date;
  totalIngresos:number = 0;
  totalEgresos:number = 0;
  totalPagos:number = 0;
  totalAdicionales:number = 0;
  totalSaldo: number = 0;

  constructor(private pagoService: PagoService,
    private ingresoService: IngresoService,
    private egresoService: EgresoService,
    private snackBar: MatSnackBar,
    private pipe: DatePipe) 
    {

     }

  ngOnInit(): void {
  }

  getMontos(){

    if(this.fechaInicio!=null && this.fechaFin != null){
      let inicio = this.pipe.transform(this.fechaInicio, 'dd-MM-yyyy');
      let fin = this.pipe.transform(this.fechaFin, 'dd-MM-yyyy');

    forkJoin(this.pagoService.getMontosPorRangoFechas(inicio,fin),this.ingresoService.getMontosPorRangoFechas('01-04-2020','31-04-2020'),this.egresoService.getMontosPorRangoFechas('01-04-2020','31-04-2020'))
    .subscribe(result =>{
     

      result[0].forEach(x=>this.totalPagos+=x.monto);
      result[1].forEach(x=>this.totalAdicionales+=x.monto);
      result[2].forEach(x=>this.totalEgresos+=x.costo);

      this.totalIngresos = this.totalAdicionales + this.totalPagos;
      this.totalSaldo = this.totalIngresos - this.totalEgresos;
    })
  }
  
  else{
    this.snackBar.open('Ingresa las fechas de busqueda','Cerrar',
    {
      duration:3000
    });
    }
  }
}
