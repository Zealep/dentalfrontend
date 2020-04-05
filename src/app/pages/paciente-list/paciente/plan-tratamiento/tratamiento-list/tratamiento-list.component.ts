import { ESTADO_ACTIVO, ETAPA_FINALIZADA_TRATAMIENTO, ETAPA_ACTIVA_TRATAMIENTO } from './../../../../../shared/var.constant';
import { Tratamiento } from 'src/app/models/tratamiento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'zp-tratamiento-list',
  templateUrl: './tratamiento-list.component.html',
  styleUrls: ['./tratamiento-list.component.css']
})
export class TratamientoListComponent implements OnInit {

  idPaciente : number;
  tratamientosActivos : Tratamiento[] = [];
  tratamientosFinalizados : Tratamiento[] = [];
  

  displayedColumns: string[] = ['idTratamiento', 'nombre', 'doctor', 'montoTotal', 'etapa','acciones'];
  dsTratamientosActivos: MatTableDataSource<Tratamiento>;
  dsTratamientosFinalizados: MatTableDataSource<Tratamiento>;

  
  constructor(private route: ActivatedRoute, private tratamientoService: TratamientoService, private snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {

    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.loadTratamientos();
  }

  getListByPaciente(id: number){
    this.tratamientoService.findByPaciente(id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los tratamientos por paciente, intentalo mas tarde', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(tratamientos => {
        console.log('tratamientos',tratamientos)
      });
  }

  getListTratamientosActivos(id:number){
    this.tratamientoService.findByPacienteAndEtapa(id,ETAPA_ACTIVA_TRATAMIENTO)
    .pipe(
      catchError(error =>{
        this.snackBar.open('No se pudo obtener los tratamientos por paciente y etapa , intentalo mas tarde', null, {
          duration: 3000
        });
        return EMPTY;
      })
    )
    .subscribe(tratamientos =>{
      this.tratamientosActivos = tratamientos;
      this.dsTratamientosActivos = new MatTableDataSource(this.tratamientosActivos);
    });
  }

  getListTratamientosFinalizados(id:number){
    this.tratamientoService.findByPacienteAndEtapa(id,ETAPA_FINALIZADA_TRATAMIENTO)
    .pipe(
      catchError(error =>{
        this.snackBar.open('No se pudo obtener los tratamientos por paciente y etapa , intentalo mas tarde', null, {
          duration: 3000
        });
        return EMPTY;
      })
    )
    .subscribe(tratamientos =>{
      this.tratamientosFinalizados = tratamientos;
      this.dsTratamientosFinalizados = new MatTableDataSource(this.tratamientosFinalizados);
    });
  }

  finishTratamiento(tratamiento: Tratamiento){
    this.tratamientoService.changeEtapa(tratamiento.idTratamiento,ETAPA_FINALIZADA_TRATAMIENTO)
    .pipe(
      catchError(error =>{
        this.snackBar.open('No se pudo obtener los tratamientos por paciente y etapa , intentalo mas tarde', null, {
          duration: 3000
      });
      return EMPTY;
     })
    )
    .subscribe(result => {
      this.loadTratamientos();
    });

  }

  activeTratamiento(tratamiento: Tratamiento){
    this.tratamientoService.changeEtapa(tratamiento.idTratamiento,ETAPA_ACTIVA_TRATAMIENTO)
    .pipe(
      catchError(error =>{
        this.snackBar.open('No se pudo obtener los tratamientos por paciente y etapa , intentalo mas tarde', null, {
          duration: 3000
      });
      return EMPTY;
     })
    )
    .subscribe(result => {
      this.loadTratamientos();
    });
  }

  refreshDataSource(){
    this.dsTratamientosActivos = new MatTableDataSource(this.tratamientosActivos);
    this.dsTratamientosFinalizados = new MatTableDataSource(this.tratamientosFinalizados);
  }

  loadTratamientos(){
    this.getListTratamientosActivos(this.idPaciente);    
    this.getListTratamientosFinalizados(this.idPaciente);
  }

  callEditTratamiento(idTratamiento: number){
    console.log('se llamo a editar tratamiento', idTratamiento);
    this.router.navigate(['/pages/paciente/ver/',this.idPaciente,'tratamiento',{plan:idTratamiento}]);
  }

 }
