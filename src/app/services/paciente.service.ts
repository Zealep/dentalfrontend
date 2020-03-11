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
export class PacienteService {
 
  url: string = `${HOST}/paciente`;
  pacienteCambio = new Subject<Paciente[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Paciente[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Paciente>(`${this.url}/find/${id}`);
  }


  registrar(paciente: Paciente) {
    return this.http.post<Respuesta>(`${this.url}/save`, paciente)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(paciente: Paciente) {
    return this.http.put<Respuesta>(`${this.url}/update`, paciente)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idPaciente: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idPaciente}`)
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
