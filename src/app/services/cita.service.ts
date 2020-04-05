import { CitaDTO } from './../models/dto/cita';
import { Cita } from './../models/cita';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Procedimiento } from '../models/procedimiento';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
 
  url: string = `${HOST}/cita`;
  citaCambio = new Subject<Cita[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Cita[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getListarByPaciente(id:number) {        
    return this.http.get<Cita[]>(`${this.url}/list/${id}`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getListarByDate(fecha:string) {        
    return this.http.get<CitaDTO[]>(`${this.url}/listByDate/${fecha}`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Cita>(`${this.url}/find/${id}`);
  }


  registrar(cita: Cita) {
    return this.http.post<Respuesta>(`${this.url}/save`, cita)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(cita: Cita) {
    return this.http.put<Respuesta>(`${this.url}/update`, cita)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idCita: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idCita}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  modificarEtapa(idCita: number,etapa:string){
    return this.http.get<Respuesta>(`${this.url}/changeEtapa/${idCita}/${etapa}`)
    .pipe(
      catchError(this.handleError)
    );
  }

   private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Cannot perform the request, please try again later');

  }
}
