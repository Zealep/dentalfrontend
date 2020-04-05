import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogModel } from './../../../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ControlFormComponent } from './control-form/control-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ControlService } from './../../../../services/control.service';
import { MatTableDataSource } from '@angular/material/table';
import { Control } from './../../../../models/control';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  idPaciente: number;
  controles: Control[];
  dsControles: MatTableDataSource<Control>;
  displayedColumns:string[] = ['tratamiento','fecha','comentario','acciones']


  constructor(private controlService:ControlService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.getControlsByPaciente(this.idPaciente);
  }

  getControlsByPaciente(id:number){
    this.controlService.getListByPaciente(this.idPaciente)
    .subscribe(results =>{
      console.log('result',results)
      this.controles = results;
      this.dsControles = new MatTableDataSource(this.controles);
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(ControlFormComponent, {
      data: { idPaciente:this.idPaciente},
      width: '550px',
      disableClose: true 
    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getControlsByPaciente(this.idPaciente);
    });
  }

  deleteEgreso(control: Control) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar control',
        message: 'Deseas borrar el control?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(control);
        }
      });
  }

  private sendDeleteRequest(control: Control) {
    this.controlService.eliminar(control.idControl)
    .subscribe(response => {
      this.getControlsByPaciente(this.idPaciente);
      this.snackBar.open('Control eliminado', 'Close', {
        duration: 3000
      });
    });
  }

  edit(control:Control){
      const dialogRef = this.dialog.open(ControlFormComponent, {
        data: { idPaciente:this.idPaciente,
              idControl:control.idControl},
        width: '550px',
        disableClose: true 
      
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.getControlsByPaciente(this.idPaciente);
      });
    }

}
