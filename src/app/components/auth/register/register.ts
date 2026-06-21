import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";
import { LoginDTO } from '../../../model/User';
import { AuthService } from '../../../service/auth-service';

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
  auth = inject(AuthService)
  router = inject(Router);

  /**
   * Ejecuta la autenticación cuando el formulario es válido
   * @param form Instancia del formulario local
   */
  onSubmit(form: NgForm): void {
    if (form.valid) {
      var data:LoginDTO = {
        username: this.credentials.email,
        password: this.credentials.password
      }
      
      this.auth.register(data).subscribe({
        next: (res)=>{
          this.router.navigate(['/login']);
        },
        error: (err)=>{
          console.error(err.status + ": " + err.message)
          if(err.status == 403){
            alert("Ya existe un usuario con ese correo")
          }
        }
      })
    }
  }

  /**
   * Disparador para las adaptaciones de accesibilidad visual y cognitiva (TEACCH)
   */
  onAccessibilityClick(): void {
    console.log('Menú de accesibilidad activado.');
  }
}
