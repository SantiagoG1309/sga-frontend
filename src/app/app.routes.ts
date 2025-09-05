import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'about', loadComponent: () => import('./components/about-us/about-us.component').then(m => m.AboutUsComponent) },
  { path: 'services', loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent) },
  { path: 'team', loadComponent: () => import('./components/team-section/team-section.component').then(m => m.TeamSectionComponent) },
  { path: 'cases', loadComponent: () => import('./components/legal-cases/legal-cases.component').then(m => m.LegalCasesComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog-page/blog-page.component').then(m => m.BlogPageComponent) },
  { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'admin', loadComponent: () => import('./pages/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: '**', redirectTo: '/home' }
];
