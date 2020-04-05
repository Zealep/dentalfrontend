import { Archivo } from './../models/archivo';
import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Paciente } from '../models/paciente';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError, map } from 'rxjs/operators';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  url: string = `${HOST}/archivo`;
  archivoCambio = new Subject<Archivo[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {
    return this.http.get<Archivo[]>(`${this.url}/list`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number) {
    return this.http.get<Archivo>(`${this.url}/find/${id}`);
  }


  registrar(archivo: Archivo) {
    return this.http.post<Respuesta>(`${this.url}/save`, archivo)
      .pipe(
        catchError(this.handleError)
      );
  }


  modificar(archivo: Archivo) {
    return this.http.put<Respuesta>(`${this.url}/update`, archivo)
      .pipe(
        catchError(this.handleError)
      );
  }

  eliminar(idArchivo: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idArchivo}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerImagen(idImagen: number): Observable<Blob> {

    return this.http.get(`${this.url}/obtenerImagen/${idImagen}`,
      { responseType: 'blob' });
  }

  uploadFoto(formData: FormData) {

    return this.http.post<Respuesta>(`${this.url}/subirImagen`, formData)
      .pipe(
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
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
