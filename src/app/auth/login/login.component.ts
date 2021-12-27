import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submit(): void {
    this.login();
  }
  login(): void {
    this.loginService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        (res) => {
          if (res.rol.id == 1) {
            localStorage.setItem('adminId', JSON.stringify(res.id));
            this.router.navigate(['/dash/overview']);
            this.openSnackBar('Logeado exitosamente', 'green');
          } else {
            this.openSnackBar('Credenciales no validas', 'red');
          }
        },
        (error) => {
          console.log(error);
          this.openSnackBar('Credenciales no validas', 'red');
        }
      );
  }

  logintButton(): void {
    this.form.value.email = 'administrador@gmail.com';
    this.form.value.password = '123456';
    this.login();
  }
  openSnackBar(message: string, color: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2000,
      panelClass: [color],
    });
  }
}
