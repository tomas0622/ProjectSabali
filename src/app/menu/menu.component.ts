import { Component } from '@angular/core';
import { Insumo } from '../models/insumo';
import { Cliente } from '../models/cliente';
import { Usuario } from '../models/usuario';
import { Venta } from '../models/venta';
import { UsuarioService } from '../services/usuario.service';
import { InsumoService } from '../services/insumo.service';
import { ClienteService } from '../services/cliente.service';
import { VentaService } from '../services/venta.service';
import { VMVentaDetalle } from '../models/VMVentaDetalle';
import { VMInsumoDetalle } from '../models/VMInsumoDetalle';
import { Movimiento } from '../models/Movimiento';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  VectorUsuarios: Usuario[] = [  ]
  VectorClientes: Cliente[] = []
  VectorInsumos: VMInsumoDetalle[] = []
  VectorVentas: VMVentaDetalle[] = [];
  VectorMovimientos: Movimiento[] = [];

  constructor(private _usuarioService:UsuarioService, private _insumoService:InsumoService, private _clienteService:ClienteService, private _ventaService:VentaService){
    this.LoadInsumos();
    this.LoadClientes();
    this.LoadUsuarios();
    this.LoadVentas();
    this.LoadMovimientos();
  }

  LoadInsumos() {
    this._insumoService.getInsumos()
      .subscribe((rs) => {
        this.VectorInsumos = rs;
      });
  }

  LoadUsuarios() {
    this._usuarioService.getUsuarios()
      .subscribe((rs) => {
        this.VectorUsuarios = rs;
      });
  }

  LoadVentas() {
    this._ventaService.getVentas()
      .subscribe((rs) => {
        this.VectorVentas = rs;
      });
  }

  LoadClientes() {
    this._clienteService.getClientes()
      .subscribe((rs) => {
        this.VectorClientes = rs;
      });
  }

  LoadMovimientos() {
    this._clienteService.getMovimientos()
      .subscribe((rs) => {
        this.VectorMovimientos = rs;
      });
  }

  calcularTiempo(base: number): string {
    const horas = base + 3; // Incrementar el valor base en 1
    if (horas >= 24) {
      const dias = Math.floor(horas / 24);  // Calcular el número de días
      const horasRestantes = horas % 24;    // Calcular las horas que sobran
      if (horasRestantes > 0) {
        return `${dias} día(s) y ${horasRestantes} hora(s)`;  // Devolver días y horas
      } else {
        return `${dias} día(s)`;  // Devolver solo días si no hay horas restantes
      }
    } else {
      return `${horas} hora(s)`;  // Devolver solo horas si es menos de 24
    }
  }
}
