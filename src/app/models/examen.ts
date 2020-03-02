import { Paciente } from 'src/app/_model/paciente';
export class Examen{
    idExamen: number;
    paciente: Paciente;
    titulo: string;
    fechaExamen: Date;
    tipoExamen: string;
    comentarios: string;
    imagen: string;
    
}