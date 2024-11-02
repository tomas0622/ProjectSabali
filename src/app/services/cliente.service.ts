import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment';
import { Movimiento } from '../models/Movimiento';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiBase = "";

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'cliente'
  }

  getClientes(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(this.apiBase + '/')
  }

  getMovimientos(): Observable<Movimiento[]> {
    return this._http.get<Movimiento[]>(this.apiBase + '/movimiento')
  }

  postCliente(cliente: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(this.apiBase + '/add', cliente)
  }

  putCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this._http.put<Cliente>(this.apiBase+`/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this._http.delete<void>(this.apiBase+`/${id}`);
  }

}
