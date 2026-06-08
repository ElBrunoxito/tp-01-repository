import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-t24',
  imports: [NgClass],
  templateUrl: './t24.html',
  styleUrl: './t24.css',
})
export class T24 {
  // Variables de Estado Algorítmico
  opcionSeleccionada: string | null = null;
  errores: number = 0;
  mostrarAyudaCorrecta: boolean = false;
  intentoExitoso: boolean = false;

  router = inject(Router)

  constructor() {}

  /**
   * Procesa la selección del estudiante bajo tus condiciones explícitas.
   */
  seleccionarOpcion(opcion: string): void {
    if (this.intentoExitoso) return;

    this.opcionSeleccionada = opcion;

    if (opcion === 'manzana') {
      // ÉXITO: Cambia el estado y habilita el estilo destacado en el botón "Listo"
      this.intentoExitoso = true;
      this.mostrarAyudaCorrecta = false;
      console.log('Evaluación exitosa: Opción idéntica emparejada.');
    } else {
      // FALLO: Suma un error al histórico adaptativo
      this.errores++;
      this.intentoExitoso = false;

      if (this.errores === 1) {
        // Condición 1: Si falla por primera vez -> Limpiar selección + Mensaje de reintento
        this.opcionSeleccionada = null;
        console.log('Primer error: Selección limpiada de forma automática.');
      } else if (this.errores >= 2) {
        // Condición 2: Si repite error -> Resaltar visualmente la pareja correcta (TEACCH)
        this.opcionSeleccionada = null; // Mantiene limpio el estado incorrecto
        this.mostrarAyudaCorrecta = true;
        console.log('Error repetido: Activación del resalte estricto en el emparejamiento.');
      }
    }
  }

  onSiguiente(): void {
      this.router.navigate(['/app/routine/level-2/5']);
  }

  onListo(): void {
    if(this.intentoExitoso){
      this.router.navigate(['/app/routine/level-2/5']);
    }
  }
}
