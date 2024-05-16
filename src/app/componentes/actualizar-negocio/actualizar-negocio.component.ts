import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dtos/modelo/horario';
import { NegociosService } from '../../servicios/negocios.service';
import { ActualizarNegocioDTO } from '../../dtos/actualizar-negocio-dto';
import { MapaService } from '../../servicios/mapa.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-actualizar-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './actualizar-negocio.component.html',
  styleUrl: './actualizar-negocio.component.css'
})
export class ActualizarNegocioComponent {

  actualizarNegocioDTO: ActualizarNegocioDTO;
  horarios: Horario[];
  archivos!: FileList;
  dias: string[];
  telefonos: string[];
  tipoTelefono: string[];
  listaTelefonos: string[];
  horario: Horario;

  constructor(private negociosService: NegociosService,
    private mapaService: MapaService
  ) {

    this.actualizarNegocioDTO = new ActualizarNegocioDTO();
    this.horarios = [new Horario()];
    this.dias = [];
    this.telefonos = [];
    this.cargarDias();
    this.tipoTelefono = [];
    this.listaTelefonos = [""];
    this.horario = new Horario();
    this.cargarTipoTelefono();
  }

  public actualizarNegocio() {
    this.actualizarNegocioDTO.horarios = this.horarios;
    this.negociosService.actualizar(this.actualizarNegocioDTO);
    console.log(this.actualizarNegocioDTO);
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public eliminarHorario() {
    if (this.horarios.length > 0) {
      this.horarios.splice(this.horarios.length - 1, 1);
    }
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) { 
      this.archivos = event.target.files;
      this.actualizarNegocioDTO.imagenes[0] = this.archivos[0].name; // cambiar para que pueda guardar varios archivos

    }
  }

  private cargarTipoTelefono() {
    this.tipoTelefono = ["Móvil", "Fijo"]
  }

  public agregarTelefono() {

    this.listaTelefonos.push("");
  }

  public eliminarTelefono() {
    if (this.listaTelefonos.length > 0) {
      this.listaTelefonos.splice(this.listaTelefonos.length - 1, 1);
    }
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.actualizarNegocioDTO.ubicacion.latitud = marcador.lat;
      this.actualizarNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }



  private cargarDias() {
    this.dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  }
}