import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Procedimiento } from '../models/procedimiento';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';
import { Ingreso } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
 
  url: string = `${HOST}/ingreso`;
  ingresoCambio = new Subject<Ingreso[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Ingreso[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Ingreso>(`${this.url}/find/${id}`);
  }


  registrar(ingreso: Ingreso) {
    return this.http.post<Respuesta>(`${this.url}/save`, ingreso)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(ingreso: Ingreso) {
    return this.http.put<Respuesta>(`${this.url}/update`, ingreso)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idIngreso: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idIngreso}`)
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
