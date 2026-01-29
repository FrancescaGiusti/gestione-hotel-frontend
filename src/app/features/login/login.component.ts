import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceLoginService } from '../../services/service-login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(
    private readonly loginService: ServiceLoginService,
    private authService: AuthService,
    private readonly router: Router
  ){}

   login(loginForm: any) {
    this.loginService.postLogin(loginForm.value).subscribe({
      next: (token: string) => {
        this.authService.saveToken(token);
        this.router.navigateByUrl('/logged/hotel');
      },
      error: () => alert('Credenziali non valide')
    });
  }
}
