import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuper-contrasena-solicitar',
  imports: [FormsModule],
  templateUrl: './recuper-contrasena-solicitar.html',
  styleUrl: './recuper-contrasena-solicitar.css',
})
export class RecuperContrasenaSolicitar {
  emailAddress: string = '';

  router = inject(Router);
  /**
   * Ejecuta la petición para despachar el token de restauración de password
   * @param form Instancia del formulario local NgForm
   */
  onSendCode(form: NgForm): void {
    if (form.valid) {
      console.log('Enviando código de recuperación al correo:', this.emailAddress);
      // Aquí se invoca el método HTTP del servicio de control de credenciales
      this.router.navigate(['/recuperar-contrasena/confirmar']);
    }
  }

  /**
   * Redirección programática o control manual del evento volver
   * @param event Instancia del evento del click del ratón
   */
  goToLogin(event: Event): void {
    // Si manejas enrutador nativo, puedes implementar inject(Router).navigate(['/login'])
    console.log('Navegando de vuelta a la pantalla de Login...');
  }
}
