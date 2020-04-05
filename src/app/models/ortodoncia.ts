import { Tratamiento } from './tratamiento';
export class Ortodoncia{
    idOrtodoncia: number;
    tratamiento: Tratamiento;
    mesesTratamiento: number;
    pagoMensual: number;
    diaPagar: number;
    fechaInstaBrackets: Date;
    fechaInstaContentSup: Date;
    fechaInstaContentInf: Date;
    fechaInstaAparato: Date;
    fechaInicioPago: Date;
    estado: string;
}