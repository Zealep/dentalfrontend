import { ActivatedRoute } from '@angular/router';
import { Paciente } from './../../../../models/paciente';
import { Archivo } from './../../../../models/archivo';
import { Imagen } from './../../../../models/imagen';
import { Image } from './../../../../models/dto/image';
import { catchError } from 'rxjs/operators';
import { Doctor } from './../../../../models/doctor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from './../../../../services/doctor.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'zp-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {



  idPaciente: number;

  doctors: Doctor[] = [];
  urls = new Array<Image>();
  files : any;

  constructor(private imagenService: ImagenService, private doctorService: DoctorService,private snackBar: MatSnackBar, private route: ActivatedRoute) {
 
   }

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.listDoctors();
  }

  private listDoctors() {
    this.doctorService.getlistar()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los doctores, intentalo mas tarde', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(doctor => {
        this.doctors = doctor;
      });
  }

  detectFiles(event) {
    this.urls = [];
     this.files = event.target.files;
    if (this.files) {
      for (let file of this.files) {        
        let reader = new FileReader();
        reader.onload = (e: any) => {   
          let image = new Image();
          image.url = e.target.result;
          image.name = file.name;
          this.urls.push(image);
        }
        reader.readAsDataURL(file);
      
      }
    }
  }

  save(form:any, name:string, index:number){
    
    let f = this.findImagen(this.files,name);
    let imagen = new Imagen();
    let paciente = new Paciente();
    let doctor = new Doctor();
    let archivo = new Archivo();

    doctor.idDoctor = form.value['doctor'];
    paciente.idPaciente = this.idPaciente;
    imagen.doctor = doctor;
    imagen.paciente = paciente;
    imagen.fechaImagen = form.value['fechaRegistro'];
    imagen.titulo = form.value['titulo'];
    imagen.comentarios = form.value['descripcion'];

    let formData: FormData = new FormData();
    formData.append('file',f,f.name);
    formData.append('imagen',JSON.stringify(imagen));

    this.imagenService.save(formData).subscribe(result=>{
      this.delete(index);
    });
    

  }

  delete(index:number){
    console.log('delete index',index);
      this.urls.splice(index,1);
  }

  private findImagen(files:any, name:string){
    for(let i=0;i<files.length;i++){
      if(this.files[i].name==name){
        return this.files[i];
      }
    }
  }

}
