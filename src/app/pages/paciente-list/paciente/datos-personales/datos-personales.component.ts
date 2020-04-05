import { DEFAULT_FOTO } from './../../../../shared/var.constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'zp-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  photoBlobUrl: any
  idPaciente: number;

  form: FormGroup =  new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    dni: new FormControl(''),
    nroHistoria: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    telefono: new FormControl(''),
    celular: new FormControl(''),
    direccion: new FormControl(''),
    lugarProcedencia: new FormControl(''),
    email: new FormControl(''),   

  })

  constructor(private pacienteService: PacienteService, private route:ActivatedRoute, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.initForm();
    this.getPhoto();
    
  }


  initForm(){
    this.pacienteService.getById(this.idPaciente)
    .pipe(
      catchError(error => {
        this.snackBar.open(error, null, {
          duration: 3000
        });
        return EMPTY;
      })
    )
    .subscribe(paciente =>{
      this.form = new FormGroup({
        'idPaciente': new FormControl(paciente.idPaciente),
        'apellidos': new FormControl(paciente.apellidos),
        'nombres': new FormControl(paciente.nombres),
        'dni': new FormControl(paciente.dni),
        'nroHistoria': new FormControl(paciente.nroHistoria),
        'fechaNacimiento': new FormControl(paciente.fechaNacimiento),
        'telefono': new FormControl(paciente.telefono),
        'celular': new FormControl(paciente.celular),
        'direccion': new FormControl(paciente.direccion),
        'lugarProcedencia': new FormControl(paciente.lugarProcedencia),
        'email': new FormControl(paciente.email)
      });
    })

  }

  save(){
    let paciente: Paciente =  new Paciente();
    paciente.idPaciente = this.idPaciente;
    paciente.apellidos = this.form.value['apellidos'];
    paciente.nombres = this.form.value['nombres'];
    paciente.dni = this.form.value['dni'];
    paciente.nroHistoria = this.form.value['nroHistoria'];
    paciente.fechaNacimiento = this.form.value['fechaNacimiento'];
    paciente.telefono = this.form.value['telefono'];
    paciente.celular = this.form.value['celular'];
    paciente.direccion = this.form.value['direccion'];
    paciente.lugarProcedencia = this.form.value['lugarProcedencia'];
    paciente.email = this.form.value['email'];

    this.pacienteService.registrar(paciente)
      .pipe(
        catchError(error => {
          this.snackBar.open(error, null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.initForm();
        this.snackBar.open('El paciente fue actualizado', 'Close', {
          duration: 5000
        });
      });

  }


  getPhoto(){
    this.pacienteService.obtenerFoto(this.idPaciente)
    .subscribe(image =>{
        if(image.size>0){
          this.createImageFromBlob(image);
        }else{
          this.photoBlobUrl = DEFAULT_FOTO;
        }
      
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.photoBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
    }, false);
  if (image) {
       reader.readAsDataURL(image);
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('idPaciente',this.idPaciente.toString());
        this.pacienteService.uploadFoto(formData)
        .subscribe(result => {      
          this.getPhoto();    
        });

    }
}

}
