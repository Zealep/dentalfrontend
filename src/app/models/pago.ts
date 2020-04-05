import { Tratamiento } from './tratamiento';

export class Pago{
    idPago: number;
    tratamiento: Tratamiento;
    fechaPago: Date;
    monto: number;
    tipoPago: string;
    nroComprobante: string;
    comentarios: string;
    estado: string;
}