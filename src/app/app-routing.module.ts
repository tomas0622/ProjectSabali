import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: 'insumo',
    loadChildren: () => import('./insumo/insumo.module').then(m => m.InsumoModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'venta',
    loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule)
  },
  {
    path: 'proveedor',
    loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule)
  },
  // Ruta inicial de login
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },  // Página de inicio  
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
