import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { ViajesService } from '../../services/viajes.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.scss'],
})
export class HistorialViajesComponent implements AfterViewInit, OnInit {
  constructor(private viajesService: ViajesService) {}
  dataInfo: string[] = [
    'Pestaña Historial de Viajes',
    'En esta pestaña el administrador puede ver todos los viajes ya completados en donde el usuario confirmo el recibo de este',
  ];
  displayedColumns: string[] = ['cadete', 'cliente', 'fecha', 'hora', 'estado'];
  arrHistorial: viaje[] = [];
  loading: boolean = true;
  dataSource = new MatTableDataSource<viaje>(this.arrHistorial);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getViajes();
  }

  getViajes(): void {
    let viajesRetiro = this.viajesService.getViajesEntregados();
    let viajesEntrega = this.viajesService.getViajesRecibido();
    forkJoin([viajesEntrega, viajesRetiro]).subscribe((resp) => {
      let aux = [...resp[0], ...resp[1]];
      aux.forEach((e) => {
        let objAux: viaje;
        if (e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].cadete) {
          objAux = {
            cliente:
              e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
                .cliente.fullName,
            cadete:
              e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].cadete
                .fullName,
            estado: e.lastStatusTravel,
            fecha: this.formatFecha(
              e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1]
                .operationDate
            ),
            hora: e.travelEquipmentDTOs[
              e.travelEquipmentDTOs.length - 1
            ].operationDate.substring(11, 16),
          };
        } else {
          objAux = {
            cliente:
              e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1].equipment
                .cliente.fullName,
            cadete: '-',
            estado: e.lastStatusTravel,
            fecha: this.formatFecha(
              e.travelEquipmentDTOs[e.travelEquipmentDTOs.length - 1]
                .operationDate
            ),
            hora: e.travelEquipmentDTOs[
              e.travelEquipmentDTOs.length - 1
            ].operationDate.substring(11, 16),
          };
        }

        this.arrHistorial.push(objAux);
        this.loading = false;
      });
    });
  }
  formatFecha(fecha: string): string {
    let aux =
      fecha.substring(8, 10) +
      fecha.substring(4, 7) +
      '-' +
      fecha.substring(0, 4);
    return aux;
  }
}
export interface viaje {
  cadete: string;
  cliente: string;
  fecha: string;
  hora: string;
  estado: number;
}
