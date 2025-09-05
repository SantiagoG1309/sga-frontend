import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legal-cases',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './legal-cases.component.html',
  styleUrl: './legal-cases.component.css'
})
export class LegalCasesComponent {
  statistics = [
    { icon: 'fas fa-shield-alt', value: '98%', label: 'Casos Exitosos', color: 'success' },
    { icon: 'fas fa-gavel', value: '300+', label: 'Casos Resueltos', color: 'primary' },
    { icon: 'fas fa-chart-line', value: '$30B+', label: 'En Indemnizaciones', color: 'warning' },
    { icon: 'fas fa-calendar-alt', value: '15+', label: 'Años de Trayectoria', color: 'info' }
  ];

  // Solo las últimas 3 sentencias para preview
  recentSentences = [
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
    }
  ];
}
