import { Injectable } from '@angular/core';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VMVentaDetalle } from '../models/VMVentaDetalle';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  apiBase = "";

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'venta'
  }

  getVentas(): Observable<VMVentaDetalle[]> {
    return this._http.get<VMVentaDetalle[]>(this.apiBase + '/detalle')
  }

  postVenta(venta: VMVentaDetalle): Observable<VMVentaDetalle> {
    return this._http.post<VMVentaDetalle>(this.apiBase + '/add', venta)
  }

  putVenta(id: number, venta: VMVentaDetalle): Observable<VMVentaDetalle> {
    return this._http.put<VMVentaDetalle>(this.apiBase+`/${id}`, venta);
  }

  deleteVenta(id: number): Observable<void> {
    return this._http.delete<void>(this.apiBase+`/${id}`);
  }
}
