import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVentaComponent } from './listar-venta/listar-venta.component';
import { CVentaComponent } from './c-venta/c-venta.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarVentaComponent
  },
  {
    path: 'crear',
    component: CVentaComponent
  }
];

@NgModule({
  declarations: [
    ListarVentaComponent,
    CVentaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class VentaModule { }
