import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:3000/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';
  constructor(private http:HttpClient) { }
  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }
  register(user){

    const url = `${this.BASE_URL}/register`;
    delete user.confirmPassword;
    this.http.post<any>(url, user).subscribe(res => {
         localStorage.setItem(this.TOKEN_KEY, res.token);
         localStorage.setItem(this.NAME_KEY, res.firstName);
    });
  }
}
