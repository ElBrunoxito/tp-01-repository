import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t310',
  imports: [NgClass],
  templateUrl: './t310.html',
  styleUrl: './t310.css',
})
export class T310 implements OnInit, OnDestroy {
// CONFIGURACIÓN SENSORIAL COGNITIVA TEACCH
  shouldButtonGlow: boolean = false;       // ❌ Condición: Si no presiona en 8s -> Brillo guía en "Terminar" ✨
  isActionLocked: boolean = false;          // Bloqueo de seguridad tras la interacción

  // TEMPORIZADORES ASÍNCRONOS
  inactivityTimer: any;
  consoleTimer: any;
  segundosTranscurridos: number = 0;

  readonly NO_RESPONSE_LIMIT = 8000;       // ⚡ 8 segundos de tolerancia de inactividad

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  router = inject(Router)

  ngOnInit() {
    this.startInactivityTimer();
  }

  ngOnDestroy() {
    this.clearAllTimers();
  }

  /**
   * Inicializa el monitor de inactividad sensorial
   */
  startInactivityTimer(): void {
    this.clearAllTimers();
    this.segundosTranscurridos = 0;

    this.zone.run(() => {
      this.consoleTimer = setInterval(() => {
        this.segundosTranscurridos++;
        console.log(`⏱️ [Pantalla 10] Tiempo en Despedida: ${this.segundosTranscurridos}s`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // ❌ Condición: Si no interactúa en 8 segundos, el botón gigante empieza a parpadear en neón
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        clearInterval(this.consoleTimer);
        this.shouldButtonGlow = true;
        console.warn('🤖 Alarma de inactividad (8s). El botón "Terminar" se ha resaltado.');
        this.cdr.detectChanges();
      });
    }, this.NO_RESPONSE_LIMIT);
  }

  /**
   * Detonador al pulsar el botón estructurado final
   */
  onPressTerminar(): void {
    if (this.isActionLocked) return;
    
    this.isActionLocked = true;
    this.clearAllTimers();
    this.shouldButtonGlow = false;
    console.log('🎉 Rutina terminada con éxito. Redirigiendo...');

    this.completarFlujoRutina();
  }

  completarFlujoRutina(): void {
    // Aquí invocas el Router de tu tesis para volver al panel general
    this.router.navigate(['/app']);
  }

  clearAllTimers(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
  }
}
