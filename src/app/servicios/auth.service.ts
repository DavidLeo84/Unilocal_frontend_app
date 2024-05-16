import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dtos/mensaje-dto';
import { RegistroClienteDTO } from '../dtos/registro-cliente-dto';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/login-dto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  public registrarCliente(cliente: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-cliente`, cliente);
  }

  public loginCliente(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login-cliente`, loginDTO);
    }
    

}

