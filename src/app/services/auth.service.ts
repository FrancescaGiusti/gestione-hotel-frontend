import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

    const timeout = exp - Date.now();

    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, timeout);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login']);
  }
}
