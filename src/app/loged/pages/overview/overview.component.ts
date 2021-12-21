import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';
import { ViajesService } from '../../services/viajes.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private viajesService: ViajesService) {}
  @ViewChild('dChart', { static: true }) private chartRef;
  @ViewChild('lineChart', { static: true }) private chartRef2;
  @ViewChild('barChart', { static: true }) private chartRef3;
  chart: any;
  clientes = ['Administradores', 'Cadetes', 'Clientes'];
  usuarios = [];
  date: Date = new Date();
  days = ['Hoy', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'];
  arrAux2 = [0, 0, 0, 0, 0, 0, 0];
  viajesBar = [0, 0];
  etiquetaBar = ['Exitosos', 'Renunciados'];
  loading = true;

  ngOnInit() {
    this.getUsers();
    console.log(this.date.getDay());
    this.getTravels();
  }
  getUsers(): void {
    this.viajesService.getUsuarios().subscribe((res) => {
      let arrAux = [0, 0, 0];

      res.forEach((e) => {
        if (e.isDeleted == false) {
          if (e.rol.id == 3) {
            arrAux[2] = arrAux[2] + 1;
          } else if (e.rol.id == 2) {
            arrAux[1] = arrAux[1] + 1;
          } else {
            arrAux[0] = arrAux[0] + 1;
          }
        }
      });
      this.usuarios = arrAux;
      this.loading = false;
      console.log(this.usuarios);
      this.createChart(this.clientes, this.usuarios);
    });
  }

  getTravels(): void {
    let viaje1 = this.viajesService.getAny(1);
    let viaje2 = this.viajesService.getAny(2);
    let viaje3 = this.viajesService.getAny(3);
    let viaje4 = this.viajesService.getAny(4);
    let viaje5 = this.viajesService.getAny(5);
    let viaje6 = this.viajesService.getAny(6);
    let viaje7 = this.viajesService.getAny(7);
    let viaje8 = this.viajesService.getAny(8);
    let viaje9 = this.viajesService.getAny(9);
    let viaje10 = this.viajesService.getAny(10);

    forkJoin([
      viaje1,
      viaje2,
      viaje3,
      viaje4,
      viaje5,
      viaje6,
      viaje7,
      viaje8,
      viaje9,
      viaje10,
    ]).subscribe((res) => {
      let todos = [
        ...res[0],
        ...res[1],
        ...res[2],
        ...res[3],
        ...res[4],
        ...res[5],
        ...res[6],
        ...res[7],
        ...res[8],
        ...res[9],
      ];
      todos.forEach((e) => {
        let aux: number = parseInt(e.creationDate.substring(8, 10), 10);
        let dat: number = this.date.getDate();
        if (dat - aux < 8) {
          this.arrAux2[dat - aux] += 1;
        }
        e.travelEquipmentDTOs.forEach((dto) => {
          let diaAux = parseInt(dto.operationDate.substring(8, 10));
          if (diaAux == dat) {
            if (dto.statusTravel != 10) {
              this.viajesBar[0] += 1;
            } else {
              this.viajesBar[1] += 1;
            }
          }
        });
      });
      console.log(this.arrAux2);
      this.createChartLine(this.days, this.arrAux2);
      this.createChartBar(this.etiquetaBar, this.viajesBar);
    });
  }

  createChart(labels: string[], datos: number[]): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: datos,
            borderColor: '#3cba9f',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
  createChartBar(labels: string[], datos: number[]): void {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart2');
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    this.chart = new Chart(this.chartRef3.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Viajes',
            backgroundColor: gradient,
            data: datos,
            borderColor: '#f3f3f3',
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
  createChartLine(labels: string[], datos: number[]): void {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.chart = new Chart(this.chartRef2.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: gradient,
            tension: 0.2,
            data: datos,
            label: 'Viajes diarios',
            borderWidth: 3,
            fill: true,
            borderColor: '#f3f3f3',
            pointRadius: 1,
            pointHoverRadius: 10,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {},
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              display: true,
              drawBorder: false,
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        },
      },
    });
  }
}
