import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: []
})
export class AdminPanelComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      alert('Acceso denegado: solo los administradores pueden ver este panel.');
      this.router.navigate(['/home']);
    } else {
      this.userName = user.name;
    }
  }
}
