import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Procedimiento } from '../models/procedimiento';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
 
  url: string = `${HOST}/doctor`;
  doctorCambio = new Subject<Doctor[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Doctor[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Doctor>(`${this.url}/find/${id}`);
  }


  registrar(doctor: Doctor) {
    return this.http.post<Respuesta>(`${this.url}/save`, doctor)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(doctor: Doctor) {
    return this.http.put<Respuesta>(`${this.url}/update`, doctor)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idDoctor: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idDoctor}`)
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
