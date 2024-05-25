import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dtos/item-negocio-dto';
import { RegistroNegocioDTO } from '../dtos/registro-negocio-dto';
import { Ubicacion } from '../dtos/modelo/ubicacion';
import { ActivationEnd } from '@angular/router';
import { ActualizarNegocioDTO } from '../dtos/actualizar-negocio-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dtos/mensaje-dto';


@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  private negociosURL = "http://localhost:8080/api/negocios";

  constructor(private http: HttpClient) { }

  public crear(negocioDTO: RegistroNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/crear-negocio`, negocioDTO);
  }
  public actualizar(actualizarNegocio: ActualizarNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosURL}/actualizar-negocio`, actualizarNegocio);
  }
  public obtener(codigoNegocio: string): Observable<MensajeDTO> {
    console.log('aca voy');
    return this.http.get<MensajeDTO>(`${this.negociosURL}/obtener-negocio/${codigoNegocio}`);
  }
  public eliminar(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosURL}/eliminar-negocio/${codigoNegocio}`);
  }
  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/negocios-propietario/${codigoCliente}`);
  }
  // public buscar(palabraBuscada: string): Observable<MensajeDTO> {
  //   const texto = palabraBuscada.toLowerCase();
  //   return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-negocios-palabra/${texto}`);
  // }
}


