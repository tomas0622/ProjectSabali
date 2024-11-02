import { Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { Venta } from '../../models/venta';
import { Usuario } from '../../models/usuario';
import { Cliente } from '../../models/cliente';
import { VMVentaDetalle } from '../../models/VMVentaDetalle';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrl: './listar-venta.component.css'
})
export class ListarVentaComponent {
  @ViewChild('modalVenta') modal: ElementRef | undefined;


  VectorVentas: VMVentaDetalle[] = [];

  VentaSeleccionado: VMVentaDetalle | undefined = undefined;
  isNew: boolean = false;

  constructor(private _ventaService: VentaService) {
    this.LoadVentas();
  }

  LoadVentas() {
    this._ventaService.getVentas()
      .subscribe((rs) => {
        this.VectorVentas = rs;
        console.log('Ventas cargadas:', this.VectorVentas);
      });
  }

  // EditarVenta(venta: VMVentaDetalle) {
  //   this.isNew = false;
  //   this.VentaSeleccionado = venta;
  // }

  // NuevoVenta() {
  //   this.isNew = true;
  //   this.VentaSeleccionado = {
  //     id: 0,
  //     cliente: {
  //       id: 0,
  //       nombre: '',
  //       primerApellido: '',
  //       segundoApellido: '',
  //       direccion: '',
  //       telefono: '',
  //     },
  //     usuario: {
  //       id:0,
  //       username:'',
  //       contraseña:'',
  //       rol: '',
  //     },
  //     insumo: [],
  //     cantidad: 0,
  //     fecha: new Date(),
  //     totalVenta: 0,
  //     isCredito: false
  //   };
  // }
  // GuardarVenta() {
  //   if (this.isNew) {
  //     this.VectorVentas.push(this.VentaSeleccionado!); //Equivalente a llamar una API
  //     this.VentaSeleccionado = undefined;
  //     this.CerrarModal(this.modal)
  //     Swal.fire({
  //       title: 'Venta agregada correctamente',
  //       icon: 'success'
  //     })
  //   } else {
  //     //Llamada a la API
  //     this.VentaSeleccionado = undefined;
  //     this.CerrarModal(this.modal);
  //     Swal.fire({
  //       title: 'Venta editado correctamente',
  //       icon: 'success'
  //     })
  //   }
  // }

  EliminarVenta(ve: Venta) {
    Swal.fire({
      icon: 'question',
      title: `¿Estas seguro de eliminar la Venta numero '${ve.id}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No, abandonar',
      confirmButtonText: 'Si, eliminar',
      allowOutsideClick: false,
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        cancelButton: 'btn btn-secondary me-1',
        confirmButton: 'btn btn-danger'
      }
    })
      .then(rs => {
        if (rs.isConfirmed) {
          this._ventaService.deleteVenta(ve.id)
            .subscribe(() => {
              this.LoadVentas();
              Swal.fire({
                title: 'Venta eliminada correctamente',
                icon: 'success'
              })
            });
        }
      });
  }

  CerrarModal(modal: ElementRef | undefined) {
    if (modal) {
      let bsModal = Modal.getInstance(modal?.nativeElement);
      console.log("Modal element:", modal?.nativeElement);
      bsModal?.hide();
      let backdrop = document.querySelector(".modal-backdrop.fade.show");
      console.log("Modal element:", backdrop);
      if (backdrop) {
        backdrop.parentNode?.removeChild(backdrop);
        console.log(backdrop.parentNode)
      }
    }
  }

  ngAfterViewInit() {
    if (this.modal) {
      this.modal.nativeElement.addEventListener('hide.bs.modal', () => {
        this.CerrarModal(this.modal);
      });
    }
  }

  searchTerm: string = '';

  buscarVenta(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
  }
}
