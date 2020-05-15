import { mergeMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { DEFAULT_FOTO } from 'src/app/shared/var.constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresa } from './../../models/empresa';
import { EmpresaService } from './../../services/empresa.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'zp-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  empresas: Empresa[];
  empresa: Empresa;
  imageUrl: any = DEFAULT_FOTO;
  
  form: FormGroup =  new FormGroup({
    nombre: new FormControl(''),
    ruc: new FormControl(''),
    telefono: new FormControl(''),
    celular: new FormControl(''),
    direccion: new FormControl(''),
    correo: new FormControl('') 
  })


  constructor(private empresaService: EmpresaService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.empresaService.getlistar()
 
    .subscribe(results=>{
      this.empresas = results;
      if(this.empresas.length > 0){
        this.empresa = this.empresas[0];
        this.getLogo(this.empresa.idEmpresa);

        this.form = new FormGroup({
          'idEmpresa': new FormControl(this.empresa.idEmpresa),
          'nombre': new FormControl(this.empresa.nombre),
          'ruc': new FormControl(this.empresa.ruc),
          'telefono': new FormControl(this.empresa.telefono),
          'celular': new FormControl(this.empresa.celular),
          'direccion': new FormControl(this.empresa.direccion),
          'correo': new FormControl(this.empresa.correo)
        });

      }
     

    })
  }

  save(){
    let emp = new Empresa();
    if(this.empresa!=null)
    {
      emp.idEmpresa = this.empresa.idEmpresa;
    }
 
    emp.nombre = this.form.value['nombre'];
    emp.ruc = this.form.value['ruc'];
    emp.telefono = this.form.value['telefono'];
    emp.celular = this.form.value['celular'];
    emp.direccion = this.form.value['direccion'];
    emp.correo = this.form.value['correo'];

    this.empresaService.registrar(emp)
    .subscribe(result=>{
      this.init();
      this.snackBar.open('Se guardo los datos de la empresa','Cerrar',
      {
        duration: 4000
      })
    })

  }

  
  getLogo(id:number){
      this.empresaService.obtenerLogo(id)
      .subscribe(image =>{
          if(image.size>0){
            this.createImageFromBlob(image);
          }else{
            this.imageUrl = DEFAULT_FOTO;
          }
        
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
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
        formData.append('idEmpresa',this.empresa.idEmpresa.toString());
        this.empresaService.uploadLogo(formData)
        .subscribe(result => {      
          this.init();
          this.snackBar.open('Se subio el logo de la empresa','Cerrar',
          {
            duration: 4000
          })    
        });

    }
}

}
