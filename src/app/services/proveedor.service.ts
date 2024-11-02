import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  apiBase = "";

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'proveedor'
  }

  getProveedores(): Observable<Proveedor[]> {
    return this._http.get<Proveedor[]>(this.apiBase + '/')
  }

  postProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this._http.post<Proveedor>(this.apiBase + '/add', proveedor)
  }

  putProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this._http.put<Proveedor>(this.apiBase+`/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<void> {
    return this._http.delete<void>(this.apiBase+`/${id}`);
  }
}
