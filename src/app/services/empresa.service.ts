import { Empresa } from './../models/empresa';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 
  url: string = `${HOST}/empresa`;
  empresaCambio = new Subject<Empresa[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Empresa[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Empresa>(`${this.url}/find/${id}`);
  }


  registrar(empresa: Empresa) {
    return this.http.post<Respuesta>(`${this.url}/save`, empresa)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(empresa: Empresa) {
    return this.http.put<Respuesta>(`${this.url}/update`, empresa)
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

  uploadLogo(form: FormData){
    return this.http.post<Respuesta>(`${this.url}/subirLogo`, form)
    .pipe(
      catchError(this.handleError)
    );
  }

  obtenerLogo(id: number){
    return this.http.get(`${this.url}/obtenerLogo/${id}`, 
       {responseType: 'blob'});
  
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
