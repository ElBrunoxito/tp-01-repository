import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUserDTO } from '../../../../../model/User';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';

@Component({
  selector: 'app-t34',
  imports: [NgClass],
  templateUrl: './t34.html',
  styleUrl: './t34.css',
})
export class T34 implements OnInit, OnDestroy {
 // TEXTOS DINÁMICOS DE INSTRUCCIÓN
  instructionText: string = 'Toca rojo';

  // CONTROL DE FLUJOS CONDICIONALES TEACCH
  intentosFallidos: number = 0;
  hasFailed: boolean = false;               // Error inicial (borde rojo)
  shouldCorrectOptionGlow: boolean = false; // Opción correcta brilla ✨
  isSystemSolving: boolean = false;         // Resuelto (Bloquea clics y activa el check ✔)

  // TEMPORIZADORES ASÍNCRONOS
  inactivityTimer: any;
  navigationTimer: any;                     // Temporizador de retraso de 2 segundos
  consoleTimer: any;
  segundosTranscurridos: number = 0;

  readonly INACTIVITY_LIMIT = 8000;       // 10 segundos máximos sin responder
  readonly WAIT_TIME_BEFORE_NAV = 2000;     // 2 segundos fijos de retención visual
  readonly SYSTEM_WAIT_TIME = 2000;         // 2 segundos fijos de retención visual

  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)
  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.startInactivityChronometer();
  }

  ngOnDestroy() {
    this.clearAllTimers();
  }

  /**
   * Ejecución al interactuar con las opciones de colores
   */
  onSelectColor(isCorrect: boolean): void {
    if (this.isSystemSolving) return; // Bloquea interacciones si ya está resolviendo

    if (isCorrect) {
      console.log(`🎉 ¡Éxito manual! Color correcto seleccionado a los ${this.segundosTranscurridos}s.`);
      this.clearAllTimers();
      
      // Activamos el estado de resolución para pintar el sombreado y el check
      this.isSystemSolving = true;
      this.instructionText = '¡Excelente!';
      this.hasFailed = false;
      this.shouldCorrectOptionGlow = false;
      this.cdr.detectChanges();

      // ⏱️ Espera 2 segundos antes de cambiar de página tras el acierto del niño
      this.navigationTimer = setTimeout(() => {
        this.zone.run(() => {
          this.navegarASiguientePantalla();
        });
      }, this.WAIT_TIME_BEFORE_NAV);

    } else {
      this.intentosFallidos++;
      console.warn(`❌ Selección errónea. Total fallos en pantalla: ${this.intentosFallidos}`);
      
      // Reinicio reactivo de los 10 segundos de holgura
      this.startInactivityChronometer();

      if (this.intentosFallidos === 1) {
        this.hasFailed = true;
        this.instructionText = 'Intenta otra vez';
      } else if (this.intentosFallidos >= 2) {
        this.hasFailed = true;
        this.shouldCorrectOptionGlow = true;
      }
      this.cdr.detectChanges();
    }
  }

  /**
   * Gestor del tiempo pasivo por inactividad del usuario
   */
  startInactivityChronometer(): void {
    this.clearAllTimers();
    this.segundosTranscurridos = 0;

    this.zone.run(() => {
      this.consoleTimer = setInterval(() => {
        this.segundosTranscurridos++;
        console.log(`⏱️ [Paso 4] Tiempo inactivo: ${this.segundosTranscurridos}s`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // CONDICIÓN: Si no responde en 10 segundos...
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        clearInterval(this.consoleTimer);
        this.isSystemSolving = true;
        this.hasFailed = false;
        this.shouldCorrectOptionGlow = false;
        this.instructionText = 'Bien ✔'; 
        this.cdr.detectChanges();

        console.warn('🤖 Automarcado por inactividad. Retención visual de 2 segundos iniciada...');

        // ⏱️ Espera 2 segundos antes de cambiar de página tras el auto-marcado
        this.navigationTimer = setTimeout(() => {
          this.zone.run(() => {
            this.navegarASiguientePantalla();
          });
        }, this.SYSTEM_WAIT_TIME);

      });
    }, this.INACTIVITY_LIMIT);
  }

  /**
   * Enrutador central del proyecto
   */
  navegarASiguientePantalla(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,34).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-3/5']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 
  }

  clearAllTimers(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.navigationTimer) clearTimeout(this.navigationTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
  }
}
