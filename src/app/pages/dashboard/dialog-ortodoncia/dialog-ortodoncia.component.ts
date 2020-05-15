import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Inject } from '@angular/core';
import { Ortodoncia } from 'src/app/models/ortodoncia';

@Component({
  selector: 'zp-dialog-ortodoncia',
  templateUrl: './dialog-ortodoncia.component.html',
  styleUrls: ['./dialog-ortodoncia.component.css']
})
export class DialogOrtodonciaComponent implements OnInit {

  ortodoncias: Ortodoncia[] = [];
  displayedColumns: string[] = ['TRATAMIENTO','PACIENTE','DOCTOR','MESES','PAGO']
  dataSource: MatTableDataSource<Ortodoncia>;

  constructor(public dialogRef: MatDialogRef<DialogOrtodonciaComponent>,
    @Inject(MAT_DIALOG_DATA ) public data) { }

  ngOnInit(): void {
    this.ortodoncias = this.data;
    this.dataSource = new MatTableDataSource(this.ortodoncias);
  }

}
