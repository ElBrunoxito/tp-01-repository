import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t35',
  imports: [NgClass],
  templateUrl: './t35.html',
  styleUrl: './t35.css',
})
export class T35 implements OnInit, OnDestroy {
  tiempoTotalSegundos: number = 10; 

  // TEXTOS DINÁMICOS
  statusText: string = 'En progreso...';
  headerText: string = 'Descanso';

  // CONTROL DE PROGRESO EXACTO
  segundosTranscurridos: number = 0;
  porcentajeProgreso: number = 0; 

  // ESTADO COGNITIVO TEACCH
  isRestFinished: boolean = false; 

  // PROCESO ASÍNCRONO
  countdownTimer: any;

  router = inject(Router);

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.inicializarDescansoDinamico();
  }

  ngOnDestroy() {
    this.clearAllTimers();
  }

  /**
   * Configura el inicio del descanso con el tiempo que tú has colocado
   */
  inicializarDescansoDinamico(): void {
    this.clearAllTimers();
    
    this.segundosTranscurridos = 0;
    this.porcentajeProgreso = 0;
    this.isRestFinished = false;

    console.log(`⏳ [Paso 5] Descanso Configurado Dinámicamente a: ${this.tiempoTotalSegundos} segundos.`);

    // Cronómetro reactivo segundo a segundo
    this.zone.run(() => {
      this.countdownTimer = setInterval(() => {
        this.segundosTranscurridos++;
        
        // Progreso proporcional exacto segundo a segundo
        this.porcentajeProgreso = (this.segundosTranscurridos / this.tiempoTotalSegundos) * 100;
        
        // Si el tiempo llegó a la meta colocado, cerramos el ciclo de inmediato
        if (this.segundosTranscurridos >= this.tiempoTotalSegundos) {
          this.finalizarYAvanzarInmediato();
        }
        
        this.cdr.detectChanges();
      }, 1000);
    });
  }

  /**
   * LÓGICA DIRECTA SIN ESPERAS: Asegura barra al 100%, muestra check y salta inmediatamente
   */
  finalizarYAvanzarInmediato(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    
    // Forzamos el estado completado al 100% de manera estricta
    this.isRestFinished = true;
    this.porcentajeProgreso = 100;
    this.headerText = '¡Muy bien!';
    this.statusText = 'Terminado';
    this.cdr.detectChanges();

    console.warn(`🏁 Tiempo cumplido. Barra al 100% exacto. Cambiando de pantalla inmediatamente.`);

    // Transición directa en caliente
    this.zone.run(() => {
      this.navegarASiguientePantalla();
    });
  }

  navegarASiguientePantalla(): void {
    // Tu enrutador de Angular directo hacia la Pantalla 6:
    this.router.navigate(['/app/routine/level-3/6']);
  }

  clearAllTimers(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }
}
