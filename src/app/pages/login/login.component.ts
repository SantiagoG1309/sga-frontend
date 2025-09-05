

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {
    const regError = localStorage.getItem('registerError');
    if (regError) {
      this.errorMsg = regError;
      localStorage.removeItem('registerError');
    }
  }

  onSubmit() {
    this.errorMsg = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        const user = res.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        if (user?.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          alert('¡Login exitoso!');
        }
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}
