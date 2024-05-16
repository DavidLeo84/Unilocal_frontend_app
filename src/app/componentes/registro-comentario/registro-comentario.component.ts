import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroComentarioDTO } from '../../dtos/registro-comentario-dto';

@Component({
  selector: 'app-registro-comentario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-comentario.component.html',
  styleUrl: './registro-comentario.component.css'
})
export class RegistroComentarioComponent {

  registroComentarioDTO: RegistroComentarioDTO;

  constructor() {
    this.registroComentarioDTO = new RegistroComentarioDTO();
  }

  public crearComentario() {

    if (this.registroComentarioDTO.codigoCliente != "" || this.registroComentarioDTO.codigoNegocio != "" ||
      this.registroComentarioDTO.mensaje != "" || this.registroComentarioDTO.fechaMensaje || this.registroComentarioDTO.respuesta != "" ||
      this.registroComentarioDTO.fechaRespuesta != "") {
        console.log(this.registroComentarioDTO);
    } else {
      console.log("No pueden haber campos vacios");
    }
  }


}

