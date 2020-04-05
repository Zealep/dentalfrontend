import { TratamientoService } from './../../../../../services/tratamiento.service';
import { RESPONSE_OK_API } from './../../../../../shared/var.constant';
import { PagoService } from './../../../../../services/pago.service';
import { Tratamiento } from 'src/app/models/tratamiento';
import { Pago } from './../../../../../models/pago';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'zp-pago-comprobante',
  templateUrl: './pago-comprobante.component.html',
  styleUrls: ['./pago-comprobante.component.css']
})
export class PagoComprobanteComponent implements OnInit {
  idTratamiento : number;

  editRegistroPago :boolean = true;
  firstFormGroup: FormGroup;

  clienteComprobante:string;
  nroDocumentoComprobante:string;
  fechaComprobante:Date;
  descripcionComprobante:string;
  doctorComprobante:string;
  tipoPagoComprobante:string;
  fechaPagoComprobante:Date;
  montoPagadoComprobante:number;
  numeroComprobante:string;

  
  constructor(private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private pagoService: PagoService,
    private tratamientoService: TratamientoService) { }

  ngOnInit(): void {
    this.idTratamiento = +this.route.snapshot.paramMap.get('idTratamiento');

    this.firstFormGroup = this._formBuilder.group({
      fechaPago: ['', Validators.required],
      montoPagar: ['', Validators.required],
      tipoPago: ['', Validators.required],
      numeroComprobante: ['', Validators.required],
      comentarios: [''],

    });

  }

  grabarPago(stepper: MatStepper){
      let pago = new Pago();
      let t = new Tratamiento();
      t.idTratamiento = this.idTratamiento;
      pago.tratamiento = t;
      pago.fechaPago = this.firstFormGroup.get('fechaPago').value;
      pago.monto = this.firstFormGroup.get('montoPagar').value;
      pago.tipoPago = this.firstFormGroup.get('tipoPago').value;
      pago.nroComprobante = this.firstFormGroup.get('numeroComprobante').value;
      pago.comentarios = this.firstFormGroup.get('comentarios').value;

      this.pagoService.registrar(pago)
      .subscribe( result =>{
        if(result.status===RESPONSE_OK_API){
          stepper.next();
          this.editRegistroPago = false;
          this.generarComprobante();
        }
      });      
  }

  generarComprobante(){
    this.tratamientoService.getById(this.idTratamiento)
    .subscribe(result =>{
      if(result!=null){
        this.clienteComprobante = result.paciente.apellidos + " " + result.paciente.nombres
        this.nroDocumentoComprobante = result.paciente.dni;
        this.fechaComprobante = new Date();
        this.descripcionComprobante = "#"+result.idTratamiento + " " +result.nombre;
        this.doctorComprobante = "Dr(a). " +result.doctor.apellidos + " " +result.doctor.nombres;
        this.tipoPagoComprobante = this.firstFormGroup.get('tipoPago').value;
        this.fechaPagoComprobante = this.firstFormGroup.get('fechaPago').value;
        this.montoPagadoComprobante = this.firstFormGroup.get('montoPagar').value;
        this.numeroComprobante = this.firstFormGroup.get('numeroComprobante').value;
      }
     
    });
 
  }

}
