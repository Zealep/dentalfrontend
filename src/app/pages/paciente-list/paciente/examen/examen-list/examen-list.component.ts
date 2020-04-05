import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArchivoService } from './../../../../../services/archivo.service';
import { Imagen } from './../../../../../models/imagen';
import { ImagenService } from './../../../../../services/imagen.service';
import { Component, OnInit } from '@angular/core';
import { DEFAULT_FOTO } from 'src/app/shared/var.constant';

@Component({
  selector: 'zp-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {

  imagenes: Imagen[] = [];
  urls: any[];
  idPaciente : number;

  constructor(private imagenService: ImagenService, private archivoService: ArchivoService, private route:ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    
    this.imagenService.getListByPaciente(this.idPaciente)
    .subscribe(imagenes=>{
      this.imagenes = imagenes;
      for(let element of this.imagenes){
        this.getImage(element.idImagen);        
      }
    });


  }

  getImage(id: number){
    this.archivoService.obtenerImagen(id)
    .subscribe(image =>{
      this.createImageFromBlob(image, id);
     
    });
  }

  createImageFromBlob(image: Blob, id:number):any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        let created = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        for(let e of this.imagenes){
            if(e.idImagen == id){
              e.photoBloUrl = created;
            }
        }
        
      }, false);
  if (image) {
       reader.readAsDataURL(image);
    }
  }


}
