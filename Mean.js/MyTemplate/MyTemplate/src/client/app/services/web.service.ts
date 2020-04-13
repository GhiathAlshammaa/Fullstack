import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from "../auth/auth.service";
@Injectable({
  providedIn: 'root'
})
export class WebService {
  BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  getUser() {
    console.log("get User Test!");
    return this.http.get<any>(this.BASE_URL + 'users/me', this.auth.tokenHeader as any).map(x => x);
  }
  saveUser(userData) {
    return this.http.post<any>(this.BASE_URL + 'users/me', userData, this.auth.tokenHeader as any).map(x => x);
  }
}
