import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:3000/auth';
  
  constructor(private http:HttpClient) { 
  }

  register(user){
    const url = `${this.BASE_URL}/register`;
    delete user.confirmPassword;
    this.http.post(url, user).subscribe();
  }
}
