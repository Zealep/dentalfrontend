import { LoginService } from './../../../services/login.service';
import { Empresa } from './../../../models/empresa';
import { EmpresaService } from './../../../services/empresa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  empresa: string = 'SYSCLIDENT';

  constructor(private empresaService: EmpresaService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(){
    this.empresaService.getlistar()
    .subscribe(results=>{
      if(results.length > 0){
        this.empresa = results[0].nombre;
      }
    })
  }
  
  cerrarSesion(){
    this.loginService.cerrarSesion();
  }

}
