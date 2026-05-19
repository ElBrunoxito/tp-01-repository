import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  credentials = {
    email: '',
    password: ''
  };

  /**
   * Ejecuta la autenticación cuando el formulario es válido
   * @param form Instancia del formulario local
   */
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Datos listos para enviar al servicio Auth:', this.credentials);
      // Aquí amarras tu HTTP Client Service
    }
  }

  /**
   * Disparador para las adaptaciones de accesibilidad visual y cognitiva (TEACCH)
   */
  onAccessibilityClick(): void {
    console.log('Menú de accesibilidad activado.');
  }
}
