import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-viajes',
  templateUrl: './tabla-viajes.component.html',
  styleUrls: ['./tabla-viajes.component.scss'],
})
export class TablaViajesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['cadete', 'cliente', 'fecha', 'hora', 'estado'];
  @Input() dataSource;
  constructor() {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {}
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
}
