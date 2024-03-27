import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn():boolean{

    if(localStorage.getItem('token') == 'undefined'){
      return false;
    }

    return !!localStorage.getItem('token');
  }
}
