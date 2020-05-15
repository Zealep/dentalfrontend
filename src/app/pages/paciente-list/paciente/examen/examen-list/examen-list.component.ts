import { IncreaseImageComponent } from './../increase-image/increase-image.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ArchivoService } from './../../../../../services/archivo.service';
import { Imagen } from './../../../../../models/imagen';
import { ImagenService } from './../../../../../services/imagen.service';
import { Component, OnInit } from '@angular/core';
import { DEFAULT_FOTO } from 'src/app/shared/var.constant';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'zp-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {

  imagenes: Imagen[] = [];
  urls: any[];
  idPaciente : number;


  constructor(private imagenService: ImagenService, 
    private archivoService: ArchivoService, 
    private route:ActivatedRoute, 
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.idPaciente = +this.route.parent.snapshot.paramMap.get('id');
    this.getListImages();
  }
  
  getListImages(){
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

  delete(i:Imagen){
    this.imagenService.eliminar(i.idImagen)
    .subscribe(result =>{
      this.getListImages();
      this.snackBar.open('Examen eliminado','Cerrar',{
        duration: 3000
       
      })
    })
  }

  open(image:any){

    const dialogRef = this.dialog.open(IncreaseImageComponent, {
      data: {
        src:image
      },
      width: '920px'    
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


}
