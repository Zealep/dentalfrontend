import { Imagen } from '../models/imagen';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
 
  url: string = `${HOST}/imagen`;
  imagenCambio = new Subject<Imagen[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Imagen[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getListByPaciente(id:number) {        
    return this.http.get<Imagen[]>(`${this.url}/listByPaciente/${id}`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Imagen>(`${this.url}/find/${id}`);
  }


  save(formData: FormData) {
    return this.http.post<Respuesta>(`${this.url}/save`,formData)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(imagen: Imagen) {
    return this.http.put<Respuesta>(`${this.url}/update`, imagen)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idImagen: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idImagen}`)
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
