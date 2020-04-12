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
  constructor(private http: HttpClient, private router: Router) { }
  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(loginData) {
    const url = `${this.BASE_URL}/login`;
    this.http.post<any>(url, loginData).subscribe(res => {
      this.authenticate(res);
    });
  }
  register(user){

    const url = `${this.BASE_URL}/register`;
    delete user.confirmPassword;
    this.http.post<any>(url, user).subscribe(res => {
        this.authenticate(res, '/login');

    });
  }
  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  authenticate(res, url = null) {
    const authResponse = res;

    if (!authResponse) {
      return;
    }

    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.NAME_KEY, authResponse.firstName);
    url === null ? this.router.navigate(['/login']) : this.router.navigate([`${url}`]);
  }
}
