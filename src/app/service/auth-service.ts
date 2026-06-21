import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CodeDTO, LoginDTO, ResponseUserDTO, UpdateUserDTO } from '../model/User';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient)
    constructor (private router: Router){}
    private readonly baseUrl = "http://localhost:8080/auth"

    getById(idUser:any){
      return this.http.get<ResponseUserDTO>(`${this.baseUrl}/${idUser}`)
    }
    login(data:LoginDTO) {
      return this.http.post<ResponseUserDTO>(`${this.baseUrl}/login`,data)
    }
    register(data:LoginDTO){
      return this.http.post<ResponseUserDTO>(`${this.baseUrl}/register`,data)
    }

    update(idUser:any, data:UpdateUserDTO){
      return this.http.put<ResponseUserDTO>(`${this.baseUrl}/${idUser}`,data)
    }

    sendCode(data:CodeDTO){
      return this.http.post<any>(`${this.baseUrl}/sendCode`,data)
    }

    validateCode(data:CodeDTO){
      return this.http.post<any>(`${this.baseUrl}/validateCode`,data)
    }
    change(data:LoginDTO){
      return this.http.post<any>(`${this.baseUrl}/change`,data)
    }


    testToken(){
      return this.http.get<any>(`${this.baseUrl}/test/token`)
      .pipe(
          map(() => true), // Si llega aquí, el token es válido
          catchError((error) => {
            if (error.status === 401 || error.status === 403) {
              localStorage.clear()
              this.router.navigate(['/login']); // Redirigimos
            }
            return of(false); // Retornamos false si hubo error
          })
        );


    }
}
