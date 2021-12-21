import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ViajesService } from '../../services/viajes.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-list-cadetes',
  templateUrl: './list-cadetes.component.html',
  styleUrls: ['./list-cadetes.component.scss'],
})
export class ListCadetesComponent implements OnInit {
  constructor(private viajesService: ViajesService, public dialog: MatDialog) {}
  cadetes: Usuario[] = [];
  ngOnInit(): void {
    this.getCadetes();
  }

  getCadetes(): void {
    this.viajesService.getUsuarios().subscribe((res) => {
      res.forEach((e) => {
        if (e.rol.id == 2 && e.isAccepted == true && e.isDeleted == false) {
          this.cadetes.push(e);
          console.log(e);
        }
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogListaUsers, {
      width: '250px',
      data: this.cadetes,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
@Component({
  selector: 'dialog-user-table',
  templateUrl: 'dialog-lista-users/dialog-lista-user.html',
  styleUrls: ['dialog-lista-users/dialog-lista-user.scss'],
})
export class DialogListaUsers implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Usuario[]) {}

  submit(): void {}
  ngOnInit(): void {}
}
