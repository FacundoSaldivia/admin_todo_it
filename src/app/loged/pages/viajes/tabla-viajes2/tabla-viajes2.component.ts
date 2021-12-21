import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Input,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Viaje } from 'src/app/loged/models/travel';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ViajesService } from 'src/app/loged/services/viajes.service';
import { Usuario } from 'src/app/loged/models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data2Service } from 'src/app/loged/services/data2.service';

@Component({
  selector: 'app-tabla-viajes2',
  templateUrl: './tabla-viajes2.component.html',
  styleUrls: ['./tabla-viajes2.component.scss'],
})
export class TablaViajes2Component implements OnInit {
  displayedColumns: string[] = ['cliente', 'direccion', 'estado', 'editar'];
  @Input() dataSource;
  @Input() dataFull;

  constructor(public dialog: MatDialog, private dataService: Data2Service) {}
  @ViewChild(MatPaginator) paginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  identificarViaje(id: number) {
    this.dataFull.forEach((e: Viaje) => {
      if (e.id == id) {
        console.log(e);
        this.openDialog(e);
      }
    });
  }

  openDialog(viaje: Viaje): void {
    const dialogRef = this.dialog.open(DialogViaje, {
      width: '300px',
      data: viaje,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.notifyForChange(result.data);
    });
  }
  notifyForChange(viaje: Viaje) {
    this.dataService.viaje = viaje;
    this.dataService.notifyAboutChange();
  }
  ngOnInit(): void {}
}

@Component({
  selector: 'dialog-user-table',
  templateUrl: 'dialog-viajes/dialog-viaje.html',
  styleUrls: ['dialog-viajes/dialog-viaje.scss'],
})
export class DialogViaje implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Viaje,
    private viajesService: ViajesService,
    public dialogRef: MatDialogRef<DialogViaje>,
    private _snackBar: MatSnackBar
  ) {}

  cadetes: cadete[] = [];
  lastDto =
    this.data.travelEquipmentDTOs[this.data.travelEquipmentDTOs.length - 1];
  form: FormGroup = new FormGroup({
    estadoEnvio: new FormControl(this.data.lastStatusTravel),
    observaciones: new FormControl(this.lastDto.observation || ''),
    cadeteId: new FormControl(0),
    resigned: new FormControl(false),
  });

  selected: number = this.data.lastStatusTravel;
  selected2: boolean = false;

  submit(): void {
    console.log(this.form.value);
    this.buildTravel();
  }
  buildTravel(): void {
    this.viajesService
      .modificarViaje(
        this.data,
        this.form.value.cadeteId,
        this.form.value.estadoEnvio,
        this.form.value.observaciones,
        this.form.value.resigned
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.openSnackBar('Viaje modificado con exito', 'Ok', 'green');
          this.dialogRef.close({ data: res });
        },
        (error) => {
          console.log(error);
          this.openSnackBar('Ocurrio un error inesperado', 'Ok', 'red');
        }
      );
  }
  openSnackBar(message: string, action: string, color: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [color],
    });
  }

  getCadetes(): void {
    this.viajesService.getUsuarios().subscribe((res) => {
      res.forEach((e) => {
        if (e.rol.id == 2) {
          let aux: cadete = {
            name: e.fullName,
            id: e.id,
          };
          this.cadetes.push(aux);
        }
      });
    });
  }
  ngOnInit(): void {
    this.getCadetes();
  }
}
@Component({
  selector: 'snack-bar-component-example-snack',
  template: '<span>Modificado con exito</span>',
})
export class SnackComponent {}
interface cadete {
  name: string;
  id: number;
}
