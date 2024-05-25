import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dtos/mensaje-dto';
import { ImagenDTO } from '../dtos/imagen-dto';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private imgURL = "http://localhost:8080/api/imagenes";

  constructor(private http: HttpClient) { }
  
  public subir(imagen: FormData): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.imgURL}/subir-imagen`, imagen);
  }

  


  public eliminar(imagenDTO: ImagenDTO): Observable<MensajeDTO> {
    return this.http.request<MensajeDTO>('delete', `${this.imgURL}/eliminar-imagen`, {
      body: imagenDTO
    });
  }
}