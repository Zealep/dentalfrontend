import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Procedimiento } from '../models/procedimiento';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';
import { Alerta } from '../models/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
 
  url: string = `${HOST}/alerta`;
  alertaCambio = new Subject<Alerta[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Alerta[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Alerta>(`${this.url}/find/${id}`);
  }


  registrar(alerta: Alerta) {
    return this.http.post<Respuesta>(`${this.url}/save`, alerta)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(alerta: Alerta) {
    return this.http.put<Respuesta>(`${this.url}/update`, alerta)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idAlerta: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idAlerta}`)
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
