import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from './../../../models/paciente';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'zp-dialog-birthday',
  templateUrl: './dialog-birthday.component.html',
  styleUrls: ['./dialog-birthday.component.css']
})
export class DialogBirthdayComponent implements OnInit {

  birthdays: Paciente[] = [];
  displayedColumns: string[] = ['APELLIDOS','NOMBRES','CELULAR','TELEFONO','EMAIL']
  dataSource: MatTableDataSource<Paciente>;
  
  constructor(public dialogRef: MatDialogRef<DialogBirthdayComponent>,
    @Inject(MAT_DIALOG_DATA ) public data) { }

  ngOnInit(): void {
    this.birthdays = this.data;
    this.dataSource = new MatTableDataSource(this.birthdays);
  }

}
