import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  searchTerm: string = '';
  selectedDate: string = '';
  selectedCaseType: string = '';

  // Datos dinámicos del blog desde la API
  blogPosts: BlogPost[] = [];
  isLoading: boolean = true;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.isLoading = true;
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.blogPosts = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.isLoading = false;
        console.log('Blogs cargados en la página:', this.blogPosts);
      },
      error: (error) => {
        console.error('Error al cargar blogs:', error);
        this.isLoading = false;
        // En caso de error, cargar datos de ejemplo
        this.loadDefaultBlogs();
      }
    });
  }

  loadDefaultBlogs() {
    // Datos de ejemplo para el blog (respaldo si no hay conexión con la API)
    this.blogPosts = [
      {
        id: 1,
        fecha: '2024-08-15',
        tipoCaso: 'Derecho Familiar',
        titulo: 'Disputa Familiar',
        breveDescripcion: 'Análisis completo sobre resolución de conflictos familiares y mediación legal.',
        imagen: '/assets/images/blog/family-law.jpg',
        esReciente: true
      },
      {
        id: 2,
        fecha: '2024-08-10',
        tipoCaso: 'Derecho Laboral',
        titulo: 'Nuevas Regulaciones Laborales',
        breveDescripcion: 'Cambios importantes en la legislación laboral que afectan empleadores y trabajadores.',
        imagen: '/assets/images/blog/labor-law.jpg'
      },
      {
        id: 3,
        fecha: '2024-08-05',
        tipoCaso: 'Derecho Inmobiliario',
        titulo: 'Contratos Inmobiliarios',
        breveDescripcion: 'Guía completa para la redacción y revisión de contratos de compraventa.',
        imagen: '/assets/images/blog/real-estate.jpg'
      }
    ];
  }

  caseTypes = [
    'Derecho Familiar',
    'Derecho Laboral', 
    'Derecho Inmobiliario',
    'Derecho Digital',
    'Derecho Comercial',
    'Derecho del Consumidor',
    'Derecho Penal',
    'Derecho Civil',
    'Derecho Constitucional'
  ];

  // Paginación
  currentPage = 1;
  postsPerPage = 6;

  get totalPages() {
    return Math.ceil(this.filteredPosts.length / this.postsPerPage);
  }

  get filteredPosts() {
    return this.blogPosts.filter(post => {
      const matchesSearch = post.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           post.breveDescripcion.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate = !this.selectedDate || post.fecha.includes(this.selectedDate);
      const matchesType = !this.selectedCaseType || post.tipoCaso === this.selectedCaseType;
      
      return matchesSearch && matchesDate && matchesType;
    });
  }

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    return this.filteredPosts.slice(start, end);
  }

  get pageNumbers(): number[] {
    const totalPages = this.totalPages;
    const pages: number[] = [];
    
    if (totalPages <= 7) {
      // Si hay 7 páginas o menos, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si hay más de 7 páginas, mostrar páginas inteligentemente
      const current = this.currentPage;
      
      // Siempre mostrar la primera página
      pages.push(1);
      
      if (current > 4) {
        pages.push(-1); // Indicador para "..."
      }
      
      // Mostrar páginas alrededor de la actual
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (current < totalPages - 3) {
        pages.push(-1); // Indicador para "..."
      }
      
      // Siempre mostrar la última página
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
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

  onSearch() {
    this.currentPage = 1;
  }

  onDateFilter() {
    this.currentPage = 1;
  }

  onTypeFilter() {
    this.currentPage = 1;
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      // Scroll al top del contenido principal
      document.querySelector('.blog-main')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  isEllipsis(page: number): boolean {
    return page === -1;
  }
}
