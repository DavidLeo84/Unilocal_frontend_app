import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import mapboxgl from 'mapbox-gl';
import { ItemNegocioDTO } from '../dtos/item-negocio-dto';
@Injectable({
  providedIn: 'root'
})
export class MapaService {
  mapa: any;
  marcadores: any[];
  constructor() {
    this.marcadores = [];
  }
  public crearMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibGVvcm9tZXJvODQiLCJhIjoiY2x3NGc2enF3MThkOTJpbHJlc21iOHpiayJ9.OhtC-_77yB2JryL022qvzg',
      container: 'mapa',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-75.6258, 4.4053],
      zoom: 9
    });
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );
  }
  public agregarMarcador(): Observable<any> {
    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;
    return new Observable<any>(observer => {
      mapaGlobal.on('click', function (e: any) {
        marcadores.forEach(marcador => marcador.remove());
        const marcador = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapaGlobal);
        marcadores.push(marcador);
        observer.next(marcador.getLngLat());
      });
    });
  }

  public pintarMarcadores(negocios: ItemNegocioDTO[]) {
    negocios.forEach(negocio => {
      new mapboxgl.Marker()
        .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup().setHTML(negocio.nombre))
        .addTo(this.mapa);
    });
  }

  // pintarMarcadores(negocios: ItemNegocioDTO[]) {
  //   negocios.forEach(negocio => {
  //     const popupContent = `
  //       <div class="popup-content">
  //         <img src="${negocio.imagenDestacada}" alt="${negocio.nombre}" />
  //         <h3>${negocio.nombre}</h3>
  //         <p>${negocio.abierto ? 'Abierto' : 'Cerrado'}</p>
  //         <p>Tipo: ${negocio.tipo}</p>
  //       </div>
  //     `;
  
  //     new mapboxgl.Marker()
  //       .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
  //       .setPopup(new mapboxgl.Popup().setHTML(popupContent))
  //       .addTo(this.mapa);
  //   });
  // }
  
}
