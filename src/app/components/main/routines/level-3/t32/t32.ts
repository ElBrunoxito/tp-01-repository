import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';
import { ResponseUserDTO } from '../../../../../model/User';

@Component({
  selector: 'app-t32',
  imports: [NgClass],
  templateUrl: './t32.html',
  styleUrl: './t32.css',
})
export class T32 implements OnInit, OnDestroy {
  currentStep: number = 2;
  totalSteps: number = 10;
  progressPercentage: number = 20;

  imageSrc: string = 'assets/teacch/agenda.png';
  imageAlt: string = 'Agenda visual de actividades.';

  // ESTADOS DE ALERTA ESCALONADA
  isFirstStepHighlighted: boolean = false; // Alerta 1: Primer paso (Trabajar)
  isButtonShaking: boolean = false;         // Alerta 2: Botón Continuar

  // TEMPORIZADORES
  inactivityTimer: any;
  buttonAlertTimer: any;
  consoleTimer: any;
  segundosTranscurridos: number = 0;

  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)
  // TIEMPOS CONDICIONALES
  readonly FIRST_ALERT_LIMIT = 3000; // 10 segundos para alertar el paso
  readonly SECOND_ALERT_LIMIT = 5000;  // 5 segundos adicionales para alertar el botón

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.startInactivityCheck();
  }

  ngOnDestroy() {
    this.clearAllTimers();
  }

  onContinuar(): void {
    console.log(`⏱️ Pantalla 2 completada a los ${this.segundosTranscurridos} segundos.`);
    this.clearAllTimers();
    this.isFirstStepHighlighted = false;
    this.isButtonShaking = false;
    
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,32).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-3/3']);

      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    });    
    this.cdr.detectChanges();
    
    console.log('Avanzando al Paso 3...');
  }

  startInactivityCheck(): void {
    this.clearAllTimers();
    this.segundosTranscurridos = 0;
    console.log('🚀 Secuencia de tiempos iniciada.');

    // Contador de tiempo en consola
    this.zone.run(() => {
      this.consoleTimer = setInterval(() => {
        this.segundosTranscurridos++;
        console.log(`⏱️ Tiempo transcurrido: ${this.segundosTranscurridos} segundos`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // DISPARADOR 1: Alerta el primer paso a los 10 segundos
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        this.isFirstStepHighlighted = true;
        console.warn('⚠️ [10s] ¡Inactividad detectada! Resaltando primer paso (Trabajar).');
        this.cdr.detectChanges();

        // DISPARADOR 2: Espera 5 segundos más y alerta el botón avanzar
        this.buttonAlertTimer = setTimeout(() => {
          this.zone.run(() => {
            this.isButtonShaking = true;
            console.warn('🔥 [15s] ¡Sigue sin interactuar! Resaltando ahora el botón Continuar.');
            this.cdr.detectChanges();
          });
        }, this.SECOND_ALERT_LIMIT);

      });
    }, this.FIRST_ALERT_LIMIT);
  }

  clearAllTimers(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.buttonAlertTimer) clearTimeout(this.buttonAlertTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
  }
}