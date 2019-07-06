import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  sendToken(token: string) {
    localStorage.setItem("currentUser", token)
  }

  getToken() {
    return localStorage.getItem("currentUser");
  }

  isLoggednIn() {
    return this.getToken() !== null && this.getToken()=="pavan";
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }
}
