import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/users/login'; // 你的后端API基础URL

  constructor(private http: HttpClient) {}

  loginUser(credentials: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      responseType: 'text',
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return token != null; // 如果存在token，用户已登录
  }

  logout(): void {
    localStorage.removeItem('jwtToken'); // 删除存储的JWT Token
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
