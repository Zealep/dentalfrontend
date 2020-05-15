import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'zp-increase-image',
  templateUrl: './increase-image.component.html',
  styleUrls: ['./increase-image.component.css']
})
export class IncreaseImageComponent implements OnInit {

  imageSelected: any;

  constructor(public dialogRef: MatDialogRef<IncreaseImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data ) { }

  ngOnInit(): void {
    this.imageSelected = this.data.src;
  }

}
