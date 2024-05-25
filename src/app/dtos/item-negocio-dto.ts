import { Ubicacion } from "../dtos/modelo/ubicacion";
import { Horario } from "./modelo/horario";

export class ItemNegocioDTO {
constructor(
    public codigo: string = '',
    public nombre: string = '',
    public tipoNegocios: string = '',
    public ubicacion: Ubicacion = new Ubicacion()
    // public descripcion: string = '',
    // public calificacionPromedio: number = 0,
    // public horarios: Horario[] = [],
    // public telefonos: string[] = [],
    // public imagenes: string[] = []

){}
}