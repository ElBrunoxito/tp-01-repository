import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t28',
  imports: [],
  templateUrl: './t28.html',
  styleUrl: './t28.css',
})
export class T28 implements OnInit, OnDestroy {
// Control del tiempo de espera adaptativo para el alumno (15 segundos)
  tiempoRestante: number = 15;
  tiempoFormateado: string = '00:15';
  tiempoTerminado: boolean = false;
  private timerInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}
  router = inject(Router)

  ngOnInit(): void {
    this.iniciarTemporizador();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  /**
   * Maneja el segundero de forma reactiva y actualiza la vista nativamente.
   */
  iniciarTemporizador(): void {
    this.timerInterval = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
        const minutos = Math.floor(this.tiempoRestante / 60);
        const segundos = this.tiempoRestante % 60;
        this.tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        this.cdr.detectChanges();
      } else {
        this.tiempoTerminado = true;
        clearInterval(this.timerInterval);
        this.cdr.detectChanges();
        console.log('Tiempo de descanso concluido con éxito.');
      }
    }, 1000);
  }

  onContinuar(): void {
    if (this.tiempoTerminado) {
      this.router.navigate(['/app/routine/level-2/9']);

    }
  }

}