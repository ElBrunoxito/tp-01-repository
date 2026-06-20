import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CodeDTO, LoginDTO, ResponseUserDTO, UpdateUserDTO } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient)
    private readonly baseUrl = "http://localhost:8080/auth"

    login(data:LoginDTO) {
      return this.http.post<ResponseUserDTO>(`${this.baseUrl}/login`,data)
    }
    register(data:LoginDTO){
      return this.http.post<ResponseUserDTO>(`${this.baseUrl}/register`,data)
    }

    update(data:UpdateUserDTO){
      return this.http.post<ResponseUserDTO>(`${this.baseUrl}/update`,data)
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
}
