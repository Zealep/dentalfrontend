import { Tratamiento } from './tratamiento';

export class Pago{
    idPago: number;
    tratamiento: Tratamiento;
    fechaPago: Date;
    nroCuota: number;
    monto: number;
    comentarios: string;
    pagoOrtodontico: number;
    pagoAdicional: number;
}