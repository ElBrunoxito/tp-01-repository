import th from '@angular/common/locales/th';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage-service';
import { AuthService } from '../../../service/auth-service';
import { LoginDTO, UpdateUserDTO } from '../../../model/User';

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
  storage = inject(StorageService)
  auth = inject(AuthService)
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
      const data: LoginDTO = {
        username: this.storage.getEmail(),
        password: this.passwords.confirm
      }

      this.auth.change(data).subscribe({
        next: (res)=>{
          this.storage.dropEmail()
          this.router.navigate(['/login']);
        },
        error: (err)=>{
          if(err.status == 404){
            alert(err.error.message)
          }
        }
      })
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
