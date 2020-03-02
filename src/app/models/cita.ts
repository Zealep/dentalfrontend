import { Paciente } from 'src/app/_model/paciente';
export class Cita{
    
    idCita: number;
    paciente: Paciente;
    fechaCita: Date;
    horaCita: string;
    horario: string;
    asunto: string;

}