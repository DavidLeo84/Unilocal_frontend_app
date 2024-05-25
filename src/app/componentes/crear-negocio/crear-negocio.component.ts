import { Component } from '@angular/core';
import { RegistroNegocioDTO } from '../../dtos/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dtos/modelo/horario';
import { MapaService } from '../../servicios/mapa.service';
import { Router, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { Alerta } from '../../dtos/alerta';
import { ImagenService } from '../../servicios/imagen.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { TokenService } from '../../servicios/token.service';

@Component({

  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AlertaComponent],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})

export class CrearNegocioComponent {

  negocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  archivos!: FileList;
  horario: Horario;
  dias: string[];
  listaTelefonos: string[];
  tipoTelefono: string[];
  tiposNegocios: string[];
  alerta!: Alerta;

  constructor(private negociosService: NegociosService, private mapaService: MapaService,
    private imagenService: ImagenService, private publicoService: PublicoService,
     private router: Router, private tokenService: TokenService) {

    this.negocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    this.horario = new Horario();
    this.dias = [];
    this.cargarDias();
    this.listaTelefonos = [""];
    this.tipoTelefono = [];
    this.tiposNegocios = [];
    this.cargarTipoTelefono();
    this.cargarTiposNegocios();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.negocioDTO.ubicacion.latitud = marcador.lat;
      this.negocioDTO.ubicacion.longitud = marcador.lng;
    });
  }


  public crearNegocio() {
    const codigoCliente = this.tokenService.getCodigo();
    this.negocioDTO.codigoCliente = codigoCliente;
    if (this.negocioDTO.imagenes[0] != "") {

      this.negociosService.crear(this.negocioDTO).subscribe({
        next: (data) => {
          this.alerta = new Alerta(data.mensaje, "success");
          this.router.navigate(["/"]);
        },
        error: (error) => {
          this.alerta = new Alerta(error.error.mensaje, "danger");
        }

      });
    } else {
      this.alerta = new Alerta("Debe subir una imagen", "danger");
    }
  }
  // this.negocioDTO.horarios = this.horarios;
  // this.negociosService.crear(this.negocioDTO);
  // console.log(this.negocioDTO);

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
    this.dias = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  }

  private cargarTipoTelefono() {
    this.tipoTelefono = ["Móvil", "Fijo"]
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.negocioDTO.imagenes[0] = this.archivos[0].name; // cambiar para que pueda guardar varios archivos

    }
  }

  private cargarTiposNegocios() {
    this.publicoService.listarTiposNegocio().subscribe({
      next: (data) => {
        this.tiposNegocios = data.mensaje;
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }

  public subirImagen() {

    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('imagen', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.negocioDTO.imagenes[0] = data.mensaje.url;
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
}

