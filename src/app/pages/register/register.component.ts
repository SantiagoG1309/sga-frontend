import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: []
})

export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'subadmin';
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      localStorage.setItem('registerError', 'No Se Puede Acceder A Este Recurso En Este Momento.');
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    this.authService.register(this.name, this.email, this.password, this.role).subscribe({
      next: (res) => {
        this.successMsg = '¡Usuario registrado exitosamente!';
        this.name = '';
        this.email = '';
        this.password = '';
        this.role = 'subadmin';
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error al registrar usuario';
      }
    });
  }
}
