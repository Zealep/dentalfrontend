import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from './../../../models/paciente';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'zp-dialog-paciente',
  templateUrl: './dialog-paciente.component.html',
  styleUrls: ['./dialog-paciente.component.css']
})
export class DialogPacienteComponent implements OnInit {

  pacientes: Paciente[] = [];
  displayedColumns: string[] = ['APELLIDOS','NOMBRES','DNI','CELULAR','EMAIL']
  dataSource: MatTableDataSource<Paciente>;
  
  constructor(public dialogRef: MatDialogRef<DialogPacienteComponent>,
    @Inject(MAT_DIALOG_DATA ) public data) { }

  ngOnInit(): void {
    this.pacientes = this.data;
    this.dataSource = new MatTableDataSource(this.pacientes);
  }
}
