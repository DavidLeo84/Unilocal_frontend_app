import { Ubicacion } from "../dtos/modelo/ubicacion";
import { Horario } from "./modelo/horario";

export class ActualizarNegocioDTO {

    constructor(

        public codigo: string = "",
        public descripcion: string = "",
        public ubicacion: Ubicacion = new Ubicacion(),
        public horarios: Horario[] = [new Horario()],
        public telefonos: string[] = [],
        // public tipoTelefono: string = '',
        public imagenes: string[] = []
    ) {

    }
}
