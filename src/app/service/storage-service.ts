import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ResponseUserDTO } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private readonly USER_KEY = 'saveUserKey';
  private readonly RES_KEY = 'respuestasTestTea';
  private readonly EMAIL_KEY = 'erekey'



  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setQuestions(respuestas: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.RES_KEY, JSON.stringify(respuestas));
    }
  }

  getQuestions(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.RES_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  dropQuestions(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.RES_KEY);
    }
  }

  

  setUser(user: ResponseUserDTO): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.USER_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  dropUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  setEmail(email:string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.EMAIL_KEY, email);
    }
  }

  getEmail(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.EMAIL_KEY);
      return data ? data : "";
    }
    return "";
  }

  dropEmail(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.EMAIL_KEY);
    }
  }



  
}
