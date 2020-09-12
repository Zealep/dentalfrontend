import { TOKEN_NAME } from './../shared/var.constant';
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
export class PacienteService {
 
  url: string = `${HOST}/paciente`;
  pacienteCambio = new Subject<Paciente[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;        
    return this.http.get<Paciente[]>(`${this.url}/list`,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

    })
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;        

    return this.http.get<Paciente>(`${this.url}/find/${id}`,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

    });
  }


  registrar(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;        

    return this.http.post<Respuesta>(`${this.url}/save`, paciente,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

    })
    .pipe(
      catchError(this.handleError)
    );
  }

  registrarAlertas(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;        

    return this.http.post<Respuesta>(`${this.url}/saveAlertas`, paciente,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

    })
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;        

    return this.http.put<Respuesta>(`${this.url}/update`, paciente,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

    })
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idPaciente: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;        

    return this.http.delete<Respuesta>(`${this.url}/delete/${idPaciente}`,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

    })
    .pipe(
      catchError(this.handleError)
    );
  }

  obtenerFoto(idPaciente: number):Observable<Blob>{
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;            
    return this.http.get(`${this.url}/obtenerFoto/${idPaciente}`, 
       {responseType: 'blob',
       headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
      });
  }

  uploadFoto(formData: FormData){

    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token; 
        return this.http.post<Respuesta>(`${this.url}/subirFoto`, formData ,
        {
          headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
        })
              .pipe(
                catchError(this.handleError)
              );
    
  }

  descargarExcel(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token; 
    return this.http.get(`${this.url}/export`,
    {responseType:'blob',
    headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

  });
  }

  cumpleaños(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token; 
    return this.http.get<Paciente[]>(`${this.url}/onomastico`,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)

    })
    .pipe(
      catchError(this.handleError)
    );  
  }

  getNuevos(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token; 
    return this.http.get<Paciente[]>(`${this.url}/nuevos`,
    {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')

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
    return throwError('No se ejecuto la peticion, intentalo mas tarde');

  }
}
