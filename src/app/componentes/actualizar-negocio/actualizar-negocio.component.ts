import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dtos/modelo/horario';
import { NegociosService } from '../../servicios/negocios.service';
import { ActualizarNegocioDTO } from '../../dtos/actualizar-negocio-dto';
import { MapaService } from '../../servicios/mapa.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dtos/alerta';
import { ImagenService } from '../../servicios/imagen.service';
import { Ubicacion } from '../../dtos/modelo/ubicacion';
import { DetalleNegocioDTO } from '../../dtos/detalle-negocio-dto';
import { AlertaComponent } from '../alerta/alerta.component';


@Component({
  selector: 'app-actualizar-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AlertaComponent],
  templateUrl: './actualizar-negocio.component.html',
  styleUrl: './actualizar-negocio.component.css'
})
export class ActualizarNegocioComponent {

  codigoNegocio: string = '';
  actualizarNegocioDTO: ActualizarNegocioDTO;
  archivos!: FileList;
  dias: string[];

  listaTelefonos: string[];
  negocio!: DetalleNegocioDTO;
  horario: Horario;
  alerta!: Alerta;
  descripcion: string;
  ubicacion: Ubicacion;
  horarios: Horario[];
  telefonos: string[];
  tipoTelefono: string[];
  imagenes: string[];


  constructor(private route: ActivatedRoute, private negociosService: NegociosService,
    private tokenService: TokenService, private mapaService: MapaService,
    private imagenService: ImagenService) {

    this.route.params.subscribe((params) => {
      this.codigoNegocio = params['codigo'];
    });


    this.horarios = [new Horario()];
    this.dias = [];
    this.telefonos = [];
    this.cargarDias();
    this.tipoTelefono = [];
    this.listaTelefonos = [""];
    this.horario = new Horario();
    this.cargarTipoTelefono();
    // this.actualizarNegocio()

    this.negocio = new DetalleNegocioDTO();
    this.descripcion = this.negocio.descripcion;
    this.ubicacion = this.negocio.ubicacion;
    // this.horarios = this.negocio.horarios;
    this.telefonos = this.negocio.telefonos;
    this.imagenes = this.negocio.imagenes;
    
    this.actualizarNegocioDTO = new ActualizarNegocioDTO(this.codigoNegocio, this.descripcion, this.ubicacion,
      this.horarios, this.telefonos, this.imagenes);

  }

  public obtenerNegocio() {

    this.negociosService.obtener(this.codigoNegocio).subscribe({
      next: data => {
        this.negocio = data.mensaje;
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, "danger");

      }
    });
  }

  // public actualizarNegocio() {

  //   this.actualizarNegocioDTO.horarios = this.horarios;
  //   this.negociosService.actualizar(this.actualizarNegocioDTO).subscribe({
  //     next: data => {
  //       this.actualizarNegocioDTO = data.mensaje;
  //     },
  //     error: (error) => {
  //       this.alerta = new Alerta(error.error.respuesta, "danger");
  //     }
  //   });
  //   // console.log(this.actualizarNegocioDTO);
  // }

  public actualizarNegocio() {
    this.actualizarNegocioDTO.horarios = this.horarios;
    this.negociosService.actualizar(this.actualizarNegocioDTO);
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

  // public onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.archivos = event.target.files;
  //     this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
  //   }
  // }

  public subirImagen() {

    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('imagen', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.actualizarNegocioDTO.imagenes = data.mensaje.url;
          this.alerta = new Alerta("Se ha subido la foto", "success");
        },
        error: error => {
          this.alerta = new Alerta(error.error, "danger");
        }
      });
    } else {
      this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
  }
  //   public subirImagen() {
  //     if (this.archivos != null && this.archivos.length > 0) {
  //         const formData = new FormData();
  //         for (const archivo of this.archivos) {
  //             formData.append('imagenes', archivo); // Cambia 'imagen' a 'imagenes'
  //         }
  //         this.imagenService.subir(formData).subscribe({
  //             next: data => {
  //                 // Actualiza la lista de URLs de imágenes en lugar de una sola URL
  //                 this.actualizarNegocioDTO.imagenes = data.mensaje.urls;
  //                 this.alerta = new Alerta("Se han subido las fotos", "success");
  //             },
  //             error: error => {
  //                 this.alerta = new Alerta(error.error, "danger");
  //             }
  //         });
  //     } else {
  //         this.alerta = new Alerta("Debe seleccionar al menos una imagen y subirla", "danger");
  //     }
  // }

}