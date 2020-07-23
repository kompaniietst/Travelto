import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.auth.currUser
      .subscribe(x => {
        if (!x) {
          this.router.navigate(['/'])
          return false;
        }
      })

    const expectedRoles = route.data.expectedRole;
    const currUserRole = this.auth.getCurrUser().role;

    let permittedRole = expectedRoles.some((role: string) => currUserRole == role);

    if (!permittedRole) {
      this.router.navigate(['/'])
      return false;
    }

    return true;
  }
}
