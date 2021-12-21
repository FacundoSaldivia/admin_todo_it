import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard2 implements CanActivate {
  constructor(private router: Router) {}
  usuarioId = localStorage.getItem('adminId')?.split(' ')[0].replace('"', '');

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.usuarioId) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
