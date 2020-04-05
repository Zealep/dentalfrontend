import { Alerta } from './alerta';
export class Paciente{
    idPaciente: number;
    nroHistoria: string;
    apellidos: string;
    nombres: string;
    dni: string;
    fechaNacimiento: Date;
    telefono: string;
    celular: string;
    direccion: string;
    fechaInicio: Date;
    lugarProcedencia: string;
    email: string;
    foto: string;
    estado: string;
    alertas: Alerta[];

}