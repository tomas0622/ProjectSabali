import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiBase = "";

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'usuario'
  }

  getUsuarios(): Observable<Usuario[]> {
    return this._http.get<Usuario[]>(this.apiBase + '/')
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(this.apiBase + '/add', usuario)
  }

  putUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this._http.put<Usuario>(this.apiBase+`/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this._http.delete<void>(this.apiBase+`/${id}`);
  }
}
