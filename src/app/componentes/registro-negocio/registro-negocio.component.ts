import { Component } from '@angular/core';
import { RegistroNegocioDTO } from '../../dtos/registro-negocio-dto';
import { Ubicacion } from '../../dtos/modelo/ubicacion';
import { Horario } from '../../dtos/modelo/horario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './registro-negocio.component.html',
  styleUrl: './registro-negocio.component.css'
})
export class RegistroNegocioComponent {

  registroNegocioDTO: RegistroNegocioDTO;
  ubicacion: Ubicacion;
  tipoNegocios: string[];
  horarios: Horario[];
  telefonos: string[];
  imagenes: string[];
  archivos!: FileList;
  dias: string[];
  horario: Horario;
  

  constructor() {

    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.ubicacion = new Ubicacion();
    this.tipoNegocios = [];
    this.horarios = [new Horario()]
    this.telefonos = [];
    this.imagenes = [];
    this.cargarDias();
    this.cargarTiposNegocios();
    this.dias = [];
    this.horario = new Horario();

  }

  public crearNegocio() {

    if (this.ubicacion.latitud != 0 || this.ubicacion.longitud) {
      console.log(this.ubicacion);
    } else {
      console.log("Debe llenar los campos");
    }

    this.horarios.forEach((horario) => {

      if (`Dia: ${horario.dia} != ""`) {
        console.log(this.horarios);
      }

      if (`Hora de inicio: ${horario.horaInicio} != "" `) {
        console.log(this.horarios);
      }

      if (`Hora de inicio: ${horario.horaFin} != "" `) {
        console.log(this.horarios);
      }

    });

  }

  private cargarTiposNegocios() {
    this.tipoNegocios = ["BAR", "COMIDAS_RAPIDAS", "SUPERMERCADOS", "TIENDA", "DISCOTECA"];
  }

  private cargarDias() {
    this.dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroNegocioDTO.imagenes[0] = this.archivos[0].name;
    }
  }
}
