import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor() { }


  test(){
    console.log("Richiamato metodo del service");
  }
}
