import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id?: number;
  fecha: string;
  tipoCaso: string;
  titulo: string;
  breveDescripcion: string;
  imagen?: string;
  video?: string;
  esReciente?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/blog';

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  getRecentBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/recent`);
  }

  createBlog(blog: BlogPost): Observable<any> {
    return this.http.post<any>(this.apiUrl, blog);
  }

  updateBlog(id: number, blog: BlogPost): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
