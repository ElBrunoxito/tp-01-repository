import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t37',
  imports: [NgClass],
  templateUrl: './t37.html',
  styleUrl: './t37.css',
})
export class T37 implements OnInit, OnDestroy {
  // TEXTOS DINÁMICOS CENTRALES
  instructionText: string = 'Toca la pelota';

  // CONTROL DE ESTADO EXCLUSIVO (SIEMPRE CORRECTO / SIN ERROR)
  isSensoryTouched: boolean = false; 

  // MANEJO DE TIEMPOS ASÍNCRONOS REPETIBLES
  inactivityTimer: any;
  navigationTimer: any;                     
  consoleTimer: any;
  segundosTranscurridos: number = 0;

  router = inject(Router);

  // CONSTANTES DE TIEMPO REQUERIDAS
  readonly NO_RESPONSE_LIMIT = 8000;       // ⚡ 8 segundos máximos por inactividad
  readonly WAIT_TIME_BEFORE_NAV = 2000;     // ⚡ 2 segundos de retención visual con check de éxito

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.resetAndStartTimer();
  }

  ngOnDestroy() {
    this.clearAllTimers();
  }

  /**
   * Acción al tocar el objeto sensorial (Siempre es correcto)
   */
  onTouchSensoryObject(): void {
    if (this.isSensoryTouched) return; // Bloquea toques adicionales si ya se procesó

    console.log(`🎯 ¡Estímulo tocado por el niño! Feedback activado a los ${this.segundosTranscurridos}s.`);
    this.clearAllTimers();
    
    this.isSensoryTouched = true;
    this.instructionText = '¡Muy bien!';
    this.cdr.detectChanges();

    // ⏱️ Espera exacta de 2 segundos de feedback antes de avanzar
    this.navigationTimer = setTimeout(() => {
      this.zone.run(() => {
        this.navegarASiguientePantalla();
      });
    }, this.WAIT_TIME_BEFORE_NAV);
  }

  /**
   * Administrador del temporizador por inactividad
   */
  resetAndStartTimer(): void {
    this.clearAllTimers();
    this.segundosTranscurridos = 0;

    this.zone.run(() => {
      this.consoleTimer = setInterval(() => {
        this.segundosTranscurridos++;
        console.log(`⏱️ [Paso 7] Tiempo sin tocar: ${this.segundosTranscurridos}s`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // Automarcado de apoyo si pasan los 8 segundos de inactividad
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        clearInterval(this.consoleTimer);
        
        this.isSensoryTouched = true;
        this.instructionText = 'Excelente ⭐'; 
        this.cdr.detectChanges();

        console.warn('🤖 Sistema auto-marcó el estímulo por tiempo límite. Esperando 2 segundos...');

        this.navigationTimer = setTimeout(() => {
          this.zone.run(() => {
            this.navegarASiguientePantalla();
          });
        }, this.WAIT_TIME_BEFORE_NAV);

      });
    }, this.NO_RESPONSE_LIMIT);
  }

  /**
   * Enrutador hacia la siguiente actividad (Pantalla 8)
   */
  navegarASiguientePantalla(): void {
    console.log('🚀 Avanzando automáticamente hacia la Pantalla 8...');
    this.router.navigate(['/app/routine/level-3/8']);
  }

  clearAllTimers(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.navigationTimer) clearTimeout(this.navigationTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
  }

}
