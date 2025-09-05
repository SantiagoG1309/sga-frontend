import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-section.component.html',
  styleUrl: './blog-section.component.css'
})
export class BlogSectionComponent implements OnInit {
  recentBlogs: BlogPost[] = [];
  allBlogs: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.allBlogs = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.recentBlogs = this.allBlogs.slice(0, 3); // Los 3 más recientes
        console.log('Blogs cargados en la sección:', this.allBlogs);
      },
      error: (error) => {
        console.error('Error al cargar blogs:', error);
        // En caso de error, mantener arrays vacíos para mostrar contenido por defecto
        this.allBlogs = [];
        this.recentBlogs = [];
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  }
}
