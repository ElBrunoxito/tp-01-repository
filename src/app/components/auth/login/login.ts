import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
// Modelo de datos bidireccional
  credentials = {
    email: '',
    password: ''
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario procesado con éxito:', this.credentials);
      console
    }
  }

  onAccessibilityClick(): void {
    console.log('Cambio de contraste o configuración de apoyo visual solicitada.');
  }
}
