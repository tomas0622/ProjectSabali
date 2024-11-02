import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from '../../models/cliente';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  @ViewChild('modalCliente') modal: ElementRef | undefined;


  VectorClientes: Cliente[] = [];
  ClienteSeleccionado: Cliente | undefined = undefined;
  isNew: boolean = false;

  constructor(private _clienteService: ClienteService) {
    this.LoadClientes();
  }

  LoadClientes() {
    this._clienteService.getClientes()
      .subscribe((rs) => {
        this.VectorClientes = rs;
      });
  }

  EditarCliente(cliente: Cliente) {
    this.isNew = false;
    this.ClienteSeleccionado = cliente;
  }

  NuevoCliente() {
    this.isNew = true;
    this.ClienteSeleccionado = {
      id: 0,
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      direccion: '',
      telefono: ''
    };
  }
  GuardarCliente() {
    if (this.isNew) {
      this._clienteService.postCliente(this.ClienteSeleccionado!) //Equivalente a llamar una API
        .subscribe(() => {
          this.LoadClientes(); // Refresca la lista sin recargar la página
          this.ClienteSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Cliente agregado correctamente',
            icon: 'success'
          })
        })
    } else {
      //Llamada a la API
      this._clienteService.putCliente(this.ClienteSeleccionado!.id, this.ClienteSeleccionado!)
        .subscribe(() => {
          this.LoadClientes(); // Recarga la lista después de la actualización
          this.ClienteSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Cliente editado correctamente',
            icon: 'success'
          })
        })

    }
  }

  EliminarCliente(cli: Cliente) {
    Swal.fire({
      icon: 'question',
      title: `¿Estas seguro de eliminar el Cliente '${cli.nombre}'?`,
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
          this._clienteService.deleteCliente(cli.id)
            .subscribe(() => {
              this.LoadClientes();
              Swal.fire({
                title: 'Cliente eliminado correctamente',
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

  buscarCliente(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
  }
}