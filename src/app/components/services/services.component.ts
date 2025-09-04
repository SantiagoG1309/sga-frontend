import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  activeModal: number | null = null;

  openModal(serviceId: number): void {
    this.activeModal = serviceId;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.activeModal = null;
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'auto';
  }

  // Close modal when pressing Escape key
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.activeModal !== null) {
      this.closeModal();
    }
  }
}
