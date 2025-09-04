import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  // Valores actuales de los contadores
  experienceYears = 0;
  successfulCases = 0;
  successRate = 0;

  // Valores finales
  private readonly finalExperience = 15;
  private readonly finalCases = 500;
  private readonly finalRate = 98;

  private animationInterval: any;
  private hasAnimated = false;

  ngOnInit() {
    // Observador para detectar cuando el elemento es visible
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.startCountAnimation();
          this.hasAnimated = true;
        }
      });
    }, {
      threshold: 0.5 // Se activa cuando el 50% del elemento es visible
    });

    // Observar el elemento de estadísticas
    setTimeout(() => {
      const statsElement = document.querySelector('.hero-stats');
      if (statsElement) {
        observer.observe(statsElement);
      }
    }, 100);
  }

  private startCountAnimation() {
    const duration = 2000; // 2 segundos
    const steps = 60; // 60 pasos para animación suave
    const stepDuration = duration / steps;

    let currentStep = 0;

    this.animationInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      // Usar función de easing para animación más suave
      const easedProgress = this.easeOutQuart(progress);

      // Calcular valores actuales
      this.experienceYears = Math.floor(this.finalExperience * easedProgress);
      this.successfulCases = Math.floor(this.finalCases * easedProgress);
      this.successRate = Math.floor(this.finalRate * easedProgress);

      // Detener cuando llegue al final
      if (currentStep >= steps) {
        this.experienceYears = this.finalExperience;
        this.successfulCases = this.finalCases;
        this.successRate = this.finalRate;
        clearInterval(this.animationInterval);
      }
    }, stepDuration);
  }

  // Función de easing para animación más suave
  private easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }

  // Método para reiniciar la animación (útil para testing)
  restartAnimation() {
    this.hasAnimated = false;
    this.experienceYears = 0;
    this.successfulCases = 0;
    this.successRate = 0;
    
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    
    setTimeout(() => {
      this.startCountAnimation();
    }, 100);
  }
}
