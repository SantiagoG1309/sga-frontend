import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  constructor() { }

  // Datos de ejemplo para las noticias y artículos
  blogPosts = [
    {
      id: 1,
      title: 'Disputa Familiar',
      description: 'Análisis de casos recientes en derecho familiar y sus implicaciones legales.',
      image: 'assets/blog/familia.jpg',
      category: 'Derecho Familiar',
      date: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      title: 'Nueva Legislación Comercial',
      description: 'Cambios importantes en la legislación comercial colombiana que afectan a las empresas.',
      image: 'assets/blog/comercial.jpg',
      category: 'Derecho Comercial',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Sentencia Penal Destacada',
      description: 'Análisis de una sentencia penal reciente que establece nuevos precedentes.',
      image: 'assets/blog/penal.jpg',
      category: 'Derecho Penal',
      date: '2024-01-08'
    },
    {
      id: 4,
      title: 'Derechos Laborales 2024',
      description: 'Actualización sobre los derechos laborales vigentes en Colombia.',
      image: 'assets/blog/laboral.jpg',
      category: 'Derecho Laboral',
      date: '2024-01-05'
    },
    {
      id: 5,
      title: 'Reforma Constitucional',
      description: 'Impacto de las recientes reformas constitucionales en el sistema jurídico.',
      image: 'assets/blog/constitucional.jpg',
      category: 'Derecho Constitucional',
      date: '2024-01-03'
    },
    {
      id: 6,
      title: 'Casos de Responsabilidad Civil',
      description: 'Estudio de casos emblemáticos en responsabilidad civil y sus enseñanzas.',
      image: 'assets/blog/civil.jpg',
      category: 'Derecho Civil',
      date: '2024-01-01'
    }
  ];

  searchTerm = '';
  selectedCategory = '';
  selectedDate = '';

  get filteredPosts() {
    return this.blogPosts.filter(post => {
      const matchesSearch = !this.searchTerm || 
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || post.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  get featuredPost() {
    return this.blogPosts.find(post => post.featured);
  }

  get regularPosts() {
    return this.filteredPosts.filter(post => !post.featured);
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
  }

  onCategoryFilter(category: string) {
    this.selectedCategory = category;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedDate = '';
  }
}
