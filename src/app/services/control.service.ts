import { Control } from './../models/control';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
 
  url: string = `${HOST}/control`;
  controlCambio = new Subject<Control[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Control[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getListByPaciente(idPaciente : number) {        
    return this.http.get<Control[]>(`${this.url}/findByPaciente/${idPaciente}`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Control>(`${this.url}/find/${id}`);
  }


  registrar(control: Control) {
    return this.http.post<Respuesta>(`${this.url}/save`, control)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(control: Control) {
    return this.http.put<Respuesta>(`${this.url}/update`, control)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idControl: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idControl}`)
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
