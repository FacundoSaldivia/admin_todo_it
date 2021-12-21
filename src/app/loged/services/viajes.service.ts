import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../models/travel';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root',
})
export class ViajesService {
  constructor(private http: HttpClient) {}
  getAny(id: number): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/${id}`);
  }
  // Recibo los envios disponibles
  getAllAvilableRetiro(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/1`);
  }
  getAllAvilableEntrega(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/5`);
  }

  // Recibo los envios asignados
  getAllAvilableRetiroAsignado(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/2`);
  }
  getAllAvilableEntregaAsignado(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/6`);
  }

  // Recibo los envios en curso
  getAllAvilableRetiroEnCurso(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/3`);
  }
  getAllAvilableEntregaEnCurso(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/7`);
  }

  //
  getViajesEntregados(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/8`);
  }
  getViajesRecibido(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`/api/Travel/1/9`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`/api/Users?userOperation=1`);
  }

  postUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`/api/Users`, user);
  }
  modificarViaje(
    viaje: Viaje,
    cadeteId: number,
    nuevoStatus: number,
    observaciones: string,
    resigned: boolean
  ): Observable<Viaje> {
    observaciones = observaciones.replace(' ', '%20');
    return this.http.post<Viaje>(
      `/api/Travel?travelId=${viaje.id}&statusTravel=${nuevoStatus}&userOperation=2&cadeteId=${cadeteId}&isReasigned=${resigned}&observations=${observaciones}`,
      viaje
    );
  }
}
