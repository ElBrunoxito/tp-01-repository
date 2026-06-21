import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';
import { ResponseUserDTO } from '../../../../../model/User';

@Component({
  selector: 'app-t36',
  imports: [NgClass],
  templateUrl: './t36.html',
  styleUrl: './t36.css',
})
export class T36 implements OnInit, OnDestroy {
  // TEXTOS DINÁMICOS CENTRALES
  instructionText: string = 'Selecciona el igual';

  // CONTROLES DE ESTADO EN CADENA (METODOLOGÍA TEACCH)
  intentosFallidos: number = 0;
  hasFailed: boolean = false;               // Error inicial (borde rojo y texto "Intenta otra vez")
  shouldCorrectOptionGlow: boolean = false; // Segundo error (resalta el correcto con brillo guía ✨)
  isSystemSolving: boolean = false;         // Resuelto (Bloquea clics y activa sombreado + check ✔)

  // MANEJO DE TIEMPOS ASÍNCRONOS
  inactivityTimer: any;
  navigationTimer: any;                     
  consoleTimer: any;
  segundosTranscurridos: number = 0;

  // CONDICIONES EXIGIDAS
  readonly NO_RESPONSE_LIMIT = 8000;       // ⚡ 8 segundos máximos de espera por inactividad
  readonly WAIT_TIME_BEFORE_NAV = 2000;     // ⚡ 2 segundos de espera fija con check antes de pasar de página


  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)

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
   * Control de selección del niño
   */
  onSelectOption(isCorrect: boolean): void {
    if (this.isSystemSolving) return; // Bloquea clics si ya se está resolviendo/navegando

    if (isCorrect) {
      console.log(`🎉 ¡Éxito manual! El niño seleccionó el objeto correcto a los ${this.segundosTranscurridos}s.`);
      this.clearAllTimers();
      
      // Sombreado de éxito, inyección de check ✔ y cambio de encabezado
      this.isSystemSolving = true; 
      this.instructionText = '¡Excelente!';
      this.hasFailed = false;
      this.shouldCorrectOptionGlow = false;
      this.cdr.detectChanges();

      // ⏱️ Espera exacta de 2 segundos antes de avanzar de página
      this.navigationTimer = setTimeout(() => {
        this.zone.run(() => {
          this.navegarASiguientePantalla();
        });
      }, this.WAIT_TIME_BEFORE_NAV);

    } else {
      this.intentosFallidos++;
      console.warn(`❌ Intento incorrecto registrado. Total fallos: ${this.intentosFallidos}`);
      
      // Reiniciamos los 8 segundos de holgura tras la interacción física errónea
      this.resetAndStartTimer();

      if (this.intentosFallidos === 1) {
        this.hasFailed = true;
        this.instructionText = 'Intenta otra vez'; // ❌ Condición 1: Si falla -> "Intenta otra vez"
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
        console.log(`⏱️ [Paso 6] Tiempo inactivo: ${this.segundosTranscurridos}s`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // ❌ Condición 3: Si no responde en 8 segundos -> el sistema marca ✔ automáticamente
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        clearInterval(this.consoleTimer);
        this.isSystemSolving = true;
        this.hasFailed = false;
        this.shouldCorrectOptionGlow = false;
        this.instructionText = 'Bien ⭐'; 
        this.cdr.detectChanges();

        console.warn('🤖 El sistema auto-marcó la opción correcta por inactividad. Esperando 2 segundos...');

        // ⏱️ Espera exacta de 2 segundos antes de avanzar de página
        this.navigationTimer = setTimeout(() => {
          this.zone.run(() => {
            this.navegarASiguientePantalla();
          });
        }, this.WAIT_TIME_BEFORE_NAV);

      });
    }, this.NO_RESPONSE_LIMIT);
  }

  /**
   * Enrutador centralizado del flujo de pantallas
   */
  navegarASiguientePantalla(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,36).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-3/7']);
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
