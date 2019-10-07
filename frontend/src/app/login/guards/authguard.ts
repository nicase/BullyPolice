import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../login.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: LoginService,
  ) {
  }

  canActivate() {
    // console.log('AuthGuard::canActivate', this.authService.isAuthenticated());
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      console.log('asdgfds')
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
  }
}
