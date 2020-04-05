import { MatTableDataSource } from '@angular/material/table';
import { TratamiengoPagarDTO } from './../../../../models/dto/tratamiento-pagar';
import { ActivatedRoute, Router } from '@angular/router';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  idPaciente: number;
  tratamientosPagar: TratamiengoPagarDTO[];
  displayedColumns: string[] = ['accion','presupuesto', 'totalTratamiento', 'totalPagado', 'totalSaldo'];
  dsTratamientosPagar: MatTableDataSource<TratamiengoPagarDTO>;


  constructor(private tratamientoService: TratamientoService,
    private route: ActivatedRoute,
    private router: Router
    ) { 

    }

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get("id");
    this.getTratamiengosPagarByPaciente(this.idPaciente);
  }

  getTratamiengosPagarByPaciente(id: number){
    this.tratamientoService.getTratamientoPagarByPaciente(id)
    .subscribe(items =>{
      this.dsTratamientosPagar = new MatTableDataSource(items);
    });

  }

  linkPagoComprobante(id:number){
    this.router.navigate(['/pages/paciente/ver/',this.idPaciente,'pago-comprobante',{idTratamiento:id}]);
  }

}
