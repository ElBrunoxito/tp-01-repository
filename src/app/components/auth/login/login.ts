import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO } from '../../../model/User';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = {
    email: '',
    password: ''
  };
  router = inject(Router);
  storage = inject(StorageService)

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario procesado con éxito:', this.credentials);
      
      //LOGIN CON BACKEND
      const user: ResponseUserDTO = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  name: "Juan Pérez",
  username: "juanperez_dev",
  email: "juan.perez@example.com",
  work: "Ingeniero de Software",
  idChild: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
  nameChild: "Mateo Pérez",
  ageChild: 6,
  genderChild: "Masculino",
  levelTEA: 1
};

    this.storage.setUser(user)

      this.router.navigate(['/app']);
    }
  }

  onAccessibilityClick(): void {
    console.log('Cambio de contraste o configuración de apoyo visual solicitada.');
  }
}
