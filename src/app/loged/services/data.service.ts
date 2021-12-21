import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  subjectNotifier: Subject<Usuario> = new Subject<Usuario>();
  usuario: Usuario;

  constructor() {}

  notifyAboutChange() {
    this.subjectNotifier.next(this.usuario);
  }
}
