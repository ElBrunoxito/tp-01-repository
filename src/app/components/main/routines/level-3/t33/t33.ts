import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t33',
  imports: [NgClass],
  templateUrl: './t33.html',
  styleUrl: './t33.css',
})
export class T33 implements OnInit, OnDestroy {
  URL_PERRO = "https://lh3.googleusercontent.com/aida-public/AB6AXuCECPlJb-rQfJF1ZlfAJV1FntqGR3OKtlOTPOLY5d1Uvgb1TIJiWgVW4L7jhvee9zLOwYCLqYYyMy3aaXx200D-yCKC2CyVP_PL7iVCmOJaNYAJHtgtcr1WrW0GA9fGgkYmUpgKZ4fJGxvfEO_E5gJ7q9DSGoYan9qmrJjpjUolahVEcjM5I09VKxfhhTvHz59uHTt9gL6JrV80NUzUNJpdcHcAklzv4EnBV9qwNg86Yr1icy4XXQCj9h006GOWppZsxGQWPXDc3-c"
  URL_GATO = "https://lh3.googleusercontent.com/aida-public/AB6AXuCYdOkIgRra5TQCwVmpq33KRFmYl4t2wbuy3KfVgQgKKMos6P80mc1ivVF-pVEIf3xJRIivPHfbTDih1K8xNPwjEQpD9SH9PePcAneFkdqIWDLG49eKreo7a6xxvxSJ5E47YlKaMkz8nv2HIWBlbdgTl1SxFYSLdtthAid6_YeYeQir8FYuar8WZXxZk8z41oL8631QtFNoVECsTFVqzWIAnluNcS2HW4eQjjdYbxN4Q_NB66rDza_XgFM37WrY0QWOrB3wBqd6DoA"
  // TEXTOS DINÁMICOS CENTRALES
instructionText: string = 'Une iguales';

  // CONTROLES DE ESTADO EN CADENA (METODOLOGÍA TEACCH)
  intentosFallidos: number = 0;
  hasFailed: boolean = false;               // Error inicial (borde rojo)
  shouldCorrectOptionGlow: boolean = false; // Opción correcta brilla ✨
  isSystemSolving: boolean = false;         // Resuelto (Ya sea por el niño o el sistema)

  // MANEJO DE TIEMPOS ASÍNCRONOS
  inactivityTimer: any;
  navigationTimer: any;                     // Temporizador de espera de 2 segundos
  consoleTimer: any;
  segundosTranscurridos: number = 0;

  readonly NO_RESPONSE_LIMIT = 8000;      // 10 segundos máximos de espera por inactividad
  readonly WAIT_TIME_BEFORE_NAV = 2000;     // 2 segundos de espera fija antes de cambiar de pestaña

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
      console.log(`🎉 ¡Éxito manual! El niño resolvió correctamente a los ${this.segundosTranscurridos}s.`);
      this.clearAllTimers();
      
      // Cambiamos estados para aplicar el sombreado y el check verde ✔
      this.isSystemSolving = true; 
      this.instructionText = '¡Excelente!';
      this.hasFailed = false;
      this.shouldCorrectOptionGlow = false;
      this.cdr.detectChanges();

      // ⏱️ Espera 2 segundos antes de cambiar de pestaña tras el acierto del niño
      this.navigationTimer = setTimeout(() => {
        this.zone.run(() => {
          this.navegarASiguientePantalla();
        });
      }, this.WAIT_TIME_BEFORE_NAV);

    } else {
      this.intentosFallidos++;
      console.warn(`❌ Intento incorrecto registrado. Total fallos: ${this.intentosFallidos}`);
      
      // Reiniciamos los 10 segundos de holgura tras la interacción física errónea
      this.resetAndStartTimer();

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
   * Administrador del temporizador reactivo por inactividad
   */
  resetAndStartTimer(): void {
    this.clearAllTimers();
    this.segundosTranscurridos = 0;

    this.zone.run(() => {
      this.consoleTimer = setInterval(() => {
        this.segundosTranscurridos++;
        console.log(`⏱️ [Paso 3] Tiempo inactivo: ${this.segundosTranscurridos}s`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // CONDICIÓN: Si el niño no responde en 10s, el sistema toma el control
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        clearInterval(this.consoleTimer);
        this.isSystemSolving = true;
        this.hasFailed = false;
        this.shouldCorrectOptionGlow = false;
        this.instructionText = 'Bien ⭐'; 
        this.cdr.detectChanges();

        console.warn('🤖 El sistema auto-marcó la opción correcta por inactividad. Esperando 2 segundos...');

        // ⏱️ Espera 2 segundos antes de cambiar de pestaña tras el auto-marcado
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
    console.log('🚀 Cambiando de pestaña hacia la siguiente actividad...');
    this.router.navigate(['/app/routine/level-3/4']);
  }

  clearAllTimers(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.navigationTimer) clearTimeout(this.navigationTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
  }
}