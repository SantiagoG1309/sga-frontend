import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sentences-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sentences-page.component.html',
  styleUrl: './sentences-page.component.css'
})
export class SentencesPageComponent {
  searchTerm = '';
  selectedType = '';
  currentPage = 1;
  sentencesPerPage = 6;

  sentences = [
    {
      id: 'T-123/2024',
      title: 'Acción de Tutela por Vulneración de Derechos Fundamentales',
      type: 'Derecho Constitucional',
      court: 'Corte Constitucional',
      date: 'Enero 2024',
      status: 'Favorable',
      description: 'Protección efectiva de derechos fundamentales en caso de despido discriminatorio por condición de salud.',
      impact: 'Precedente jurisprudencial para casos similares'
    },
    {
      id: 'RAD-456/2023',
      title: 'Nulidad y Restablecimiento del Derecho',
      type: 'Derecho Administrativo',
      court: 'Consejo de Estado',
      date: 'Diciembre 2023',
      status: 'Favorable',
      description: 'Anulación de acto administrativo por indebida motivación en proceso de contratación pública.',
      impact: 'Indemnización por $2.500 millones'
    },
    {
      id: 'EXP-789/2023',
      title: 'Proceso Ejecutivo Laboral',
      type: 'Derecho Laboral',
      court: 'Tribunal Superior de Bogotá',
      date: 'Noviembre 2023',
      status: 'Favorable',
      description: 'Reconocimiento de prestaciones sociales y indemnización por despido sin justa causa.',
      impact: 'Pago integral de acreencias laborales'
    },
    {
      id: 'RAD-321/2023',
      title: 'Acción de Cumplimiento',
      type: 'Derecho Administrativo',
      court: 'Tribunal Administrativo',
      date: 'Octubre 2023',
      status: 'Favorable',
      description: 'Cumplimiento de obligación legal por parte de entidad pública.',
      impact: 'Aplicación efectiva de normativa'
    },
    {
      id: 'EXP-654/2023',
      title: 'Proceso Ordinario Civil',
      type: 'Derecho Civil',
      court: 'Juzgado Civil',
      date: 'Septiembre 2023',
      status: 'Favorable',
      description: 'Resolución de conflicto contractual con indemnización de perjuicios.',
      impact: 'Reparación integral de daños'
    },
    {
      id: 'RAD-987/2023',
      title: 'Acción Popular',
      type: 'Derecho Colectivo',
      court: 'Tribunal Administrativo',
      date: 'Agosto 2023',
      status: 'Favorable',
      description: 'Protección de derechos colectivos en materia ambiental.',
      impact: 'Medidas de protección ambiental'
    }
  ];

  statistics = [
    { icon: 'fas fa-shield-alt', value: '98%', label: 'Casos Exitosos', color: 'success' },
    { icon: 'fas fa-gavel', value: '300+', label: 'Casos Resueltos', color: 'primary' },
    { icon: 'fas fa-chart-line', value: '$30B+', label: 'En Indemnizaciones', color: 'warning' },
    { icon: 'fas fa-calendar-alt', value: '15+', label: 'Años de Trayectoria', color: 'info' }
  ];

  get filteredSentences() {
    let filtered = this.sentences;
    
    if (this.searchTerm) {
      filtered = filtered.filter(sentence => 
        sentence.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sentence.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sentence.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    if (this.selectedType) {
      filtered = filtered.filter(sentence => sentence.type === this.selectedType);
    }
    
    return filtered;
  }

  get paginatedSentences() {
    const startIndex = (this.currentPage - 1) * this.sentencesPerPage;
    return this.filteredSentences.slice(startIndex, startIndex + this.sentencesPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredSentences.length / this.sentencesPerPage);
  }

  get sentenceTypes() {
    return [...new Set(this.sentences.map(sentence => sentence.type))];
  }

  onSearch() {
    this.currentPage = 1;
  }

  onFilterChange() {
    this.currentPage = 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedType = '';
    this.currentPage = 1;
  }
}
