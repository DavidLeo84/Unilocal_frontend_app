import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dtos/alerta';
import { ItemNegocioDTO } from '../../dtos/item-negocio-dto';
import { DetalleNegocioDTO } from '../../dtos/detalle-negocio-dto';

@Component({

  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})

export class DetalleNegocioComponent {

  codigo: string = '';
  // negocio!: ItemNegocioDTO ;
  negocio: DetalleNegocioDTO;
  alerta!: Alerta;
  
  

  constructor(private route: ActivatedRoute, private negociosService: NegociosService,
    private tokenService: TokenService) {

    this.route.params.subscribe((params) => {
      this.codigo = params['codigo'];
      this.obtenerNegocio();
      console.log(this.codigo);
    });
    // this.tiposNegocio = this.negocio.tipoNegocios;
    // this.telefonos = this.negocio.telefonos;
    this.negocio = new DetalleNegocioDTO();
    
  }

  public obtenerNegocio() {

    this.negociosService.obtener(this.codigo).subscribe({
      next: data => {
        this.negocio = data.mensaje;
        
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, "danger");

      }
    });
  }

}

