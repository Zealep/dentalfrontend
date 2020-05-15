import { Tratamiento } from 'src/app/models/tratamiento';
import { TratamiengoPagarDTO } from './../models/dto/tratamiento-pagar';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Paciente } from '../models/paciente';
import { HOST } from '../shared/var.constant';
import { Respuesta } from '../models/respuesta';
import { catchError } from 'rxjs/operators';
import { Doctor } from '../models/doctor';
import { PlanTratamiento } from '../models/plan-tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
 
  url: string = `${HOST}/tratamiento`;
  tratamientoCambio = new Subject<Tratamiento[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  getlistar() {        
    return this.http.get<Tratamiento[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getTratamientoPagarByPaciente(id:number){
    return this.http.get<TratamiengoPagarDTO[]>(`${this.url}/findTratamientoPagar/${id}`)
    .pipe(
      catchError(this.handleError)
    ); 
  }

  getById(id: number) {
    return this.http.get<Tratamiento>(`${this.url}/find/${id}`);
  }


  registrar(tratamiento: Tratamiento) {
    return this.http.post<Respuesta>(`${this.url}/save`, tratamiento)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  modificar(tratamiento: Tratamiento) {
    return this.http.put<Respuesta>(`${this.url}/update`, tratamiento)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(idTratamiento: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${idTratamiento}`)
    .pipe(
      catchError(this.handleError)
    );
  }


  savePlanTratamiento(planTratamiento: PlanTratamiento) {
    return this.http.post<Respuesta>(`${this.url}/savePlanTratamiento`, planTratamiento)
    .pipe(
      catchError(this.handleError)
    );
  }

  findByPaciente(idPaciente : number){
    return this.http.get<Tratamiento[]>(`${this.url}/findByPaciente/${idPaciente}`)
    .pipe(catchError(this.handleError)
    );
  }

  findByPacienteAndEtapa(idPaciente : number,etapa: string){
    let params = new HttpParams()
    .set('id',idPaciente.toString())
    .set('etapa',etapa);
    return this.http.get<Tratamiento[]>(`${this.url}/findByPacienteAndEtapa`,{params})
    .pipe(catchError(this.handleError)
    );
  }

  changeEtapa(idTratamiento:number,etapa: string){
    let params = new HttpParams()
    .set('id',idTratamiento.toString())
    .set('etapa',etapa);
    return this.http.get<Respuesta>(`${this.url}/changeEtapa`,{params})
    .pipe(catchError(this.handleError)
    );
  }

  generarContrato(t: Tratamiento){
    return this.http.post(`${this.url}/generarContrato`, t,{
      responseType: 'blob'
    });
  }

  getNews() {        
    return this.http.get<Tratamiento[]>(`${this.url}/news`)
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
