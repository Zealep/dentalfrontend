import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Procedimiento } from '../models/procedimiento';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';

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
    return this.http.get<Procedimiento[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Procedimiento>(`${this.url}/find/${id}`);
  }


  registrar(procedimiento: Procedimiento): Observable<Procedimiento> {
    return this.http.post<Procedimiento>(`${this.url}/save`, procedimiento)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(procedimiento: Procedimiento) {
    return this.http.put<Respuesta>(`${this.url}/update`, procedimiento)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idProcedimiento: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idProcedimiento}`)
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
