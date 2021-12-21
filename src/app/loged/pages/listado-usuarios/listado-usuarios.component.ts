import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../models/usuario';
import { ViajesService } from '../../services/viajes.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnDestroy, OnInit {
  constructor(
    private viajesService: ViajesService,
    private dataService: DataService,
    private router: Router,
    public location: Location
  ) {}
  loading: boolean = true;
  Todos: User[] = [];
  Clientes: User[] = [];
  Cadetes: User[] = [];
  Admins: User[] = [];
  dataInfo: string[] = [
    'Pestaña de Usuarios',
    'En esta pestaña se muestra una tabla con todos los usuarios registrados',
    'Cada usuario se puede modificar haciendo click en el icono en la columna editar',
  ];

  notifierSubscription: Subscription =
    this.dataService.subjectNotifier.subscribe((notified) => {
      let aux: string;
      if (notified.vehicle) {
        aux = notified.vehicle.name;
      } else {
        aux = '-';
      }
      this.Todos.forEach((e) => {
        if (notified.id == e.id) {
          e.name = notified.fullName;
          e.rol = notified.rol.id;
          e.address = notified.address;
          e.phone = notified.cellPhone;
          e.vehiculo = aux;
          e.email = notified.email;
        }
      });
      this.Clientes.forEach((e) => {
        if (notified.id == e.id) {
          e.name = notified.fullName;
          e.rol = notified.rol.id;
          e.address = notified.address;
          e.phone = notified.cellPhone;
          e.vehiculo = aux;
          e.email = notified.email;
        }
      });
      this.Cadetes.forEach((e) => {
        if (notified.id == e.id) {
          e.name = notified.fullName;
          e.rol = notified.rol.id;
          e.address = notified.address;
          e.phone = notified.cellPhone;
          e.vehiculo = aux;
          e.email = notified.email;
        }
      });
      this.Admins.forEach((e) => {
        if (notified.id == e.id) {
          e.name = notified.fullName;
          e.rol = notified.rol.id;
          e.address = notified.address;
          e.phone = notified.cellPhone;
          e.vehiculo = notified.vehicle.name;
          e.email = notified.email;
        }
      });
    });

  allUsersData: Usuario[] = [];
  displayedColumns: string[] = [
    'name',
    'rol',
    'address',
    'phone',
    'email',
    'vehiculo',
    'editar',
  ];
  selected: string = 'Todos';
  dataSource = new MatTableDataSource<User>(this.Todos);
  dataSource1 = new MatTableDataSource<User>(this.Clientes);
  dataSource2 = new MatTableDataSource<User>(this.Cadetes);
  dataSource3 = new MatTableDataSource<User>(this.Admins);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.notifierSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.viajesService.getUsuarios().subscribe((resp) => {
      this.allUsersData = resp;
      resp.forEach((e) => {
        let userAux: User;

        if (e.vehicle) {
          userAux = {
            id: e.id,
            name: e.fullName,
            rol: e.rol.id,
            address: e.address,
            phone: e.cellPhone,
            email: e.email,
            vehiculo: e.vehicle.name,
          };
        } else {
          userAux = {
            id: e.id,
            name: e.fullName,
            rol: e.rol.id,
            address: e.address,
            phone: e.cellPhone,
            email: e.email,
            vehiculo: '-',
          };
        }
        if (e.isDeleted == false) {
          if (e.rol.id == 1) {
            this.Admins.push(userAux);
          } else if (e.rol.id == 2) {
            this.Cadetes.push(userAux);
          } else {
            this.Clientes.push(userAux);
          }
          this.Todos.push(userAux);
        }
      });
      this.loading = false;
      console.log(this.Todos);
    });
  }
  cleanData(): void {
    this.Todos = [];
  }
  refresh(): void {
    this.router
      .navigateByUrl('/dash/listado', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }
}
export interface User {
  name: string;
  rol: number;
  address: string;
  phone: string;
  email: string;
  vehiculo: string;
  id: number;
}
