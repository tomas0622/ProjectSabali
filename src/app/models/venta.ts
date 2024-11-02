import { Insumo } from "./insumo";

export interface Venta {
    id: number;
    cliente: {
        id: number;
        nombre: string;
        primerApellido: string;
        segundoApellido: string;
        direccion: string;
        telefono: number;
    };
    usuario: {
        id: number;
        username: string;
        contraseña: string;
        rol: string;
    };
    insumo: Insumo[];
    fecha: Date;
    totalVenta: number;
    IsCredito: boolean;
}