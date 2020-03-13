import { MatSnackBar } from '@angular/material/snack-bar';
import { PacienteService } from 'src/app/services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  
  constructor(private route: ActivatedRoute,private service: PacienteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

 }
}
