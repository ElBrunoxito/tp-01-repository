import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t31',
  imports: [NgClass],
  templateUrl: './t31.html',
  styleUrl: './t31.css',
})
export class T31 implements OnInit, OnDestroy {
  imageSrc: string = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDby4xm6IXCq71gjTWm0IIFFGHOfDKa6tVyO_rMlrqIOLjlNaoLsTa0VrSlanLZfzduXIKbXB-ijM1FoohyrubOxmBL9B8pAodCfmtF0uOR7bCnnsaqyB9Hi6ZajH7BBbBby-ziJBKTPT0y4tXNm8tig-N1H6MjozAX8pHehIXTmKLe43hgrPYNGAXuaBXx1xBlHYNkp1z73uJB5ZAgn7zxbb-bwC1MnnGTaJZK6u929P3Zqbq5FEkPdLZgQMjSVjvBrxSPDbqDoyA';
  imageAlt: string = 'Ilustración de un niño saludando';

  isButtonShaking: boolean = false;
  inactivityTimer: any;
  consoleTimer: any;
  segundosTranscurridos: number = 0;
  
  readonly TIMEOUT_LIMIT = 3000; 

  router = inject(Router);
  // Inyectamos ChangeDetectorRef en el constructor
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startInactivityCheck();
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  onContinuar(): void {
    console.log(`⏱️ Botón presionado a los ${this.segundosTranscurridos} segundos.`);
    this.clearTimers();
    this.isButtonShaking = false;
    this.cdr.detectChanges(); // Forzamos actualización al limpiar
    this.router.navigate(['/app/routine/level-3/2']);
  }

  startInactivityCheck(): void {
    this.clearTimers();
    this.segundosTranscurridos = 0;
    console.log('🚀 Temporizador iniciado.');

    this.consoleTimer = setInterval(() => {
      this.segundosTranscurridos++;
      console.log(`⏱️ Tiempo transcurrido: ${this.segundosTranscurridos} segundos`);
      this.cdr.detectChanges(); // Opcional: actualiza si muestras los segundos en pantalla
    }, 1000);

    this.inactivityTimer = setTimeout(() => {
      this.isButtonShaking = true; 
      console.warn(`⚠️ ¡Pasaron ${this.segundosTranscurridos} segundos! Resaltando botón ahora de forma síncrona.`);
      this.clearTimers();
      
      // OBLIGATORIO: Le avisa a Angular que pinte el cambio en el HTML justo en este milisegundo
      this.cdr.detectChanges(); 
    }, this.TIMEOUT_LIMIT);
  }

  clearTimers(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
  }
}
