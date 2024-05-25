import { Horario } from "./modelo/horario";
import { Ubicacion} from "./modelo/ubicacion";

export class RegistroNegocioDTO {

    constructor(
        
        public nombre: string = '',
        public codigoCliente: string = '',
        public ubicacion: Ubicacion = new Ubicacion(),
        public descripcion: string = '',
        public tipoNegocios: string = '',
        public horarios: Horario[] = [new Horario()],
        public telefonos: string[] = [],
        public tipoTelefono: string = '',
        public imagenes: string[] = []
    
    ) {
        
    }
}
