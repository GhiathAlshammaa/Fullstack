import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:3000/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';
  constructor(private http:HttpClient, private router: Router) { }
  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  register(user){

    const url = `${this.BASE_URL}/register`;
    delete user.confirmPassword;
    this.http.post<any>(url, user).subscribe(res => {
        
        var authResponse = res;

        if(!authResponse)
          return

         localStorage.setItem(this.TOKEN_KEY, authResponse.token);
         localStorage.setItem(this.NAME_KEY, authResponse.firstName);
         this.router.navigate(['/register']);

    });
  }
  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
