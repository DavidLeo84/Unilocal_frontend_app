import { Component } from '@angular/core';
import { LoginDTO } from '../../dtos/login-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dtos/alerta';
import { TokenService } from '../../servicios/token.service';

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

  constructor(private authService: AuthService, private tokenService: TokenService) {
    
    this.loginDTO = new LoginDTO;
  }

  public login() {

    this.authService.loginCliente(this.loginDTO).subscribe({
      next: data => {
        this.tokenService.login(data.mensaje.token);
      },
      error: error => {
        this.alerta = new Alerta(error.error.mensaje, "danger"); // se cambio respuesta por mensaje
      }
    });
  }

  public estanVacios(): boolean {
    return this.loginDTO.email == "" || this.loginDTO.password == "";
  }

}
