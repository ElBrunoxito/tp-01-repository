import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuper-contrasena-nueva',
  imports: [FormsModule],
  templateUrl: './recuper-contrasena-nueva.html',
  styleUrl: './recuper-contrasena-nueva.css',
})
export class RecuperContrasenaNueva {
  // Banderas de control de interfaz para alternar 'text' / 'password'
  showNewPassword = false;
  showConfirmPassword = false;
  router = inject(Router);
  // Objeto de enlace bidireccional para ngModel
  passwords = {
    new: '',
    confirm: ''
  };

  /**
   * Procesa el cambio de clave cuando las validaciones son correctas
   * @param form Instancia del formulario local NgForm
   */
  onResetPassword(form: NgForm): void {
    if (form.valid && this.passwords.new === this.passwords.confirm) {
      console.log('Solicitud enviada con éxito. Nueva clave lista para actualizar.');
      // Aquí invocas tu servicio REST (ej: AuthService.updatePassword(this.passwords.new))
      this.router.navigate(['/login']);
    }
  }

  /**
   * Intercepta la navegación para controlarla por enrutador u operaciones previas
   * @param event Evento del ratón
   */
  goToLogin(event: Event): void {
    console.log('Redirigiendo al Login principal...');
  }
}
