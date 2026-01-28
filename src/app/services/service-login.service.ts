import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  constructor(private httpClient: HttpClient) { }

  postLogin(body: any): Observable<string>{
    return this.httpClient.post(
      'http://localhost:8080/auth/login',
      body,
      { responseType: 'text' }
    );
  }
}
