import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-section.component.html',
  styleUrl: './team-section.component.css'
})
export class TeamSectionComponent implements OnInit {
  currentSlide = 0;
  totalSlides = 5; // Total number of team members
  slidesToShow = 3; // Number of slides to show at once
  maxSlides = 0;
  slideWidth = 0;
  indicators: number[] = [];

  ngOnInit() {
    this.calculateSlides();
    this.updateSlideWidth();
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
