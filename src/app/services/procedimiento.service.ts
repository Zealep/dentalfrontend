import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Procedimiento } from '../models/procedimiento';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService {
  url: string = `${HOST}/procedimiento`;
  procedimientoCambio = new Subject<Procedimiento[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Procedimiento[]>(`${this.url}/list`);    
  }


  getProcedimientoPorId(id: number) {
    return this.http.get<Procedimiento>(`${this.url}/find/${id}`);
  }


  registrar(procedimiento: Procedimiento) {
    return this.http.post<Respuesta>(`${this.url}/save`, procedimiento);
  }

  modificar(procedimiento: Procedimiento) {
    return this.http.put<Respuesta>(`${this.url}/update`, procedimiento);
  }

  eliminar(idProcedimiento: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idProcedimiento}`);
  }
}
