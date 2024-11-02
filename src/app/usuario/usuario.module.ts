import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { CuUsuarioComponent } from './cu-usuario/cu-usuario.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FilterPipe } from '../shared/filter.pipe';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarUsuarioComponent
  }
];

@NgModule({
  declarations: [
    ListarUsuarioComponent,
    CuUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class UsuarioModule { }
