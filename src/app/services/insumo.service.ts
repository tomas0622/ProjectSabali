import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Insumo } from '../models/insumo';
import { VMInsumoDetalle } from '../models/VMInsumoDetalle';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  apiBase = "";

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'insumo'
  }

  getInsumos(): Observable<VMInsumoDetalle[]> {
    return this._http.get<VMInsumoDetalle[]>(this.apiBase + '/detalle')
  }

  postInsumo(insumo: VMInsumoDetalle): Observable<VMInsumoDetalle> {
    return this._http.post<VMInsumoDetalle>(this.apiBase + '/add', insumo)
  }

  putInsumo(id: number, insumo: VMInsumoDetalle): Observable<VMInsumoDetalle> {
    return this._http.put<VMInsumoDetalle>(this.apiBase+`/${id}`, insumo);
  }

  deleteinsumo(id: number): Observable<void> {
    return this._http.delete<void>(this.apiBase+`/${id}`);
  }
}
