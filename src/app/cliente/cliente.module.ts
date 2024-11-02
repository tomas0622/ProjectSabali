import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { CuClienteComponent } from './cu-cliente/cu-cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarClienteComponent
  }
];

@NgModule({
  declarations: [
    ListarClienteComponent,
    CuClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Necesario para usar [(ngModel)]
    RouterModule.forChild(ROUTES), // Importa las rutas específicas del módulo de insumos
    SharedModule
  ]
})
export class ClienteModule { }
