import { Horario } from "./modelo/horario";
import { Ubicacion } from "./modelo/ubicacion";

export class DetalleNegocioDTO {

    constructor(
        public codigo: string = '',
        public nombre: string = '',
        public tipoNegocios: string = '',
        public ubicacion: Ubicacion = new Ubicacion(),
        public descripcion: string = '',
        public calificacion: number = 0,
        public horarios: Horario[] = [],
        public telefonos: string[] = [],
        public imagenes: string[] = []
    
    ){}
}
