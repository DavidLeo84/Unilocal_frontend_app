import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperacionComponent } from './componentes/recuperacion/recuperacion.component';
import { RegistroNegocioComponent } from './componentes/registro-negocio/registro-negocio.component';
import { RegistroComentarioComponent } from './componentes/registro-comentario/registro-comentario.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { ActualizarNegocioComponent } from './componentes/actualizar-negocio/actualizar-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'recuperacion', component: RecuperacionComponent },
    { path: 'registroNegocioDTO', component: RegistroNegocioComponent },
    { path: 'registroComentarioDTO', component: RegistroComentarioComponent },
    { path: "gestion-negocios", component: GestionNegociosComponent },
    { path: "crear-negocio", component: CrearNegocioComponent },
    { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent },
    { path: "actualizar-negocio", component: ActualizarNegocioComponent},
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: "**", pathMatch: "full", redirectTo: "" }
];