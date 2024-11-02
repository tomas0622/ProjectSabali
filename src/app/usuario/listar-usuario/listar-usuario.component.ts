import { Component, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent {
  @ViewChild('modalUsuario') modal: ElementRef | undefined;


  VectorUsuarios: Usuario[] = [];
  UsuarioSeleccionado: Usuario | undefined = undefined;
  isNew: boolean = false;

  constructor(private _usuarioService: UsuarioService) {
    this.LoadUsuarios();
  }

  LoadUsuarios() {
    this._usuarioService.getUsuarios()
      .subscribe((rs) => {
        this.VectorUsuarios = rs;
      });
  }

  EditarUsuario(usuario: Usuario) {
    this.isNew = false;
    this.UsuarioSeleccionado = usuario;
  }

  NuevoUsuario() {
    this.isNew = true;
    this.UsuarioSeleccionado = {
      id: 0,
      username: '',
      contraseña: '',
      rol: '',
    };
  }
  GuardarUsuario() {
    if (this.isNew) {
      this._usuarioService.postUsuario(this.UsuarioSeleccionado!) //Equivalente a llamar una API
        .subscribe(() => {
          this.LoadUsuarios(); // Refresca la lista sin recargar la página
          this.UsuarioSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Usuario agregado correctamente',
            icon: 'success'
          })
        })
    } else {
      //Llamada a la API
      this._usuarioService.putUsuario(this.UsuarioSeleccionado!.id, this.UsuarioSeleccionado!)
        .subscribe(() => {
          this.LoadUsuarios(); // Recarga la lista después de la actualización
          this.UsuarioSeleccionado = undefined;
          this.CerrarModal(this.modal);
          Swal.fire({
            title: 'Usuario editado correctamente',
            icon: 'success'
          })
        })

    }
  }

  EliminarUsuario(us: Usuario) {
    Swal.fire({
      icon: 'question',
      title: `¿Estas seguro de eliminar el Usuario '${us.username}'?`,
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
          this._usuarioService.deleteUsuario(us.id)
            .subscribe(() => {
              this.LoadUsuarios();
              Swal.fire({
                title: 'Usuario eliminado correctamente',
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

buscarUsuario(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
}

  
}
