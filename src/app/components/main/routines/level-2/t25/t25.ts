import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CartaMemoria {
  id: number;
  icono: string;
  colorClase: string;
  descubierta: boolean;
}

interface CartaMemoria {
  id: number;
  icono: string;
  colorClase: string;
  descubierta: boolean;
}

@Component({
  selector: 'app-t25',
  imports: [NgClass],
  templateUrl: './t25.html',
  styleUrl: './t25.css',
})
export class T25 implements OnInit {
  tablero: CartaMemoria[] = [
    { id: 1, icono: 'star', colorClase: 'icon-yellow', descubierta: false },
    { id: 2, icono: 'circle', colorClase: 'icon-blue', descubierta: false },
    { id: 3, icono: 'circle', colorClase: 'icon-blue', descubierta: false },
    { id: 4, icono: 'star', colorClase: 'icon-yellow', descubierta: false }
  ];

  router = inject(Router)


  primerClickId: number | null = null;
  segundoClickId: number | null = null;
  bloquearTablero: boolean = true; 

  faseMemorizacion: boolean = true; 
  errores: number = 0;
  mostrarAyudaPares: boolean = false;
  intentoExitoso: boolean = false;
  
  // Estado intermedio para el feedback visual de TEACCH
  parEncontradoJustoAhora: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.ejecutarFaseMemorizacion();
  }

  /**
   * Muestra las cartas al inicio por 4 segundos completos.
   */
  private ejecutarFaseMemorizacion(): void {
    this.faseMemorizacion = true;
    this.bloquearTablero = true;
    this.cdr.detectChanges(); 

    setTimeout(() => {
      this.faseMemorizacion = false;
      this.bloquearTablero = false; 
      this.cdr.detectChanges(); 
      console.log('Fase de memorización concluida. El test real ha comenzado.');
    }, 4000); 
  }

  /**
   * Captura el click de las tarjetas.
   */
  voltearCarta(carta: CartaMemoria): void {
    if (this.bloquearTablero || this.faseMemorizacion || carta.descubierta || carta.id === this.primerClickId) return;

    if (this.primerClickId === null) {
      this.primerClickId = carta.id;
      this.cdr.detectChanges();
    } else {
      this.segundoClickId = carta.id;
      this.cdr.detectChanges();
      this.verificarCoincidencia();
    }
  }

  /**
   * Evalúa de forma estricta las coincidencias en el Tablero.
   */
  private verificarCoincidencia(): void {
    this.bloquearTablero = true;

    const carta1 = this.tablero.find(c => c.id === this.primerClickId);
    const carta2 = this.tablero.find(c => c.id === this.segundoClickId);

    if (carta1 && carta2 && carta1.icono === carta2.icono) {
      // --- ¡CASO DE ÉXITO (ENCONTRÓ UN PAR)! ---
      this.zone.run(() => {
        carta1.descubierta = true;
        carta2.descubierta = true;
        this.parEncontradoJustoAhora = true; // Activa el mensaje positivo intermedio

        this.verificarFinDeJuego(); // Evalúa si ya es el fin de la actividad completa
        this.resetearSeleccionTemporal();
        
        // Forzar actualización del DOM inmediatamente al hacer click correcto
        this.cdr.detectChanges(); 
      });

    } else {
      // --- ¡CASO DE ERROR! ---
      this.zone.run(() => {
        this.errores++;
        this.intentoExitoso = false;
        this.parEncontradoJustoAhora = false;
        this.cdr.detectChanges();

        // Delay para que el alumno note el error visual antes de que se vuelvan a tapar
        setTimeout(() => {
          if (this.errores === 1) {
            console.log('Primer error: Cartas ocultadas.');
          } else if (this.errores >= 2) {
            // Activa contornos discontinuos en los pares para guiar al estudiante
            this.mostrarAyudaPares = true;
          }
          
          this.resetearSeleccionTemporal();
          this.cdr.detectChanges(); 
        }, 1200);
      });
    }
  }

  /**
   * Valida si se descubrieron todos los pares del ejercicio.
   */
  private verificarFinDeJuego(): void {
    const todasDescubiertas = this.tablero.every(c => c.descubierta);
    
    if (todasDescubiertas) {
      this.intentoExitoso = true;
      this.parEncontradoJustoAhora = false;
      this.mostrarAyudaPares = false;
      console.log('¡Actividad terminada! Cambio dinámico en la botonera inferior listo.');
    }
  }

  private resetearSeleccionTemporal(): void {
    this.primerClickId = null;
    this.segundoClickId = null;
    if (!this.faseMemorizacion) {
      this.bloquearTablero = false;
    }
  }

  onSiguiente(): void {
    this.router.navigate(['/app/routine/level-2/6']);

  }

  onListo(): void {
    if (this.intentoExitoso) {
      this.router.navigate(['/app/routine/level-2/6']);

    }
  }

}
