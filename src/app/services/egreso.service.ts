import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Procedimiento } from '../models/procedimiento';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';
import { Egreso } from '../models/egreso';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {
 
  url: string = `${HOST}/egreso`;
  egresoCambio = new Subject<Egreso[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Egreso[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Egreso>(`${this.url}/find/${id}`);
  }


  registrar(egreso: Egreso) {
    return this.http.post<Respuesta>(`${this.url}/save`, egreso)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(egreso: Egreso) {
    return this.http.put<Respuesta>(`${this.url}/update`, egreso)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idEgreso: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idEgreso}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEgresosPorDia() {        
    return this.http.get<number>(`${this.url}/egresosByDia`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getEgresosPorMes() {        
    return this.http.get<number>(`${this.url}/egresosByMes`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getMontosPorRangoFechas(inicio:string,fin:string) {      
    let parms = new HttpParams();
    parms = parms.append('fechaInicio',inicio);   
    parms = parms.append('fechaFin',fin);     
    return this.http.get<Egreso[]>(`${this.url}/rangeDates`,
    {
      params:parms
    })
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
