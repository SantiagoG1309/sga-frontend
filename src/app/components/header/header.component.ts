import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  currentRoute = '';
  scrollY = 0;
  isHovered = false;

  constructor(private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('user');
    this.isAdmin = localStorage.getItem('role') === 'admin';
    this.router.events.subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('user');
      this.isAdmin = localStorage.getItem('role') === 'admin';
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  ngOnInit() {
    // Track current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
    // Set initial route
    this.currentRoute = this.router.url;
  }

  get isHomePage(): boolean {
    return this.currentRoute === '/' || this.currentRoute === '/home';
  }

  get blurIntensity(): number {
    if (this.isHovered) return 0;
    // Aumenta el blur gradualmente con el scroll, máximo 20px
    const maxBlur = 20;
    const scrollThreshold = 200; // Después de 200px de scroll, blur máximo
    const blurValue = Math.min((this.scrollY / scrollThreshold) * maxBlur, maxBlur);
    return blurValue;
  }

  get backgroundOpacity(): number {
    if (this.isHovered) return 1;
    // Reduce la opacidad gradualmente con el scroll, mínimo 0.6
    const minOpacity = 0.6;
    const scrollThreshold = 200;
    const opacityReduction = (this.scrollY / scrollThreshold) * (1 - minOpacity);
    return Math.max(1 - opacityReduction, minOpacity);
  }

  get dynamicBackground(): string {
    if (this.isHovered) {
      return 'linear-gradient(135deg, #024A70 0%, #1a365d 50%, #024A70 100%)';
    }
    const opacity = this.backgroundOpacity;
    return `linear-gradient(135deg, rgba(2, 74, 112, ${opacity}) 0%, rgba(26, 54, 93, ${opacity}) 50%, rgba(2, 74, 112, ${opacity}) 100%)`;
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  this.isLoggedIn = false;
  this.isAdmin = false;
  this.router.navigate(['/login']);
  }

  navigateToSection(sectionId: string) {
    this.closeMobileMenu();
    // If we're not on home page, navigate to home first
    if (this.router.url !== '/home' && this.router.url !== '/') {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100);
      });
    } else {
      // Already on home page, just scroll
      this.scrollToSection(sectionId);
    }
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
