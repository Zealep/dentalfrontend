import { Doctor } from './doctor';
import { Paciente } from 'src/app/_model/paciente';
import { TratamientoDetalle } from './tratamientoDetalle';
export class Tratamiento {
    idTratamiento : number;
    paciente : Paciente;
    doctor : Doctor;
    tratamientoDetalles : TratamientoDetalle[];
    mesesTratamiento : number;
    pagoMensual : number;
    montoTotal : number;
    diaPagar : number;
    comentarios : string;
    fechaInstaBrackts : Date;
    fechaInstaContentSup : Date;
    fechaInstaAparat : Date;
    fechaRegistro : Date;
    fechaInicioPago : Date;
    fechaInstaContentInf : Date;
    descuento : number;
    montoTotalDescuento : number;
    estado : string;
}