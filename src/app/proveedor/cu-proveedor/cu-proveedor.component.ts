import { Component, Input } from '@angular/core';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-cu-proveedor',
  templateUrl: './cu-proveedor.component.html',
  styleUrl: './cu-proveedor.component.css'
})
export class CuProveedorComponent {
  @Input() proveedor: Proveedor|undefined;
}
