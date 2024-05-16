import { Component } from '@angular/core';
import { RecuperarPasswordDTO } from '../../dtos/recuperar-password-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {

  recuperarPasswordDTO : RecuperarPasswordDTO;

  constructor(){
    this.recuperarPasswordDTO = new RecuperarPasswordDTO;
  }
  public enviarLink() {
    if (this.recuperarPasswordDTO.email != "") {
      console.log(this.recuperarPasswordDTO)
    }else {
      console.log("El campo email no puede estar vacio")
    }
  }

  public estaVacio(): boolean {
    return this.recuperarPasswordDTO.email == "" ;
  }

}
