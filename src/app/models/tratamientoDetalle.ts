import { Tratamiento } from './tratamiento';
import { Procedimiento } from './procedimiento';

export class TratamientoDetalle{
    idTratamientoDetalle : number;
    tratamiento : Tratamiento;
    procedimiento : Procedimiento;
    precio: number;
    cantidad : number;
    piezas : string;
    total : number;
    observacion : string;
    
}