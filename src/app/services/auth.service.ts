import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RuoloDto } from '../dto/ruolo-dto';
import { Codice } from '../dto/codice';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logoutTimer: any;

  constructor(private router: Router) { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.startAutoLogout(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
    clearTimeout(this.logoutTimer);
  }

  private getTokenPayload(token: string): any | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

   getTokenExpiration(token: string): number | null {
    const payload = this.getTokenPayload(token);
    return payload?.exp ?? null;
  }

  isTokenExpired(token: string): boolean {
    const exp = this.getTokenExpiration(token);
    if (!exp) return true;
    return (Date.now()/1000) > exp;
  }

  startAutoLogout(token: string) {
    const exp = this.getTokenExpiration(token);
    if (!exp) return;

    const timeout = (exp * 1000) - Date.now();

    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, timeout);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  getUserId(): number | null {
     const token = this.getToken();
     console.log('TOKEN:', token);

    if (!token) return null;

    const payload = this.getTokenPayload(token);
    console.log('PAYLOAD JWT:', payload);
    return payload.userId ?? null;
  }

  getUserRoles(): Codice[] {
    const token = this.getToken();
    if (!token) {
      return [];
    }

    const payload = this.getTokenPayload(token);
  
    return payload?.role?.map((r: any) => r.authority)?? [];
  }

  hasRole(role: Codice): boolean {
    return this.getUserRoles().includes(role);
  }

  hasAnyRole(roles: Codice[]): boolean {
    const userRoles = this.getUserRoles();
    return roles.some(r => userRoles.includes(r));
  }
}
