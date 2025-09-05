import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalService, Personal } from '../../services/personal.service';

@Component({
  selector: 'app-team-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-section.component.html',
  styleUrl: './team-section.component.css'
})
export class TeamSectionComponent implements OnInit {
  currentSlide = 0;
  totalSlides = 0;
  slidesToShow = 3;
  maxSlides = 0;
  slideWidth = 0;
  indicators: number[] = [];
  personal: Personal[] = [];

  constructor(private personalService: PersonalService) {}

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal() {
    this.personalService.getAllPersonal().subscribe(
      (data) => {
        this.personal = data;
        this.totalSlides = this.personal.length;
        this.calculateSlides();
        this.updateSlideWidth();
      },
      (error) => {
        console.error('Error al cargar personal:', error);
        // En caso de error, usar datos por defecto
        this.totalSlides = 0;
        this.calculateSlides();
        this.updateSlideWidth();
      }
    );
  }

  calculateSlides() {
    this.maxSlides = Math.max(0, this.totalSlides - this.slidesToShow);
    this.indicators = Array(this.maxSlides + 1).fill(0).map((_, i) => i);
  }

  updateSlideWidth() {
    this.slideWidth = 100 / this.slidesToShow;
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
  }
}
