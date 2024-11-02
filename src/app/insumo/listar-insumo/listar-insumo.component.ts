import { Component, ElementRef, ViewChild } from '@angular/core';
import { Insumo } from '../../models/insumo';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { InsumoService } from '../../services/insumo.service';
import { VMInsumoDetalle } from '../../models/VMInsumoDetalle';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-listar-insumo',
  templateUrl: './listar-insumo.component.html',
  styleUrl: './listar-insumo.component.css'
})
export class ListarInsumoComponent {
  @ViewChild('modalInsumo') modal: ElementRef | undefined;


  VectorInsumos: VMInsumoDetalle[] = [];
  VectorProveedores: Proveedor[] = [];
  insumoSeleccionado: VMInsumoDetalle | undefined = undefined;
  isNew: boolean = false;

  constructor(private _insumoService: InsumoService, private _proveedorService: ProveedorService) {
    this.LoadInsumos();
    this.LoadProveedores();
  }

  LoadInsumos() {
    this._insumoService.getInsumos()
      .subscribe((rs) => {
        this.VectorInsumos = rs;
      });
  }

  LoadProveedores() {
    this._proveedorService.getProveedores()
      .subscribe((rs) => {
        this.VectorProveedores = rs;
      });
  }

  EditarInsumo(insumo: VMInsumoDetalle) {
    this.isNew = false;
    this.insumoSeleccionado = insumo;
  }

  NuevoInsumo() {
    this.isNew = true;
    this.insumoSeleccionado = {
      id: 0,
      nombre: '',
      descripcion: '',
      idProveedor:0,
      precioUnitario: 0,
      stock: 0,
    }
  }

  GuardarInsumo() {
    if (this.isNew) {
      this._insumoService.postInsumo(this.insumoSeleccionado!) //Equivalente a llamar una API
        .subscribe(() => {
          this.LoadInsumos(); // Refresca la lista sin recargar la página
          this.insumoSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Insumo agregado correctamente',
            icon: 'success'
          })
        })
    } else {
      //Llamada a la API
      this._insumoService.putInsumo(this.insumoSeleccionado!.id, this.insumoSeleccionado!)
        .subscribe(() => {
          this.LoadInsumos(); // Recarga la lista después de la actualización
          this.insumoSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Insumo editado correctamente',
            icon: 'success'
          })
        })
    }
  }

  EliminarInsumo(ins: VMInsumoDetalle) {
    Swal.fire({
      icon: 'question',
      title: `¿Estas seguro de eliminar el Insumo '${ins.nombre}'?`,
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
          this._insumoService.deleteinsumo(ins.id)
            .subscribe(() => {
              this.LoadInsumos();
              Swal.fire({
                title: 'Insumo eliminado correctamente',
                icon: 'success'
              })
            });
        }
      })
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

  buscarInsumo(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
  }
}
