import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isVentasActive: boolean = false;
  constructor(private router: Router) {
    // Suscribirse a los cambios de ruta para verificar si la ruta es parte de "Ventas"
    this.router.events.subscribe(() => {
      this.isVentasActive = this.router.url.startsWith('/venta');
    })
  };

  public GoToMenu() {
    this.router.navigate(['/menu']);
  }

  public GoToInsumos() {
    this.router.navigate(['/insumo']);
  }

  public GoToUsuarios() {
    this.router.navigate(['/usuario']);
  }

  public GoToClientes() {
    this.router.navigate(['/cliente']);
  }

  public GoToListarVenta() {
    this.router.navigate(['/venta']);
  }

  public GoToCrearVenta() {
    this.router.navigate(['/venta/crear']);
  }

  public GoToProveedor() {
    this.router.navigate(['/proveedor']);
  }
}


