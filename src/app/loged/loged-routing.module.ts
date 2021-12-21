import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogedComponent } from './loged.component';
import { LogedModule } from './loged.module';
import { HistorialViajesComponent } from './pages/historial-viajes/historial-viajes.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ViajesComponent } from './pages/viajes/viajes.component';

const routes: Routes = [
  {
    path: '',
    component: LogedComponent,
    children: [
      { path: 'registro', component: RegistroComponent },
      { path: 'viajes', component: ViajesComponent },
      { path: 'historial-viajes', component: HistorialViajesComponent },
      { path: 'listado', component: ListadoUsuariosComponent },
      { path: 'overview', component: OverviewComponent },
      { path: '**', redirectTo: 'overview' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogedRoutingModule {}
