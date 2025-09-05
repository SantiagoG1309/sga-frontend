import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Ajusta la URL si tu backend usa otro puerto/ruta

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    // Obtener el usuario autenticado desde localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role, user });
  }
}
