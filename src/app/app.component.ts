import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SabaliFlow';

  isLoginPage: boolean = false;

  constructor(private router: Router) {
    // Escucha los cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Si la URL incluye 'login', no mostramos la cabecera ni el footer
        this.isLoginPage = event.url.includes('login');
      }
    });

  }
}

