import { Ortodoncia } from './../models/ortodoncia';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Paciente } from '../models/paciente';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class OrtodonciaService {
 
  url: string = `${HOST}/ortodoncia`;
  ortodonciaCambio = new Subject<Ortodoncia[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlist() {        
    return this.http.get<Ortodoncia[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Ortodoncia>(`${this.url}/find/${id}`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getByTratamiento(id: number){
    return this.http.get<Ortodoncia>(`${this.url}/findByTratamiento/${id}`)
    .pipe(
      catchError(this.handleError)
    );  
  }


  save(ortodoncia: Ortodoncia) {
    return this.http.post<Respuesta>(`${this.url}/save`, ortodoncia)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  update(ortodoncia: Ortodoncia) {
    return this.http.put<Respuesta>(`${this.url}/update`, ortodoncia)
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(idOrtodoncia: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idOrtodoncia}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getNews() {        
    return this.http.get<Ortodoncia[]>(`${this.url}/news`)
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
    return throwError('No se ejecuto la peticion, intentalo mas tarde');

  }
}
