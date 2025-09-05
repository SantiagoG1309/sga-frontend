import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personal {
  id?: number;
  nombre: string;
  cargo: string;
  especializacion: string;
  anosExperiencia: number;
  foto?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = 'http://localhost:3000/api/personal';

  constructor(private http: HttpClient) { }

  getAllPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrl);
  }

  createPersonal(personal: Personal): Observable<any> {
    return this.http.post<any>(this.apiUrl, personal);
  }

  updatePersonal(id: number, personal: Personal): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, personal);
  }

  deletePersonal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
