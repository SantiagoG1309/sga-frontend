import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent {
  searchTerm: string = '';
  selectedDate: string = '';
  selectedCaseType: string = '';

  // Datos de ejemplo para el blog
  blogPosts = [
    {
      id: 1,
      title: 'Disputa Familiar',
      description: 'Análisis completo sobre resolución de conflictos familiares y mediación legal.',
      image: '/assets/images/blog/family-law.jpg',
      date: '2024-08-15',
      category: 'Derecho Familiar',
      featured: true
    },
    {
      id: 2,
      title: 'Nuevas Regulaciones Laborales',
      description: 'Cambios importantes en la legislación laboral que afectan empleadores y trabajadores.',
      image: '/assets/images/blog/labor-law.jpg',
      date: '2024-08-10',
      category: 'Derecho Laboral'
    },
    {
      id: 3,
      title: 'Contratos Inmobiliarios',
      description: 'Guía completa para la redacción y revisión de contratos de compraventa.',
      image: '/assets/images/blog/real-estate.jpg',
      date: '2024-08-05',
      category: 'Derecho Inmobiliario'
    },
    {
      id: 4,
      title: 'Protección de Datos',
      description: 'Nuevas normativas sobre protección de datos personales y privacidad.',
      image: '/assets/images/blog/data-protection.jpg',
      date: '2024-07-30',
      category: 'Derecho Digital'
    },
    {
      id: 5,
      title: 'Mediación Comercial',
      description: 'Beneficios de la mediación en conflictos comerciales empresariales.',
      image: '/assets/images/blog/commercial.jpg',
      date: '2024-07-25',
      category: 'Derecho Comercial'
    },
    {
      id: 6,
      title: 'Derechos del Consumidor',
      description: 'Actualizaciones importantes en la protección de derechos del consumidor.',
      image: '/assets/images/blog/consumer.jpg',
      date: '2024-07-20',
      category: 'Derecho del Consumidor'
    }
  ];

  caseTypes = [
    'Derecho Familiar',
    'Derecho Laboral', 
    'Derecho Inmobiliario',
    'Derecho Digital',
    'Derecho Comercial',
    'Derecho del Consumidor'
  ];

  // Paginación
  currentPage = 1;
  postsPerPage = 6;
  totalPages = Math.ceil(this.blogPosts.length / this.postsPerPage);

  get featuredPost() {
    return this.blogPosts.find(post => post.featured);
  }

  get regularPosts() {
    return this.blogPosts.filter(post => !post.featured);
  }

  get filteredPosts() {
    return this.regularPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           post.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDate = !this.selectedDate || post.date.includes(this.selectedDate);
      const matchesType = !this.selectedCaseType || post.category === this.selectedCaseType;
      
      return matchesSearch && matchesDate && matchesType;
    });
  }

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    return this.filteredPosts.slice(start, end);
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
    this.currentPage = page;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
