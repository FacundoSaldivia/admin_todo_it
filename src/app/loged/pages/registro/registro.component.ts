import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { ViajesService } from '../../services/viajes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  constructor(
    private viajesService: ViajesService,
    private _snackBar: MatSnackBar
  ) {}
  selected = '';
  selected2 = '';
  dataInfo = [
    'Pestaña registro',
    'La pestaña registro sirve para que el admin pueda registrar un nuevo usuario, ya sea cadete o usuario final',
    'Este formulario posee 5 inputs que deben ser llenados para poder registrar el nuevo usuario',
    'En caso de que desee registrar un cadete debera asignarle un vehiculo (Bici/Moto/Auto)',
  ];
  form: FormGroup = new FormGroup({
    tipoUsuario: new FormControl(''),
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    cellphone: new FormControl(''),
    automovil: new FormControl(this.selected2),
    observaciones: new FormControl(),
  });
  ngOnInit(): void {}
  submit() {
    let boton = document.getElementById('submit-form');
    boton.classList.add('button--loading');
    boton.setAttribute('style', 'color: rgb(255, 64, 129);');

    this.viajesService.postUsuario(this.constructUser()).subscribe(
      (resp) => {
        console.log(resp);
        boton.setAttribute('style', 'color: white;');
        boton.classList.remove('button--loading');
        this.openSnackBar('Usuario creado con exito', 'Ok', 'green');
      },
      (error) => {
        console.log(error);
        boton.setAttribute('style', 'color: white;');
        boton.classList.remove('button--loading');
        this.openSnackBar('Hubo un error', 'Ok', 'red');
      }
    );
    this.form.reset();
  }

  constructUser(): Usuario {
    let auxUser: Usuario;
    if (this.form.value.tipoUsuario == 'cliente') {
      auxUser = {
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        address: this.form.value.address,
        isAccepted: true,
        cellPhone: this.form.value.cellphone,
        observations: this.form.value.observaciones,
        rol: {
          id: 3,
          name: 'Usuario final',
          isDeleted: 0,
        },
        isDeleted: false,
      };
    } else if (this.form.value.tipoUsuario == 'cadete') {
      let vehiculo;
      if (this.selected2 == 'bici') {
        vehiculo = {
          id: '1',
          name: 'Bicicleta',
          isDeleted: 0,
        };
      } else if (this.selected2 == 'moto') {
        vehiculo = {
          id: '2',
          name: 'Moto',
          isDeleted: 0,
        };
      } else if (this.selected2 == 'auto') {
        vehiculo = {
          id: '3',
          name: 'Automovil',
          isDeleted: 0,
        };
      }
      auxUser = {
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        address: this.form.value.address,
        isAccepted: true,
        cellPhone: this.form.value.cellphone,
        observations: this.form.value.observaciones,
        rol: {
          id: 2,
          name: 'Cadete ',
          isDeleted: 0,
        },
        vehicle: vehiculo,
        isDeleted: false,
      };
    }

    return auxUser;
  }

  openSnackBar(message: string, action: string, color: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [color],
    });
  }
}
