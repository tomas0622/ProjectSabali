import { Component, Input, input } from '@angular/core';
import { Insumo } from '../../models/insumo';
import { VMInsumoDetalle } from '../../models/VMInsumoDetalle';
import { InsumoService } from '../../services/insumo.service';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-cu-insumo',
  templateUrl: './cu-insumo.component.html',
  styleUrl: './cu-insumo.component.css'
})
export class CuInsumoComponent {
  @Input() insumo: VMInsumoDetalle|undefined;

  VectorInsumos: VMInsumoDetalle[] = [];
  VectorProveedores: Proveedor[] = [];

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

  // formatDateTimeLocal(fecha:Date){
  //   let fechaFormateada = format(fecha,"yyyy-MM-dd'T'HH:mm",{timeZone:"America/Bogota"});
  //   return fechaFormateada;
  // }

  // updateDate(valor:string){
  //   this.venta!.fecha = new Date(valor);
  // }
}


