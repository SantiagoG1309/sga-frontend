import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalService, Personal } from '../../services/personal.service';

@Component({
  selector: 'app-personal-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-management.component.html',
  styleUrls: ['./personal-management.component.css']
})
export class PersonalManagementComponent implements OnInit {
  personal: Personal[] = [];
  showAddForm = false;
  newPersonal: Personal = {
    nombre: '',
    cargo: '',
    especializacion: '',
    anosExperiencia: 0,
    foto: ''
  };

  constructor(private personalService: PersonalService) {}

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal() {
    this.personalService.getAllPersonal().subscribe(
      (data) => {
        this.personal = data;
        console.log('Personal cargado:', this.personal); // Para debug
      },
      (error) => {
        console.error('Error al cargar personal:', error);
      }
    );
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newPersonal = {
      nombre: '',
      cargo: '',
      especializacion: '',
      anosExperiencia: 0,
      foto: ''
    };
  }

  addPersonal() {
    if (this.newPersonal.nombre && this.newPersonal.cargo && this.newPersonal.especializacion && this.newPersonal.anosExperiencia) {
      // Asegurar que anosExperiencia sea un número
      const personalData = {
        ...this.newPersonal,
        anosExperiencia: Number(this.newPersonal.anosExperiencia)
      };
      
      console.log('Enviando datos:', personalData); // Para debug
      
      this.personalService.createPersonal(personalData).subscribe(
        (response) => {
          console.log('Personal agregado:', response);
          this.loadPersonal();
          this.toggleAddForm();
        },
        (error) => {
          console.error('Error al agregar personal:', error);
          console.error('Detalles del error:', error.error);
        }
      );
    } else {
      console.log('Faltan campos requeridos:', this.newPersonal);
    }
  }

  deletePersonal(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro del personal?')) {
      this.personalService.deletePersonal(id).subscribe(
        (response) => {
          console.log('Personal eliminado:', response);
          this.loadPersonal();
        },
        (error) => {
          console.error('Error al eliminar personal:', error);
        }
      );
    }
  }

  onImageError(event: any) {
    console.log('Error al cargar imagen:', event.target.src);
    // Ocultar la imagen y mostrar la inicial
    event.target.style.display = 'none';
  }
}
