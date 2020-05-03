import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export interface RequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://localhost:3000/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';
  constructor(private http: HttpClient, private router: Router) {}
  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(this.TOKEN_KEY),
    });

    const requestOptions: RequestOptions = {
      headers: header,
      // params: new HttpParams()
    };
    return requestOptions;
  }

  login(loginData) {
    const url = `${this.BASE_URL}/login`;
    this.http.post<any>(url, loginData).subscribe((res) => {
      this.authenticate(res);
    });
  }
  register(user) {
    const url = `${this.BASE_URL}/register`;
    delete user.confirmPassword;
    this.http.post<any>(url, user).subscribe((res) => {
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
    url === null
      ? this.router.navigate(['/login'])
      : this.router.navigate([`${url}`]);
  }
}
