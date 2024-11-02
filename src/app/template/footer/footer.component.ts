import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router) {}

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
  public GoToProveedor() {
    this.router.navigate(['/proveedor']);
  }
}
