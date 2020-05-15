import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Tratamiento } from 'src/app/models/tratamiento';

@Component({
  selector: 'zp-dialog-tratamiento',
  templateUrl: './dialog-tratamiento.component.html',
  styleUrls: ['./dialog-tratamiento.component.css']
})
export class DialogTratamientoComponent implements OnInit {

  tratamientos: Tratamiento[] = [];
  displayedColumns: string[] = ['TRATAMIENTO','PACIENTE','DOCTOR','FECHAREGISTRO']
  dataSource: MatTableDataSource<Tratamiento>;

  constructor(public dialogRef: MatDialogRef<DialogTratamientoComponent>,
    @Inject(MAT_DIALOG_DATA ) public data) { }

  ngOnInit(): void {
    this.tratamientos = this.data;
    this.dataSource = new MatTableDataSource(this.tratamientos);
  }

}
