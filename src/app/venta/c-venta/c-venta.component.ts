import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Cliente } from '../../models/cliente';
import { Insumo } from '../../models/insumo';
import { Venta } from '../../models/venta';
import Swal from 'sweetalert2';
import { VMVentaDetalle } from '../../models/VMVentaDetalle';
import { UsuarioService } from '../../services/usuario.service';
import { ClienteService } from '../../services/cliente.service';
import { InsumoService } from '../../services/insumo.service';
import { VMInsumoDetalle } from '../../models/VMInsumoDetalle';
import { VentaService } from '../../services/venta.service';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-c-venta',
  templateUrl: './c-venta.component.html',
  styleUrl: './c-venta.component.css'
})
export class CVentaComponent {

  constructor(private _ventaService: VentaService, private _usuarioService: UsuarioService, private _clienteService: ClienteService, private _insumoService: InsumoService) {
    this.LoadUsuarios();
    this.LoadClientes();
    this.LoadInsumos();
  }

  LoadUsuarios() {
    this._usuarioService.getUsuarios()
      .subscribe((rs) => {
        this.VectorUsuarios = rs;
      });
  }

  LoadClientes() {
    this._clienteService.getClientes()
      .subscribe((rs) => {
        this.VectorClientes = rs;
      });
  }

  LoadInsumos() {
    this._insumoService.getInsumos()
      .subscribe((rs) => {
        this.VectorInsumos = rs;
      });
  }

  vectorCantidades: number[] = []
  valorVenta: number = 0;
  ventaACredito: boolean = false;
  cantidadSeleccion: number | undefined;
  cantidadTotal: number = 0;
  VectorUsuarios: Usuario[] = []
  VectorClientes: Cliente[] = []
  VectorInsumos: VMInsumoDetalle[] = []
  insumoSeleccionado: VMInsumoDetalle | undefined;
  VentaSeleccionado: VMVentaDetalle = {
    id: 0,
    cliente: {
      id: 0,
      nombre: ''
    },
    usuario: {
      id: 0,
      username: ''
    },
    insumo: [],
    cantidad: 0,
    fecha: new Date(),
    totalVenta: 0,
    isCredito: false
  };

  AdicionarInsumo() {
    if (this.insumoSeleccionado && this.cantidadSeleccion) {
      this.cantidadTotal = this.cantidadTotal + this.cantidadSeleccion;
      this.VentaSeleccionado.cantidad = this.cantidadTotal;
      this.vectorCantidades.push(this.cantidadSeleccion)
      this.VentaSeleccionado.insumo.push(this.insumoSeleccionado!)
      console.log("Insumo", this.insumoSeleccionado, "Cantidad", this.cantidadSeleccion, "Venta", this.VentaSeleccionado)
      this.CalcularValorTotal();
      this.insumoSeleccionado = undefined;
      this.cantidadSeleccion = undefined;
    }
  }

  CalcularValorTotal() {
    if (this.VentaSeleccionado.insumo) {
      let valorTotal = 0;

      for (let index = 0; index < this.VentaSeleccionado.insumo.length; index++) {
        let valorTemp = this.VentaSeleccionado.insumo[index].precioUnitario * this.vectorCantidades[index];
        valorTotal = valorTotal + valorTemp;
      }
      this.valorVenta = valorTotal;
    }
  };

  GuardarVenta() {
    // Asegura que el cliente y usuario estén seleccionados
    if (this.VentaSeleccionado.cliente.id !== 0 && this.VentaSeleccionado.usuario.id !== 0 && this.VentaSeleccionado.insumo[0].id !== 0) {

      // Agregar el total de cantidad de insumos en la venta
      this.VentaSeleccionado.cantidad = this.cantidadTotal;

      // Agregar el total calculado de la venta
      this.VentaSeleccionado.totalVenta = this.valorVenta;

      //Agregar el booleano del credito
      this.VentaSeleccionado.isCredito = this.ventaACredito;

      // Aquí puedes enviar `VentaSeleccionado` a una API o guardarla donde necesites
      console.log("Venta guardada:", this.VentaSeleccionado);

      this._ventaService.postVenta(this.VentaSeleccionado)
        .subscribe(() => {

          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Venta agregada correctamente',
            icon: 'success'
          });

          // Reinicia `VentaSeleccionado` después de guardar la venta
          this.VentaSeleccionado = {
            id: 0,
            cliente: {
              id: 0,
              nombre: ''
            },
            usuario: {
              id: 0,
              username: ''
            },
            insumo: [],
            cantidad: 0,
            fecha: new Date(),
            totalVenta: 0,
            isCredito: false
          };

          this.insumoSeleccionado = undefined;
          this.cantidadSeleccion = undefined;
          this.valorVenta = 0;
          this.ventaACredito = false;
          this.cantidadTotal = 0;
          this.vectorCantidades = [];
        });
    } else {
      Swal.fire({
        title: 'Faltan datos',
        text: 'Por favor, complete todos los campos',
        icon: 'error'
      });
    }
  }

  getResumenInsumos() {
    return this.VentaSeleccionado.insumo.map((insumo, index) => ({
      nombre: insumo.nombre,
      cantidad: this.vectorCantidades[index]
    }));
  }

  formatDateTimeLocal(fecha: Date) {
    let fechaFormateada = format(fecha, "yyyy-MM-dd'T'HH:mm", { timeZone: "America/Bogota" });
    return fechaFormateada;
  }

  updateDate(valor: string) {
    this.VentaSeleccionado.fecha = new Date(valor);
  }

}
