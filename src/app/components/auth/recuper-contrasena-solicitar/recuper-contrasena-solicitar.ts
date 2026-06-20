import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage-service';
import st from '@angular/common/locales/st';
import { CodeDTO } from '../../../model/User';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-recuper-contrasena-solicitar',
  imports: [FormsModule],
  templateUrl: './recuper-contrasena-solicitar.html',
  styleUrl: './recuper-contrasena-solicitar.css',
})
export class RecuperContrasenaSolicitar {
  emailAddress: string = '';

  router = inject(Router);
  storage = inject(StorageService)
  auth = inject(AuthService)
  /**
   * Ejecuta la petición para despachar el token de restauración de password
   * @param form Instancia del formulario local NgForm
   */
  onSendCode(form: NgForm): void {
    if (form.valid) {
      const data: CodeDTO =  {
        username: this.emailAddress
      }
      this.auth.sendCode(data).subscribe({
        next: (res)=>{
          this.storage.setEmail(this.emailAddress)
          this.router.navigate(['/recuperar-contrasena/confirmar']);
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
   * Redirección programática o control manual del evento volver
   * @param event Instancia del evento del click del ratón
   */
  goToLogin(event: Event): void {
    // Si manejas enrutador nativo, puedes implementar inject(Router).navigate(['/login'])
    console.log('Navegando de vuelta a la pantalla de Login...');
  }
}
