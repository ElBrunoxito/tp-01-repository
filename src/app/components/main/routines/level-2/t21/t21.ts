import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t21',
  imports: [],
  templateUrl: './t21.html',
  styleUrl: './t21.css',
})
export class T21 {
  router = inject(Router)
constructor() {}

  onSiguiente(): void {
    console.log('Botón Siguiente presionado. Avanzando al siguiente paso del algoritmo...');
    // Aquí puedes implementar el router para cambiar de vista, por ejemplo:
    this.router.navigate(['/app/routine/level-2/2']);
  }

  onListo(): void {
    console.log('Botón Listo presionado. Tarea actual guardada o verificada.');
    this.router.navigate(['/app/routine/level-2/2']);
  }
}
