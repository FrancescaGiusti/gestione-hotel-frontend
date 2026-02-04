import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Codice } from "../dto/codice";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(): boolean {
    if (this.authService.hasRole(Codice.ROLE_ADMIN)) {
      return true;
    }
      
    this.router.navigate(['/logged/camere']);
    return false;
  }
}

