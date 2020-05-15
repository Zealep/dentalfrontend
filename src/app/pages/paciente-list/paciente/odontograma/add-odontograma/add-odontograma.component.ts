import { OdontogramaService } from './../../../../../services/odontograma.service';
import { Odontograma } from './../../../../../models/odontograma';
import { Paciente } from './../../../../../models/paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-add-odontograma',
  templateUrl: './add-odontograma.component.html',
  styleUrls: ['./add-odontograma.component.css']
})
export class AddOdontogramaComponent implements OnInit {

  imgSelected: any;
  idPaciente: number;
  fechaRegistro: Date;
  files:any;


  constructor(private route: ActivatedRoute,
    private odontogramaService: OdontogramaService,
    private router: Router) { }

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');

  }

  detectFiles(event) {
    this.files= event.target.files;
    if (this.files[0]) {        
        let reader = new FileReader();
        reader.onload = (e: any) => {   
          this.imgSelected = reader.result;
         
        }
        reader.readAsDataURL(this.files[0]);
      
    
    }
  }



  save(){
    let odontograma = new Odontograma();
    let paciente = new Paciente();
    paciente.idPaciente = this.idPaciente;
    odontograma.paciente = paciente;
    odontograma.fechaRegistro = this.fechaRegistro;


    let formData: FormData = new FormData();
    formData.append('file-image',this.files[0],this.files[0].name);
    formData.append('odontograma',JSON.stringify(odontograma));

    this.odontogramaService.save(formData)
    .subscribe(result =>{
      this.router.navigate(['/pages/paciente/ver/',this.idPaciente,'odontograma']);

    })

  }

  cancelar(){
    this.router.navigate(['/pages/paciente/ver/',this.idPaciente,'odontograma'])
  }




}
