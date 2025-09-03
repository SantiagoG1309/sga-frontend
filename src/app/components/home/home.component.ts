import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentSlide = 0;
  totalSlides = 6;

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % (this.totalSlides - 2);
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? (this.totalSlides - 3) : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  getSlideArray(): number[] {
    return Array(this.totalSlides - 2).fill(0).map((_, i) => i);
  }
}