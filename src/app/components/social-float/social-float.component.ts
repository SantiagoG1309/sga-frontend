import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-float',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-float.component.html',
  styleUrls: ['./social-float.component.css']
})
export class SocialFloatComponent {
  socialNetworks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/pravdasaga',
      icon: 'fab fa-instagram',
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/pravdasaga',
      icon: 'fab fa-facebook-f',
      color: '#1877F2'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/573001234567',
      icon: 'fab fa-whatsapp',
      color: '#25D366'
    }
  ];

  openSocialNetwork(url: string): void {
    window.open(url, '_blank');
  }
}
