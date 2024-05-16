import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dtos/registro-cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clientes: RegistroClienteDTO[];

  constructor() {

    this.clientes = [];
    this.clientes.push(new RegistroClienteDTO('David Romero', 'https://picsum.photos/100', 'davinchi', 'ARMENIA', 'leoromero141@gmail.com',
      '123456', '123456'));
      this.clientes.push(new RegistroClienteDTO('Sara Cruz', 'https://picsum.photos/100', 'sarita', 'BOGOTA', 'saracruz18@gmail.com',
      '123456', '123456'));
      this.clientes.push(new RegistroClienteDTO('Pepe Perez', 'https://picsum.photos/100', 'pepito', 'CIRCASIA', 'pepitoperez@gmail.com',
      '123456', '123456'));
   }

   public obtener(nickname: string): RegistroClienteDTO | undefined {

    return this.clientes.find(negocios => clientes.nickname == nickname);
  }

  public crear(clienteNuevo: RegistroClienteDTO) {

    this.clientes.push(new RegistroClienteDTO(clienteNuevo.nombre,
      clienteNuevo.fotoPerfil[0], clienteNuevo.nickname, clienteNuevo.ciudad, clienteNuevo.email,
       clienteNuevo.password, clienteNuevo.confirmaPassword));
  }
}
