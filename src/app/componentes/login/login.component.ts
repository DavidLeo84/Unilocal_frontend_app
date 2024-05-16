import { Component } from '@angular/core';
import { LoginDTO } from '../../dtos/login-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dtos/alerta';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginDTO: LoginDTO;
  alerta!: Alerta;

  constructor(private authService: AuthService) {
    this.loginDTO = new LoginDTO;
  }
  public iniciarSesion() {
    if (this.loginDTO.email != "" || this.loginDTO.password != "") {

      this.authService.loginCliente(this.loginDTO).subscribe({
        next: (data) => {
          this.alerta = new Alerta(data.mensaje, "success");
        },
        error: (error) => {
          this.alerta = new Alerta(error.error.mensaje, "danger");
        }
      });
      console.log(this.loginDTO)
    } else {
      //console.log("El campo email y/o password no pueden estar vacío");
      this.alerta = new Alerta("El campo email y/o password no pueden estar vacío", "danger");
    }
  }
  
  public estanVacios(): boolean {
    return this.loginDTO.email == "" || this.loginDTO.password == "";
  }

}
