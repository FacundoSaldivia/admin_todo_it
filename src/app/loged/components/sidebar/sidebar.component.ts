import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  cerrarSesion(): void {
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogCerrarSesion);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  showFiller = true;
}
@Component({
  selector: 'dialog-content-example-dialog',
  template:
    '<div class="container"><h1>Seguro que desea cerrar sesion?</h1><button (click)="cerrarSesion()" mat-button color="accent" mat-dialog-close >Estoy seguro</button></div>',
  styles: ['.container{display:grid; justify-content: center }'],
})
export class DialogCerrarSesion {
  constructor(private router: Router) {}
  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
