import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  blogs: BlogPost[] = [];
  showAddForm = false;
  isLoading = true;
  newBlog: BlogPost = {
    fecha: '',
    tipoCaso: '',
    titulo: '',
    breveDescripcion: '',
    imagen: '',
    video: ''
  };

  tiposCaso = [
    'Derecho Penal',
    'Derecho Civil',
    'Derecho Laboral',
    'Derecho Comercial',
    'Derecho Familiar',
    'Derecho Administrativo',
    'Derecho Constitucional',
    'Otros'
  ];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    console.log('BlogManagementComponent inicializado');
    this.loadBlogs();
    this.setCurrentDate();
  }

  loadBlogs() {
    this.isLoading = true;
    console.log('Iniciando carga de blogs...');
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.blogs = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.isLoading = false;
        console.log('Blogs cargados en gestión:', this.blogs);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al cargar blogs:', error);
        alert('Error al cargar los blogs. Verifica que el servidor esté funcionando.');
      }
    });
  }

  setCurrentDate() {
    const today = new Date();
    this.newBlog.fecha = today.toISOString().split('T')[0];
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newBlog = {
      fecha: '',
      tipoCaso: '',
      titulo: '',
      breveDescripcion: '',
      imagen: '',
      video: ''
    };
    this.setCurrentDate();
  }

  addBlog() {
    if (this.newBlog.fecha && this.newBlog.tipoCaso && this.newBlog.titulo && this.newBlog.breveDescripcion) {
      const blogData = {
        ...this.newBlog,
        fecha: new Date(this.newBlog.fecha).toISOString()
      };
      
      console.log('Enviando datos de blog:', blogData);
      
      this.blogService.createBlog(blogData).subscribe({
        next: (response) => {
          console.log('Blog agregado exitosamente:', response);
          alert('Entrada del blog agregada exitosamente');
          this.loadBlogs();
          this.toggleAddForm();
        },
        error: (error) => {
          console.error('Error al agregar blog:', error);
          console.error('Detalles del error:', error.error);
          alert('Error al agregar la entrada del blog. Verifica los datos e intenta de nuevo.');
        }
      });
    } else {
      console.log('Faltan campos requeridos:', this.newBlog);
      alert('Por favor, completa todos los campos requeridos (marcados con *)');
    }
  }

  deleteBlog(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta entrada del blog?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: (response) => {
          console.log('Blog eliminado exitosamente:', response);
          alert('Entrada del blog eliminada exitosamente');
          this.loadBlogs();
        },
        error: (error) => {
          console.error('Error al eliminar blog:', error);
          alert('Error al eliminar la entrada del blog.');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
