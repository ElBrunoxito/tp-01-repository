import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-t18',
  imports: [NgClass],
  templateUrl: './t18.html',
  styleUrl: './t18.css',
})
export class T18 implements OnInit, OnDestroy {

  // Configuración reglamentaria de 1 minuto (60 segundos)
  tiempoRestante: number = 60; 
  descansoFinalizado: boolean = false;
  
  private intervaloReloj: any;
  private maxTiempo: number = 60;
  // Perímetro total de la circunferencia SVG (2 * Math.PI * r) donde r=95
  private perimetroCirculo: number = 596.9; 

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.ejecutarCuentaRegresiva();
  }

  ngOnDestroy(): void {
    this.detenerReloj();
  }

  /**
   * Ejecuta el intervalo de tiempo corriendo fuera de Angular para evitar sobrecarga del ciclo digest
   */
  private ejecutarCuentaRegresiva() {
    this.zone.runOutsideAngular(() => {
      this.intervaloReloj = setInterval(() => {
        if (this.tiempoRestante > 0) {
          this.zone.run(() => {
            this.tiempoRestante--;
            this.cdr.detectChanges();
          });
        } else {
          this.zone.run(() => {
            this.concluirDescanso();
          });
        }
      }, 1000);
    });
  }

  /**
   * Calcula de forma dinámica el offset para la animación síncrona de la barra circular
   */
  calcularStrokeOffset(): number {
    const fraccionTiempo = this.tiempoRestante / this.maxTiempo;
    // Reduce progresivamente el offset para encoger la línea del círculo a la par del reloj
    return this.perimetroCirculo * (1 - fraccionTiempo);
  }

  /**
   * Procesa la conclusión reglamentaria del minuto de descanso
   */
  private concluirDescanso() {
    this.detenerReloj();
    this.descansoFinalizado = true;
    this.tiempoRestante = 0;
    this.cdr.detectChanges();

    // Transición automatizada tras 2 segundos fijos mostrando la lona de completado
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.avanzarSiguientePantalla();
        });
      }, 2000);
    });
  }

  /**
   * Permite el salto manual si el niño interactúa directo con la Navbar una vez habilitada
   */
  forzarAvanceManual() {
    if (!this.descansoFinalizado) return;
    this.avanzarSiguientePantalla();
  }

  private detenerReloj() {
    if (this.intervaloReloj) {
      clearInterval(this.intervaloReloj);
    }
  }

  private avanzarSiguientePantalla() {
    console.log('Descanso concluido con éxito. Transicionando a la pantalla 9/10...');
  }

}
