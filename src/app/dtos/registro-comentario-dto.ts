import { Time } from "@angular/common";

export class RegistroComentarioDTO {


    constructor(

        public codigoCliente: string = '',
        public codigoNegocio: string = '',
        public mensaje: string = '',
        public fechaMensaje: string = '', 
        public respuesta: string = '',
        public fechaRespuesta: string = ''

    ) {

    }
}

