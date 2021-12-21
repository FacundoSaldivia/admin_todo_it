import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Viaje } from '../models/travel';

@Injectable({
  providedIn: 'root',
})
export class Data2Service {
  subjectNotifier: Subject<Viaje> = new Subject<Viaje>();
  viaje: Viaje;

  constructor() {}

  notifyAboutChange() {
    this.subjectNotifier.next(this.viaje);
  }
}
