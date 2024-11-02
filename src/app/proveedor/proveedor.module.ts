import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarProveedorComponent } from './listar-proveedor/listar-proveedor.component';
import { CuProveedorComponent } from './cu-proveedor/cu-proveedor.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FilterPipe } from '../shared/filter.pipe';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarProveedorComponent
  }
];

@NgModule({
  declarations: [
    ListarProveedorComponent,
    CuProveedorComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Necesario para usar [(ngModel)]
    RouterModule.forChild(ROUTES), // Importa las rutas específicas del módulo de insumos
    SharedModule
  ]
})
export class ProveedorModule { }
