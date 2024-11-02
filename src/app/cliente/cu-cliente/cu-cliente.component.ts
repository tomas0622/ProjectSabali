import { Component, Input } from '@angular/core';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cu-cliente',
  templateUrl: './cu-cliente.component.html',
  styleUrl: './cu-cliente.component.css'
})
export class CuClienteComponent {
  @Input() cliente: Cliente|undefined;
}
