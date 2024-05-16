import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dtos/item-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { find } from 'rxjs';
import { ActualizarNegocioDTO } from '../../dtos/actualizar-negocio-dto';
@Component({

  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css'
})

export class GestionNegociosComponent {

  negocios: ItemNegocioDTO[];
  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: string;
  seleccionado: ItemNegocioDTO;
  negocio: ItemNegocioDTO;
  actualizarNegocioDTO: ActualizarNegocioDTO;


  constructor(private negocioService: NegociosService) {
    this.negocios = [];
    this.listarNegocios();
    this.seleccionados = [];
    this.textoBtnEliminar = "";
    this.seleccionado = new ItemNegocioDTO();
    this.actualizarNegocioDTO = new ActualizarNegocioDTO();
    this.negocio = new ItemNegocioDTO();
  }


  public listarNegocios() {
    this.negocios = this.negocioService.listar();
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
      this.negocioService.eliminar(n.codigoNegocio);
      this.negocios = this.negocios.filter(negocio => negocio.codigoNegocio !== n.codigoNegocio);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public actualizarNegocio() {

    const codigo = this.seleccionado.codigoNegocio;
   
    this.negocios.find(negocios => negocios.codigoNegocio == codigo);
    
    this.negocioService.actualizar(this.actualizarNegocioDTO);

  }


}