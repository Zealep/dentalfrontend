import { CitaFormComponent } from './../cita-form/cita-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CitaDTO } from './../../../../../models/dto/cita';
import { MatTableDataSource } from '@angular/material/table';
import { CitaService } from './../../../../../services/cita.service';
import { Paciente } from 'src/app/models/paciente';
import { Cita } from 'src/app/models/cita';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from './../../../../../models/doctor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'zp-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  idPaciente: number;


  selectedDate: any;
  citas:CitaDTO[];
  fecha: string;

  displayedColumns:string[] = ['paciente','doctor','hora','estado'];
  dsCitas: MatTableDataSource<CitaDTO>;


  constructor(private doctorService: DoctorService, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private citaService: CitaService,
    private datePipe: DatePipe,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onSelect(new Date());
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
  }

  openDialog(): void {
  
    const dialogRef = this.dialog.open(CitaFormComponent, {
      data: { idPaciente:this.idPaciente},
      width: '550px',
      disableClose: true 
    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCitasByDate(this.fecha);
    });
  }

  onSelect(event:any){
    this.selectedDate = event;
    this.fecha = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
    this.getCitasByDate(this.fecha);
  }

  getCitasByDate(fecha: string){
    this.citaService.getListarByDate(fecha)
    .subscribe(citas =>{
      this.citas = citas;
      this.dsCitas = new MatTableDataSource(this.citas);
    });
  }

  getColorEtapa(etapa:string){
    switch(etapa){
      case 'PENDIENTE': return '#00c853';
      case 'ATENDIDA': return '#0d47a1';
      case 'CANCELADA': return '#c62828';
      default: return 'black';

    }
  }
  

}
