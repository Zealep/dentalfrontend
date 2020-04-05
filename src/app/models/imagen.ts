import { Archivo } from './archivo';
import { Doctor } from './doctor';
import { Paciente } from './paciente';

export class Imagen{
    idImagen: number;
    paciente: Paciente;
    doctor: Doctor;
    archivos: Archivo[];
    titulo: string;
    fechaImagen: Date;
    comentarios: string;
    photoBloUrl: any;
}