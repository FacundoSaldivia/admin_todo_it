import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Input,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Usuario } from 'src/app/loged/models/usuario';
import { FormGroup, FormControl } from '@angular/forms';
import { ViajesService } from 'src/app/loged/services/viajes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/loged/services/data.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog, private dataService: DataService) {}
  @Input() dataSource;
  @Input() allUsersData;
  displayedColumns: string[] = [
    'name',
    'rol',
    'address',
    'phone',
    'email',
    'vehiculo',
    'editar',
  ];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  identificarUser(user: User) {
    let id = user.id;
    this.allUsersData.forEach((e: Usuario) => {
      if (e.id == id) {
        this.openDialog(e);
      }
    });
  }

  openDialog(usuario: Usuario): void {
    const dialogRef = this.dialog.open(DialogUser, {
      width: '650px',
      data: usuario,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result.data);
      this.notifyForChange(result.data);
    });
  }

  getUserName(nro: number): string {
    if (nro == 1) {
      return 'Admin';
    }
    if (nro == 2) {
      return 'Cadete';
    }
    if (nro == 3) {
      return 'Cliente';
    }
    return '-';
  }
  notifyForChange(usuario: Usuario) {
    this.dataService.usuario = usuario;
    this.dataService.notifyAboutChange();
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

@Component({
  selector: 'dialog-user-table',
  templateUrl: 'dialog-user/dialog-user.html',
  styleUrls: ['dialog-user/dialog-user.scss'],
})
export class DialogUser implements OnInit {
  constructor(
    private viajesServices: ViajesService,
    public dialogRef: MatDialogRef<DialogUser>,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {}

  selected = this.data.rol.id;
  selected2 = this.getVeihcleId(this.data);
  selected3: boolean = this.data.isAccepted;
  selected4: boolean = this.data.isDeleted;
  form: FormGroup = new FormGroup({
    tipoUsuario: new FormControl(this.data.rol.id),
    fullName: new FormControl(this.data.fullName),
    email: new FormControl(this.data.email),
    password: new FormControl(this.data.password),
    address: new FormControl(this.data.address),
    cellphone: new FormControl(this.data.cellPhone),
    automovil: new FormControl(this.selected2),
    isAccepted: new FormControl(this.data.isAccepted),
    isDeleted: new FormControl(this.data.isDeleted),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
  submit(): void {
    this.modifyUser(this.constructUser());
    this.openSnackBar();
    this.dialogRef.close({ data: this.data });
  }

  constructUser(): Usuario {
    let userAux: Usuario;
    if (this.form.value.tipoUsuario == 2) {
      userAux = {
        id: this.data.id,
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        cellPhone: this.form.value.cellphone,
        address: this.form.value.address,
        isAccepted: this.form.value.isAccepted,
        isDeleted: this.form.value.isDeleted,
        rol: { id: 2, name: 'Cadete', isDeleted: 0 },
        vehicle: {
          id: this.form.value.automovil,
          name: this.getVeihcle(this.form.value.automovil),
          isDeleted: 0,
        },
      };
    } else if (this.form.value.tipoUsuario == 3) {
      userAux = {
        id: this.data.id,
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        cellPhone: this.form.value.cellphone,
        address: this.form.value.address,
        isAccepted: this.form.value.isAccepted,
        isDeleted: this.form.value.isDeleted,
        rol: { id: 3, name: 'Usuario Final', isDeleted: 0 },
        vehicle: null,
      };
    } else if (this.form.value.tipoUsuario == 1) {
      userAux = {
        id: this.data.id,
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        cellPhone: this.form.value.cellphone,
        address: this.form.value.address,
        isAccepted: this.form.value.isAccepted,
        isDeleted: this.form.value.isDeleted,
        rol: { id: 1, name: 'Administrador', isDeleted: 0 },
        vehicle: null,
      };
    }
    this.data = userAux;
    return userAux;
  }
  getVeihcle(nro: number): string {
    if (nro == 1) {
      return 'Bicicleta';
    }
    if (nro == 2) {
      return 'Motocicleta';
    }
    if (nro == 3) {
      return 'Automovil';
    }
    return '-';
  }
  getVeihcleId(user: Usuario): number {
    if (user.vehicle) {
      return user.vehicle.id;
    } else {
      return 0;
    }
  }
  getUserName(nro: number): string {
    if (nro == 1) {
      return 'Admin';
    }
    if (nro == 2) {
      return 'Cadete';
    }
    if (nro == 3) {
      return 'Cliente';
    }
    return '-';
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 10000,
    });
  }
  modifyUser(user: Usuario) {
    this.viajesServices.postUsuario(user).subscribe((resp) => {
      console.log(resp);
    });
  }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  template: '<span>Modificado con exito</span>',
})
export class SnackComponent {}
