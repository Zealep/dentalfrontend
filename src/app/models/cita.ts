import { Doctor } from './doctor';
import { Paciente } from './paciente';

export class Cita{
    
    idCita: number;
    paciente: Paciente;
    doctor: Doctor;
    fechaHora: Date;
    asunto: string;
    etapa: string;
    estado: string;

}