import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../dtos/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { AuthService } from '../../servicios/auth.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dtos/alerta';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AlertaComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroClienteDTO: RegistroClienteDTO;
  ciudades: string[];
  archivos!: FileList;
  alerta!: Alerta;


  constructor(private publicoService: PublicoService, private authService: AuthService) {

    this.registroClienteDTO = new RegistroClienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
  }

  public registrarse() {
    if (this.registroClienteDTO.fotoPerfil != "") {
      this.authService.registrarCliente(this.registroClienteDTO).subscribe({
        next: (data) => {
          this.alerta = new Alerta(data.mensaje, "success");
        },
        error: (error) => {
          this.alerta = new Alerta(error.error.mensaje, "danger");
        }
      });
    } else {
      this.alerta = new Alerta("Debe subir una imagen", "danger");
    }
  }


  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }

  private cargarCiudades() {
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.mensaje;
      },
      error: (error) => {
        console.log("Error al cargar las ciudades");
      }
    });
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }
}
