import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { StorageService } from '../../../service/storage-service';
import { LoginDTO, ResponseUserDTO } from '../../../model/User';
import { AuthService } from '../../../service/auth-service';
import da from '@angular/common/locales/da';

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
  auth = inject(AuthService)

  onSubmit(form: NgForm): void {
    if (form.valid) {
      var data:LoginDTO = {
        username: this.credentials.email,
        password: this.credentials.password
      }
      
      this.auth.login(data).subscribe({
        next: (res)=>{
          this.router.navigate(['/app']);
          this.storage.setUser(res)
          this.storage.dropEmail()
        },
        error: (err)=>{
          console.error(err.status + ": " + err.message)
          if(err.status == 403){
            alert("Usuario o contraseña incorrectos")
          }
        }
      })
    }
  }

  onAccessibilityClick(): void {
    console.log('Cambio de contraste o configuración de apoyo visual solicitada.');
  }
}
