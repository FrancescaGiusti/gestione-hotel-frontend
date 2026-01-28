import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceLoginService } from '../../services/service-login.service';
import { Router } from '@angular/router';

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
    private readonly router: Router
  ){}

  login(loginForm: any){
    console.log(loginForm);
    this.loginService.postLogin(loginForm.value)
       .subscribe({
    next: (token: string) => {
      console.log('JWT ricevuto:', token);
      localStorage.removeItem(token);
      localStorage.setItem('token', token); 

      this.router.navigate(['/logged/camere']);
    },
    error: (err) => console.error(err)
      });
  }
}
