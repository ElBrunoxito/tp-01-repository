import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
// Modelo de datos bidireccional
  credentials = {
    email: '',
    password: ''
  };
  router = inject(Router);

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario procesado con éxito:', this.credentials);
      this.router.navigate(['/app']);
    }
  }

  onAccessibilityClick(): void {
    console.log('Cambio de contraste o configuración de apoyo visual solicitada.');
  }
}
