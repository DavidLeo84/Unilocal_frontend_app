import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { ItemNegocioDTO } from '../../dtos/item-negocio-dto';
import { Alerta } from '../../dtos/alerta';
import { PublicoService } from '../../servicios/publico.service';


@Component({

  selector: 'app-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})

export class BusquedaComponent implements OnInit {

  textoBusqueda: string;
  resultados!: ItemNegocioDTO[];
  alerta!: Alerta;

  constructor(private route: ActivatedRoute, private negociosService: NegociosService,
    private mapaService: MapaService, private publicoService: PublicoService) {

    this.resultados = [];
    this.textoBusqueda = "";
    this.route.params.subscribe(params => {
      //this.textoBusqueda = params['texto'];
      this.textoBusqueda = params['palabraBuscada']; 

      // this.resultados = this.negociosService.buscar(this.textoBusqueda);
      this.buscarNegocio(this.textoBusqueda);
    });
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcadores(this.resultados);
  }

  public buscarNegocio(codigoNegocio: string) {

    this.publicoService.buscar(codigoNegocio).subscribe({
      next: data => {
        this.resultados = data.mensaje;
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });

  }
}
