import { Component } from '@angular/core';
import { RegistroNegocioDTO } from '../../dtos/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dtos/modelo/horario';
import { MapaService } from '../../servicios/mapa.service';
import { RouterModule } from '@angular/router';

@Component({

  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})

export class CrearNegocioComponent {

  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  archivos!: FileList;
  horario: Horario;
  dias: string[];
  listaTelefonos: string[];
  tipoTelefono: string[];

  constructor(private negociosService: NegociosService,
    private mapaService: MapaService) {

    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    this.horario = new Horario();
    this.dias = [];
    this.cargarDias();
    this.listaTelefonos = [""];
    this.tipoTelefono = [];
    this.cargarTipoTelefono();

  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }


  public crearNegocio() {
    this.registroNegocioDTO.horarios = this.horarios;
    this.negociosService.crear(this.registroNegocioDTO);
    console.log(this.registroNegocioDTO);
  }


  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public eliminarHorario() {
    if (this.horarios.length > 0) {
      this.horarios.splice(this.horarios.length - 1, 1);
    }
  }

  public agregarTelefono() {

    this.listaTelefonos.push("");
  }

  public eliminarTelefono() {
    if (this.listaTelefonos.length > 0) {
      this.listaTelefonos.splice(this.listaTelefonos.length - 1, 1);
    }
  }
  

  private cargarDias() {
    this.dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  }

  private cargarTipoTelefono(){
    this.tipoTelefono = ["Móvil", "Fijo"]
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroNegocioDTO.imagenes[0] = this.archivos[0].name; // cambiar para que pueda guardar varios archivos

    }
  }
}
