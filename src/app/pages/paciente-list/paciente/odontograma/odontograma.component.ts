import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { OdontogramaService } from './../../../../services/odontograma.service';
import { Odontograma } from './../../../../models/odontograma';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SecurityContext } from '@angular/core';

@Component({
  selector: 'zp-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {

  idPaciente: number;
  odontogramas: Odontograma[];
  image : any;

  constructor(private route:ActivatedRoute,
    private odontogramaService: OdontogramaService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.idPaciente =+this.route.parent.snapshot.paramMap.get('id');
    this.getOdontogramas();
  }

  getOdontogramas(){
    this.odontogramaService.getListByPaciente(this.idPaciente)
    .subscribe(results=>{
      this.odontogramas = results;
      for(let o of this.odontogramas){
            o.url = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/octet-stream;base64,'+o.image);      
        //this.createImageFromBlob(blob, o.idOdontograma);     
     }
    })
  }

  descargar(id:number){
    this.odontogramaService.getById(id)
    .subscribe(result=>{
      let img = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,this.sanitizer.bypassSecurityTrustResourceUrl('data:application/octet-stream;base64,'+result.image));      
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = img;
      a.download =  `odontograma-${result.fechaRegistro}.jpg`;
      a.click();
      return img;
    })
  
  }

  delete(id:number){
    this.odontogramaService.eliminar(id)
    .subscribe(result=>{
      this.getOdontogramas();
      this.snackBar.open('Odontograma eliminado','Cerrar',{
        duration: 3000
      })
    })
  }

}
