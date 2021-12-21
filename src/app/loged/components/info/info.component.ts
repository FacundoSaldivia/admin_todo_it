import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() data: string[];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogInfo, {
      width: '650px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
@Component({
  selector: 'dialog-user-table',
  templateUrl: 'dialog-info/dialog-info.html',
  styleUrls: ['dialog-info/dialog-info.scss'],
})
export class DialogInfo implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogInfo>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
  close(): void {
    this.dialogRef.close();
  }
}
