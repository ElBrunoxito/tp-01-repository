import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
private readonly RES_KEY = 'respuestasTestTea';

  // Inyectamos el identificador de la plataforma para saber si es servidor o navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setQuestions(respuestas: any): void {
    // Solo ejecuta si estamos en el navegador del cliente
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.RES_KEY, JSON.stringify(respuestas));
    }
  }

  getQuestions(): any {
    // Si se ejecuta en el servidor (durante el primer renderizado), evita usar localStorage
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.RES_KEY);
      return data ? JSON.parse(data) : null;
    }
    // Retorna null por defecto si está en el servidor para que no explote
    return null;
  }

  dropQuestions(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.RES_KEY);
    }
  }
  
}
