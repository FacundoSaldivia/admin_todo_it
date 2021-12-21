import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Subject } from 'rxjs';
import { Viaje } from '../../models/travel';
import { Data2Service } from '../../services/data2.service';
import { ViajesService } from '../../services/viajes.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss'],
})
export class ViajesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['cliente', 'direccion', 'estado'];
  selected: string = 'viajesActivos';
  viajesActivos: viaje[] = [];
  viajesPendientes: viaje[] = [];
  viajesEnCurso: viaje[] = [];
  dataFull: Viaje[] = [];
  loading: boolean = false;
  dataInfo: string[] = [
    'Pestaña viajes',
    'En esta pesataña se pueden ver la lista de los viajes aun no terminados',
    'Cada viaje puede ser modificado por el administrador pero debe tener en cuenta los movimientos que la base de datos permita o no (ni yo se cuales son)',
    'Para editar un viaje el administrador debe clickear en el icono de edit del viaje que desee editar',
  ];
  notifierSubscription: Subscription =
    this.dataService.subjectNotifier.subscribe((notified) => {
      this.viajesActivos.forEach((viaje) => {
        if (viaje.id == notified.id) {
          viaje.estado = this.getStatus(notified.lastStatusTravel);
        }
      });
      this.viajesPendientes.forEach((viaje) => {
        if (viaje.id == notified.id) {
          viaje.estado = this.getStatus(notified.lastStatusTravel);
        }
      });
      this.viajesEnCurso.forEach((viaje) => {
        if (viaje.id == notified.id) {
          viaje.estado = this.getStatus(notified.lastStatusTravel);
        }
      });
    });
  dataSource = new MatTableDataSource<viaje>(this.viajesActivos);
  dataSource1 = new MatTableDataSource<viaje>(this.viajesPendientes);
  dataSource2 = new MatTableDataSource<viaje>(this.viajesEnCurso);

  constructor(
    private viajesService: ViajesService,
    private dataService: Data2Service
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.getViajesAsignados();
    this.getViajesEnCurso();
    this.getViajesDisponibles();
  }

  getViajesDisponibles() {
    let viajes1 = this.viajesService.getAllAvilableRetiro();
    let viajes5 = this.viajesService.getAllAvilableEntrega();
    let viajes2 = this.viajesService.getAllAvilableRetiroAsignado();
    let viajes6 = this.viajesService.getAllAvilableEntregaAsignado();
    let viajes7 = this.viajesService.getAllAvilableEntregaEnCurso();
    let viajes3 = this.viajesService.getAllAvilableRetiroEnCurso();
    let viajes4 = this.viajesService.getAny(4);
    let viajes8 = this.viajesService.getAny(8);
    forkJoin([
      viajes1,
      viajes2,
      viajes3,
      viajes5,
      viajes6,
      viajes7,
      viajes4,
      viajes8,
    ]).subscribe((resp) => {
      let todos = [
        ...resp[0],
        ...resp[1],
        ...resp[2],
        ...resp[3],
        ...resp[4],
        ...resp[5],
        ...resp[6],
        ...resp[7],
      ];
      let pendientes = [...resp[0], ...resp[3], ...resp[6]];
      let enCurso = [...resp[2], ...resp[5]];
      this.dataFull = todos;
      todos.forEach((e) => {
        let objAux: viaje = {
          id: e.id,
          cliente:
            e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
              .cliente.fullName,
          direccion:
            e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
              .cliente.address,
          estado: this.getStatus(e.lastStatusTravel),
        };
        this.viajesActivos.push(objAux);
      });
      pendientes.forEach((e) => {
        let objAux: viaje = {
          id: e.id,
          cliente:
            e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
              .cliente.fullName,
          direccion:
            e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
              .cliente.address,
          estado: this.getStatus(e.lastStatusTravel),
        };
        this.viajesPendientes.push(objAux);
      });
      enCurso.forEach((e) => {
        let objAux: viaje = {
          id: e.id,
          cliente:
            e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
              .cliente.fullName,
          direccion:
            e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
              .cliente.address,
          estado: this.getStatus(e.lastStatusTravel),
        };
        this.viajesEnCurso.push(objAux);
      });
      this.loading = !this.loading;
    });
  }

  getViajesAsignados(): void {}

  getViajesEnCurso(): void {}

  getStatus(status: number): string {
    if (status == 1) {
      return 'Pendiente retiro';
    }
    if (status == 5) {
      return 'Pendiente entrega';
    }
    if (status == 6 || status == 2) {
      return 'Cadete Asignado';
    }
    if (status == 7 || status == 3) {
      return 'En curso';
    }
    if (status == 4) {
      return 'Espera reparacion';
    }
    if (status == 8) {
      return 'Entregado';
    }
    if (status == 9) {
      return 'Recibido';
    }
    return '-';
  }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }
}

export interface viaje {
  id: number;
  cliente: string;
  direccion: string;
  estado: string;
}
