import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t23',
  imports: [NgClass],
  templateUrl: './t23.html',
  styleUrl: './t23.css',
})
export class T23 {
// Control de intentos para el algoritmo de personalización
  errores: number = 0;
  mostrarAyuda: boolean = false;
  intentoExitoso: boolean = false;
  router = inject(Router)

  constructor() {}

  /**
   * Evalúa la selección de color del usuario.
   */
  seleccionarColor(color: string): void {
    if (this.intentoExitoso) return;

    if (color === 'rojo') {
      this.intentoExitoso = true;
      this.mostrarAyuda = false;
      console.log('Respuesta Correcta.');
    } else {
      this.errores++;
      this.intentoExitoso = false;
      
      // Condición: Al repetir el error (2 fallos o más), la sintaxis @if activa el resalto
      if (this.errores >= 2) {
        this.mostrarAyuda = true;
      }
      console.log(`Respuesta Incorrecta. Intentos fallidos: ${this.errores}`);
    }
  }

  onSiguiente(): void {
      this.router.navigate(['/app/routine/level-2/4']);
  }

  onListo(): void {
    if(this.intentoExitoso){
      this.router.navigate(['/app/routine/level-2/4']);
    }
  }
}
