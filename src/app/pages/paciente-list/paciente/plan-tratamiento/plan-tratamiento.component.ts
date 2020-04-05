import { ProcedimientoDialogComponent } from './procedimiento-dialog/procedimiento-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ETAPA_ACTIVA_TRATAMIENTO } from './../../../../shared/var.constant';
import { Ortodoncia } from './../../../../models/ortodoncia';
import { OrtodonciaService } from './../../../../services/ortodoncia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TratamientoDetalle } from './../../../../models/tratamientoDetalle';
import { ProcedimientoService } from './../../../../services/procedimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from './../../../../models/doctor';
import { DoctorService } from './../../../../services/doctor.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { catchError, startWith, map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Procedimiento } from 'src/app/models/procedimiento';
import { MatTableDataSource } from '@angular/material/table';
import { Tratamiento } from 'src/app/models/tratamiento';
import { Paciente } from 'src/app/models/paciente';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { PlanTratamiento } from 'src/app/models/plan-tratamiento';

@Component({
  selector: 'zp-plan-tratamiento',
  templateUrl: './plan-tratamiento.component.html',
  styleUrls: ['./plan-tratamiento.component.css']
})
export class PlanTratamientoComponent implements OnInit {

  idPaciente: number;
  idTratamiento: number;
  idOrtodoncia: number;

  doctors: Doctor[] = [];
  procedimientos: Procedimiento[] = [];
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'piezas', 'total','acciones'];
  dataProcedures: MatTableDataSource<TratamientoDetalle>;
  tratamientoDetalles: TratamientoDetalle[] = [];

  form: FormGroup = new FormGroup({
    nombreForm: new FormControl(''),
    doctorForm: new FormControl(''),
    fechaRegistroForm: new FormControl(''),
    comentariosForm: new FormControl(''),
    mesesForm: new FormControl(''),
    pagoMensualForm: new FormControl(''),
    diaPagarForm: new FormControl(''),
    fechaInstaBracketsForm: new FormControl(''),
    fechaInstaContentSupForm: new FormControl(''),
    fechaInstaContentInfForm: new FormControl(''),
    fechaInstaAparatoForm: new FormControl(''),
    fechaInicioPagoForm: new FormControl('')
  })

  planOrtodoncia:boolean;

  constructor(private doctorService: DoctorService, 
    private procedimientoService: ProcedimientoService,
    private tratamientoService: TratamientoService,
    private ortodonciaService: OrtodonciaService, 
    private snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private router: Router,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.idTratamiento = +this.route.snapshot.paramMap.get('plan');
    this.cargarTratamiento(this.idTratamiento);
    this.cargarOrtodoncia(this.idTratamiento);
    this.listDoctors();
    this.dataProcedures = new MatTableDataSource(this.tratamientoDetalles);
 }
  private listDoctors() {
    this.doctorService.getlistar()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los doctores, intentalo mas tarde', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(doctor => {
        this.doctors = doctor;
      });
  }

  getTotalCost() {
    return this.dataProcedures.data.reduce((summ, v) => summ += v.total, 0) ;

  }

  removeProcedure(index:number, t:TratamientoDetalle){
    this.tratamientoDetalles.splice(index, 1);
    this.refreshDataSource();
  }

  refreshDataSource(){
    this.dataProcedures = new MatTableDataSource(this.tratamientoDetalles);

  }

  saveTreatmentPlan(){
    
    let planTratamiento = new PlanTratamiento();
    let tratamiento = new Tratamiento();
    let paciente = new Paciente();
    let doctor = new Doctor();
    
    paciente.idPaciente = this.idPaciente;
    doctor.idDoctor = this.form.get('doctorForm').value;
    tratamiento.nombre = this.form.get('nombreForm').value;
    tratamiento.etapa = ETAPA_ACTIVA_TRATAMIENTO;
    tratamiento.paciente = paciente;
    tratamiento.doctor = doctor;
    tratamiento.fechaRegistro = this.form.get('fechaRegistroForm').value;
    tratamiento.comentarios = this.form.get('comentariosForm').value;
    tratamiento.tratamientoDetalles = this.tratamientoDetalles;

    if(this.dataProcedures!=null){
      tratamiento.monto = this.getTotalCost();
      tratamiento.montoTotal = this.getTotalCost();
    }

    if(this.idTratamiento!=0){
      tratamiento.idTratamiento = this.idTratamiento;
    }

    planTratamiento.tratamiento = tratamiento;

    if(this.planOrtodoncia){

      let ortodoncia = new Ortodoncia();
      ortodoncia.tratamiento = tratamiento;
      ortodoncia.mesesTratamiento = this.form.get('mesesForm').value;
      ortodoncia.pagoMensual = this.form.get('pagoMensualForm').value;
      ortodoncia.diaPagar = this.form.get('diaPagarForm').value;
      ortodoncia.fechaInstaBrackets = this.form.get('fechaInstaBracketsForm').value;
      ortodoncia.fechaInstaContentSup = this.form.get('fechaInstaContentSupForm').value;
      ortodoncia.fechaInstaContentInf = this.form.get('fechaInstaContentInfForm').value;
      ortodoncia.fechaInstaAparato = this.form.get('fechaInstaAparatoForm').value;
      ortodoncia.fechaInicioPago = this.form.get('fechaInicioPagoForm').value;

      if(this.idOrtodoncia!=0){
        ortodoncia.idOrtodoncia = this.idOrtodoncia;
      }

      planTratamiento.ortodoncia = ortodoncia;

    }

      this.tratamientoService.savePlanTratamiento(planTratamiento)
      .pipe(
        catchError(error => {
          this.snackBar.open(error, null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.clearForm();
        if(this.idTratamiento==0){
          this.snackBar.open('El plan de tratamiento fue registrado', 'Close', {
            duration: 5000
          });
        }
        else{
          this.snackBar.open('El plan de tratamiento fue actualizado', 'Close', {
            duration: 5000
          });
        }
        
      });

    }

  clearForm(){
   
      this.planOrtodoncia = false;
      this.tratamientoDetalles = null;
      this.form.reset();
  }

  cancelar(){
    this.router.navigate(['/pages/paciente/ver/',this.idPaciente,'tratamiento-list'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProcedimientoDialogComponent, {
      width: '550px'
    
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result!=null){

        if(!this.validResponseDialog(result)){
          this.tratamientoDetalles.push(result);
          this.refreshDataSource();
        }
        else{
          this.snackBar.open('Completa los datos obligatorios del procedimiento', 'Close', {
            duration: 5000
          });
        }  
      }
     
    });
  }

  validResponseDialog(det: TratamientoDetalle): boolean{
    return (det.procedimiento.idProcedimiento==null || det.precio==null || det.cantidad == null 
      )
  }

  private cargarTratamiento(idTratamiento:number){
      if(idTratamiento!=0){
        this.tratamientoService.getById(idTratamiento).subscribe(t =>{
          console.log('tratamiento find',t);
          this.tratamientoDetalles = t.tratamientoDetalles;
          this.refreshDataSource();
          this.form.controls['nombreForm'].setValue(t.nombre);
          this.form.controls['doctorForm'].setValue(t.doctor.idDoctor);
          this.form.controls['fechaRegistroForm'].setValue(t.fechaRegistro);
          this.form.controls['comentariosForm'].setValue(t.comentarios);   
        });
      }
  }

  private cargarOrtodoncia(idTratamiento: number){
    if(idTratamiento!=0){
      this.ortodonciaService.getByTratamiento(idTratamiento).subscribe(t =>{
        console.log('ortodoncia',t);
          if(t!=null){
            this.planOrtodoncia = true;
            this.idOrtodoncia = t.idOrtodoncia;
            this.form.controls['mesesForm'].setValue(t.mesesTratamiento);
            this.form.controls['pagoMensualForm'].setValue(t.pagoMensual);
            this.form.controls['diaPagarForm'].setValue(t.diaPagar);
            this.form.controls['fechaInstaBracketsForm'].setValue(t.fechaInstaBrackets);
            this.form.controls['fechaInstaContentSupForm'].setValue(t.fechaInstaContentSup);
            this.form.controls['fechaInstaContentInfForm'].setValue(t.fechaInstaContentInf);
            this.form.controls['fechaInstaAparatoForm'].setValue(t.fechaInstaAparato);
            this.form.controls['fechaInicioPagoForm'].setValue(t.fechaInicioPago);
          }
                   
        
        });
    }
  }


}
