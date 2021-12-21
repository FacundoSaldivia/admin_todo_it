import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogedRoutingModule } from './loged-routing.module';
import {
  DialogCerrarSesion,
  SidebarComponent,
} from './components/sidebar/sidebar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LogedComponent } from './loged.component';
import { MaterialModule } from '../material.module';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { HistorialViajesComponent } from './pages/historial-viajes/historial-viajes.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import {
  DialogUser,
  TablaComponent,
} from './pages/listado-usuarios/tabla/tabla.component';
import { TablaViajesComponent } from './pages/historial-viajes/tabla-viajes/tabla-viajes.component';
import {
  DialogViaje,
  TablaViajes2Component,
} from './pages/viajes/tabla-viajes2/tabla-viajes2.component';
import { DialogInfo, InfoComponent } from './components/info/info.component';
import {
  DialogListaUsers,
  ListCadetesComponent,
} from './components/list-cadetes/list-cadetes.component';
import { OverviewComponent } from './pages/overview/overview.component';

@NgModule({
  declarations: [
    SidebarComponent,
    RegistroComponent,
    LogedComponent,
    ViajesComponent,
    HistorialViajesComponent,
    ListadoUsuariosComponent,
    TablaComponent,
    TablaViajesComponent,
    TablaViajes2Component,
    DialogUser,
    InfoComponent,
    DialogInfo,
    DialogViaje,
    ListCadetesComponent,
    DialogListaUsers,
    OverviewComponent,
    DialogCerrarSesion,
  ],
  imports: [CommonModule, LogedRoutingModule, MaterialModule],
})
export class LogedModule {}
