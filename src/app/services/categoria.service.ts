import { Respuesta } from './../models/respuesta';
import { catchError } from 'rxjs/operators';
import { Categoria } from './../models/categoria';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HOST } from './../shared/var.constant';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url: string = `${HOST}/categoria`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Categoria[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get<Categoria>(`${this.url}/find/${id}`);
  }


  save( x: Categoria) {
    return this.http.post<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }


  update(x: Categoria) {
    return this.http.put<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(id: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${id}`)
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
