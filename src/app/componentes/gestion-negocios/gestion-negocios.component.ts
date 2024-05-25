import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dtos/item-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { find } from 'rxjs';
import { ActualizarNegocioDTO } from '../../dtos/actualizar-negocio-dto';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dtos/alerta';
import { DetalleNegocioDTO } from '../../dtos/detalle-negocio-dto';
import { RegistroNegocioDTO } from '../../dtos/registro-negocio-dto';
@Component({

  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css'
})

export class GestionNegociosComponent {

  negocios!: ItemNegocioDTO[];
  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: string;
  seleccionado: ItemNegocioDTO;
  negocio!: ItemNegocioDTO;
  actualizarNegocioDTO: ActualizarNegocioDTO;
  alerta!:Alerta;
  codigoNegocio: string;
  negocioDTO: RegistroNegocioDTO;
  codigoCliente: string;
  
  constructor(private route: ActivatedRoute, private negocioService: NegociosService, 
    private tokenService: TokenService) {
      
    // this.negocios = [];
    this.listarNegocios();
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    this.seleccionado = new ItemNegocioDTO();
    this.actualizarNegocioDTO = new ActualizarNegocioDTO();
    // this.negocio = new ItemNegocioDTO();
    this.codigoNegocio = '';
    this.borrarNegocios();
    this.negocioDTO = new RegistroNegocioDTO();
    this.codigoCliente = this.tokenService.getCodigo();
  }

 

  public listarNegocios() {
    this.codigoCliente = this.tokenService.getCodigo();
    this.negocioService.listarNegociosPropietario(this.codigoCliente).subscribe({
      next: (data) => {
        this.negocios = data.mensaje;
      //   this.negocios.forEach(n =>{
      //   this.codigoNegocio = n.codigo;
      //   console.log(this.codigoNegocio);
      // })
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  
  }


  public seleccionar(producto: ItemNegocioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
      
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(producto), 1);
    }
    this.actualizarMensaje();
  }

  

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarNegocios() {
    
    this.seleccionados.forEach(n => {
      this.codigoNegocio = n.codigo;
      this.negocioService.eliminar(this.codigoNegocio);
      console.log("aca entró")
      this.negocios = this.negocios.filter(negocio => negocio.codigo !== this.codigoNegocio);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

 
  public actualizarNegocio() {

    const codigo = this.seleccionado.codigo;
    this.negocios.find(negocios => negocios.codigo == codigo);
    this.negocioService.actualizar(this.actualizarNegocioDTO);
  }


}