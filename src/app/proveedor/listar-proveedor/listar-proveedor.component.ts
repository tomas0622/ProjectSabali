import { Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrl: './listar-proveedor.component.css'
})
export class ListarProveedorComponent {
  @ViewChild('modalProveedor') modal: ElementRef | undefined;


  VectorProveedores: Proveedor[] = [];
  ProveedorSeleccionado: Proveedor | undefined = undefined;
  isNew: boolean = false;

  constructor(private _proveedorService: ProveedorService) {
    this.LoadProveedores();
  }

  LoadProveedores() {
    this._proveedorService.getProveedores()
      .subscribe((rs) => {
        this.VectorProveedores = rs;
      });
  }

  EditarProveedor(proveedor: Proveedor) {
    this.isNew = false;
    this.ProveedorSeleccionado = proveedor;
  }

  NuevoProveedor() {
    this.isNew = true;
    this.ProveedorSeleccionado = {
      id: 0,
      nombre: '',
      direccion: '',
      telefono: 0
    };
  }
  GuardarProveedor() {
    if (this.isNew) {
      this._proveedorService.postProveedor(this.ProveedorSeleccionado!) //Equivalente a llamar una API
        .subscribe(() => {
          this.LoadProveedores(); // Refresca la lista sin recargar la página
          this.ProveedorSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Proveedor agregado correctamente',
            icon: 'success'
          })
        })
    } else {
      //Llamada a la API
      this._proveedorService.putProveedor(this.ProveedorSeleccionado!.id, this.ProveedorSeleccionado!)
        .subscribe(() => {
          this.LoadProveedores(); // Recarga la lista después de la actualización
          this.ProveedorSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Proveedor editado correctamente',
            icon: 'success'
          })
        })

    }
  }

  EliminarProveedor(pro: Proveedor) {
    Swal.fire({
      icon: 'question',
      title: `¿Estas seguro de eliminar el Proveedor '${pro.nombre}'?`,
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
          this._proveedorService.deleteProveedor(pro.id)
            .subscribe(() => {
              this.LoadProveedores();
              Swal.fire({
                title: 'Proveedor eliminado correctamente',
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

buscarProveedor(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
}
}
