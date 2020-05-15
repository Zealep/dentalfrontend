import { AgendaSearchComponent } from './agenda-search/agenda-search.component';
import { Cita } from 'src/app/models/cita';
import { CitaService } from './../../services/cita.service';
import { DatePipe } from '@angular/common';
import { CitaDTO } from './../../models/dto/cita';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  selectedDate: any;
  citas:CitaDTO[];
  fecha: string;
  
  constructor(private dialog: MatDialog,
    private datePipe: DatePipe,
    private citaService: CitaService) { }

  ngOnInit(): void {
    this.onSelect(new Date());
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
    });
  }
  

  openDialog(){
        
    const dialogRef = this.dialog.open(AgendaFormComponent, {
      width: '550px',
      disableClose: true 
    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCitasByDate(this.fecha);
    });
  }

  showAgenda(c:Cita){
    const dialogRef = this.dialog.open(AgendaSearchComponent, {
      data: {
        cita:c
      },
      width: '550px'    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCitasByDate(this.fecha);
    });
  }

}
