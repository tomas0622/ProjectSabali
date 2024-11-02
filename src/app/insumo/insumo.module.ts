import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para usar ngModel
import { RouterModule, Routes } from '@angular/router';

import { ListarInsumoComponent } from './listar-insumo/listar-insumo.component';
import { CuInsumoComponent } from './cu-insumo/cu-insumo.component';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarInsumoComponent
  }
];

@NgModule({
  declarations: [
    ListarInsumoComponent,
    CuInsumoComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Necesario para usar [(ngModel)]
    RouterModule.forChild(ROUTES), // Importa las rutas específicas del módulo de insumos
    SharedModule
  ],
  exports: [
    RouterModule // Exporta RouterModule para que las rutas estén disponibles
  ]
})
export class InsumoModule { }
