import { Cliente } from "./cliente";
import { Insumo } from "./insumo";
import { Usuario } from "./usuario";
import { VMInsumoDetalle } from "./VMInsumoDetalle";

export interface VMVentaDetalle {
    id: number;
    cliente: {id:number, nombre:string};
    usuario: {id:number, username:string};
    insumo: VMInsumoDetalle[];
    cantidad: number;
    fecha: Date;
    totalVenta: number;
    isCredito: boolean;
}