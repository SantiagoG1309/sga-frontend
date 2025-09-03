import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Case {
  id?: number;
  title: string;
  description: string;
  client: {
    name: string;
    email: string;
    phone?: string;
  };
  status: 'activo' | 'cerrado' | 'pendiente';
  assignedLawyer?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = `${environment.apiUrl}/api/cases`;

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      })
    };
  }

  getCases(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHttpOptions());
  }

  getCaseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  createCase(caseData: Case): Observable<any> {
    return this.http.post<any>(this.apiUrl, caseData, this.getHttpOptions());
  }

  updateCase(id: number, caseData: Partial<Case>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, caseData, this.getHttpOptions());
  }

  deleteCase(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }
}
