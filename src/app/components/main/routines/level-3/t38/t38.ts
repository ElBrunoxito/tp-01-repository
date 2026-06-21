import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';
import { ResponseUserDTO } from '../../../../../model/User';

@Component({
  selector: 'app-t38',
  imports: [NgClass],
  templateUrl: './t38.html',
  styleUrl: './t38.css',
})
export class T38 implements OnInit, OnDestroy {
  // TEXTOS DINÁMICOS CENTRALES
  instructionText: string = 'Toca el Círculo';

  // CONTROLES DE ESTADO SENSORIAL Y COGNITIVO TEACCH
  intentosFallidos: number = 0;
  hasFailed: boolean = false;               // Primer error -> Borde rojo + "Intenta otra vez"
  shouldCorrectOptionGlow: boolean = false; // Segundo error -> Resalta el correcto con brillo guía ✨
  isSystemSolving: boolean = false;         // Bloqueo final y pintado verde (Acierto o Auto-marcado)

  // MANEJO DE TIEMPOS ASÍNCRONOS REPETIBLES
  inactivityTimer: any;
  navigationTimer: any;                     
  consoleTimer: any;
  segundosTranscurridos: number = 0;

  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)
  // PARÁMETROS DE CALIBRACIÓN REQUERIDOS
  readonly NO_RESPONSE_LIMIT = 8000;       // ⚡ 8 segundos de límite por inactividad
  readonly WAIT_TIME_BEFORE_NAV = 2000;     // ⚡ 2 segundos de feedback fijo antes de cambiar de pantalla

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
   * Captura y procesa la selección de formas geométricas del niño
   */
  onSelectForm(isCorrect: boolean): void {
    if (this.isSystemSolving) return; // Bloquea clics si ya se encuentra en fase de éxito/navegación

    if (isCorrect) {
      console.log(`🎉 ¡Forma identificada correctamente! Acción manual a los ${this.segundosTranscurridos}s.`);
      this.clearAllTimers();
      
      this.isSystemSolving = true; 
      this.instructionText = '¡Excelente!';
      this.hasFailed = false;
      this.shouldCorrectOptionGlow = false;
      this.cdr.detectChanges();

      // ⏱️ Espera exacta de 2 segundos antes de avanzar automáticamente
      this.navigationTimer = setTimeout(() => {
        this.zone.run(() => {
          this.navegarASiguientePantalla();
        });
      }, this.WAIT_TIME_BEFORE_NAV);

    } else {
      this.intentosFallidos++;
      console.warn(`❌ Selección incorrecta. Intento fallido N°: ${this.intentosFallidos}`);
      
      // Reiniciamos la ventana de 8 segundos por interacción física errónea
      this.resetAndStartTimer();

      if (this.intentosFallidos === 1) {
        this.hasFailed = true;
        this.instructionText = 'Intenta otra vez'; // ❌ Condición 1: Si falla -> “Intenta otra vez”
      } else if (this.intentosFallidos >= 2) {
        this.hasFailed = true;
        this.shouldCorrectOptionGlow = true;     // ❌ Condición 2: Si repite -> resaltar correcto
      }
      this.cdr.detectChanges();
    }
  }

  /**
   * Administrador del temporizador reactivo por inactividad
   */
  resetAndStartTimer(): void {
    this.clearAllTimers();
    this.segundosTranscurridos = 0;

    this.zone.run(() => {
      this.consoleTimer = setInterval(() => {
        this.segundosTranscurridos++;
        console.log(`⏱️ [Paso 8] Tiempo de inactividad en formas: ${this.segundosTranscurridos}s`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // ❌ Condición 3: Si no responde en 8s -> el sistema marca ✔ automáticamente
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        clearInterval(this.consoleTimer);
        
        this.isSystemSolving = true;
        this.hasFailed = false;
        this.shouldCorrectOptionGlow = false;
        this.instructionText = 'Bien hecho ⭐'; 
        this.cdr.detectChanges();

        console.warn('🤖 Sistema auto-marcó la forma correcta por inactividad de 8s. Esperando 2 segundos...');

        // ⏱️ Transición automatizada tras 2 segundos de retención visual
        this.navigationTimer = setTimeout(() => {
          this.zone.run(() => {
            this.navegarASiguientePantalla();
          });
        }, this.WAIT_TIME_BEFORE_NAV);

      });
    }, this.NO_RESPONSE_LIMIT);
  }

  /**
   * Enrutador centralizado hacia la Pantalla 9
   */
  navegarASiguientePantalla(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,38).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-3/9']);
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
