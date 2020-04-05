import { Doctor } from './doctor';
import { TratamientoDetalle } from './tratamientoDetalle';
import { Paciente } from './paciente';
export class Tratamiento {
    idTratamiento : number;
    paciente : Paciente;
    doctor : Doctor;
    tratamientoDetalles : TratamientoDetalle[];
    fechaRegistro: Date;
    nombre: string;
    etapa: string;
    monto: number;
    descuento: number;
    montoTotal: number;
    comentarios: string;
    estado : string;
}