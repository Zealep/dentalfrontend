import { forkJoin, Observable, of } from 'rxjs';
import { DialogTratamientoComponent } from './dialog-tratamiento/dialog-tratamiento.component';
import { DialogPacienteComponent } from './dialog-paciente/dialog-paciente.component';
import { DialogBirthdayComponent } from './dialog-birthday/dialog-birthday.component';
import { MatDialog } from '@angular/material/dialog';
import { IngresoService } from 'src/app/services/ingreso.service';
import { EgresoService } from 'src/app/services/egreso.service';
import { SingleBarra } from './../../models/dto/single-barra';
import { PagoTotalMesesDTO } from './../../models/dto/pago-meses';
import { PagoService } from './../../services/pago.service';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { OrtodonciaService } from './../../services/ortodoncia.service';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { single } from './data';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ortodoncia } from 'src/app/models/ortodoncia';
import { Tratamiento } from 'src/app/models/tratamiento';
import { DialogOrtodonciaComponent } from './dialog-ortodoncia/dialog-ortodoncia.component';


@Component({
  selector: 'zp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cumpleanheros: Paciente[];
  cumpleanherosSize: number;
  nuevos: Paciente[];
  nuevosSize: number;
  newsOrtodoncias: Ortodoncia[];
  newsOrtodonciasSize: number;
  newsTratamientoss: Tratamiento[];
  newsTratamientosSize: number;

  pagosDia:number;
  egresosDia:number;
  ingresosDia:number;

  pieResults: any[] = [];
  viewPie : any;
  barraResults: any[] = [];
  viewBarra : any;
  pagosDTO: PagoTotalMesesDTO[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'S/. Pagos';

  colorScheme = {
    domain: ['#90caf9', '#9fa8da','#80cbc4']
  };

  constructor(private pacienteService: PacienteService,
    private ortodonciaService: OrtodonciaService,
    private tratamientoService: TratamientoService,
    private pagoService: PagoService,
    private egresoService: EgresoService,
    private ingresoService: IngresoService,
    private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    this.getFinanzasPieChart();
    this.getCumpleanhos();
    this.getPacientesNuevos();
    this.getNewsOrtodoncias();
    this.getNewsTratamientos();
    this.getPagosTotalMeses();
    this.getPagosPorDia();
    this.getIngresosPorDia();
    this.getEgresosPorDia();
 
  }

  onSelect(event) {
  }

  getCumpleanhos(){
    this.pacienteService.cumpleaños()
    .subscribe(result=>{
      this.cumpleanheros = result;
      this.cumpleanherosSize = this.cumpleanheros.length;
    })
  }

  getPacientesNuevos(){
    this.pacienteService.getNuevos()
    .subscribe(result=>{
      this.nuevos = result;
      this.nuevosSize = this.nuevos.length;
    })
  }

  getNewsOrtodoncias(){
    this.ortodonciaService.getNews()
    .subscribe(result=>{
      this.newsOrtodoncias = result;
      this.newsOrtodonciasSize = this.newsOrtodoncias.length;
    })
  }

  getNewsTratamientos(){
    this.tratamientoService.getNews()
    .subscribe(result=>{
      this.newsTratamientoss = result;
      this.newsTratamientosSize = this.newsTratamientoss.length;
    })
  }

  getPagosTotalMeses(){
    this.pagoService.getPagosTotalMeses()
    .subscribe(result=>{
      this.barraResults = this.convertPagoDTOtoSingleBarra(result);
      this.viewBarra = of(this.barraResults);
    })
  }

  getPagosPorDia(){
    this.pagoService.getPagosPorDia()
    .subscribe(result=>{
      this.pagosDia = result;
    })
  }

  getEgresosPorDia(){
    this.egresoService.getEgresosPorDia()
    .subscribe(result=>{
      this.egresosDia = result;
    })
  }

  getIngresosPorDia(){
    this.ingresoService.getIngresosPorDia()
    .subscribe(result=>{
      this.ingresosDia = result;
    })
  }

  getFinanzasPieChart(){
    forkJoin(this.pagoService.getPagosPorMes(),this.ingresoService.getIngresosPorMes(),this.egresoService.getEgresosPorMes())
    .subscribe(result =>{
      const pagos = result[0]
      const ingresos =  result[1] 
      const egresos =  result[2];
    
      let pago = new SingleBarra();
      pago.name = "PAGOS" 
      pago.value = pagos;

      let ingreso = new SingleBarra();
      ingreso.name = "INGRESOS" 
      ingreso.value = ingresos;

      let egreso = new SingleBarra();
      egreso.name = "EGRESOS" 
      egreso.value = egresos;

      this.pieResults.push(pago);
      this.pieResults.push(ingreso);
      this.pieResults.push(egreso);

      this.viewPie = of(this.pieResults);
    })
  }



  convertPagoDTOtoSingleBarra(pagos:PagoTotalMesesDTO[]){
    let datos:any[] = [];
    pagos.forEach(x=>{
      let single = new SingleBarra();
      single.name = x.fecha;
      single.value = x.total;
      datos.push(single);
    })

    return datos;
  }

  openDialogBirthday(){

    const dialogRef = this.dialog.open(DialogBirthdayComponent,{
      data:this.cumpleanheros,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
  
    });

  }

  openDialogPaciente(){

    const dialogRef = this.dialog.open(DialogPacienteComponent,{
      data:this.nuevos,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
  
    });

  }

  openDialogOrtodoncia(){

    const dialogRef = this.dialog.open(DialogOrtodonciaComponent,{
      data:this.newsOrtodoncias,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
  
    });

  }

  openDialogTratamiento(){

    const dialogRef = this.dialog.open(DialogTratamientoComponent,{
      data:this.newsTratamientoss,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
  
    });

  }
  

}
