import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

interface Carta {
  icono: string;
  revelada: boolean;
  esParteDelParObjetivo: boolean;
}

@Component({
  selector: 'app-t14',
  imports: [NgClass],
  templateUrl: './t14.html',
  styleUrl: './t14.css',
})
export class T14 implements OnInit, OnDestroy {

  // Mapeo inicial de las 6 cartas (3 pares, por ejemplo 'apple', 'apple', etc.)
  estadoCartas: Carta[] = [
    { icono: 'https://static.vecteezy.com/system/resources/thumbnails/008/085/931/small/apple-clip-art-illustration-vector.jpg', revelada: false, esParteDelParObjetivo: true },
    { icono: 'https://i.pinimg.com/736x/3b/19/80/3b1980ae78ad4de47eed5bee037c25f6.jpg', revelada: false, esParteDelParObjetivo: false },
    { icono: 'https://png.pngtree.com/png-clipart/20250122/original/pngtree-cute-yellow-cartoon-star-clipart-illustration-png-image_19855052.png', revelada: false, esParteDelParObjetivo: false },
    { icono: 'https://i.pinimg.com/736x/3b/19/80/3b1980ae78ad4de47eed5bee037c25f6.jpg', revelada: false, esParteDelParObjetivo: false },
    { icono: 'https://static.vecteezy.com/system/resources/thumbnails/008/085/931/small/apple-clip-art-illustration-vector.jpg', revelada: false, esParteDelParObjetivo: true },
    { icono: 'https://png.pngtree.com/png-clipart/20250122/original/pngtree-cute-yellow-cartoon-star-clipart-illustration-png-image_19855052.png', revelada: false, esParteDelParObjetivo: false }
  ];

  cartasSeleccionadasIndices: number[] = [];
  fallosConsecutivos: number = 0;
  
  mensajeFeedback: string | null = null;
  resaltarParCorrecto: boolean = false;
  
  temporizadorInactividad: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    // CONDICIÓN: Inicia conteo regresivo de 8 segundos por falta de interacción
    this.iniciarTemporizadorInactividad();
  }

  ngOnDestroy(): void {
    this.limpiarTemporizador();
  }

  voltearCarta(index: number) {
    // Previene interacciones si la carta ya está abierta o si ya hay un proceso activo
    if (this.estadoCartas[index].revelada || this.cartasSeleccionadasIndices.length >= 2) {
      return;
    }

    this.estadoCartas[index].revelada = true;
    this.cartasSeleccionadasIndices.push(index);
    this.mensajeFeedback = null;
    
    this.cdr.detectChanges();
    this.iniciarTemporizadorInactividad(); // Reinicia los 8 segundos tras interactuar

    // Si ya volteó dos cartas, evaluamos el par
    if (this.cartasSeleccionadasIndices.length === 2) {
      this.evaluarPar();
    }
  }

  evaluarPar() {
    const [idx1, idx2] = this.cartasSeleccionadasIndices;

    if (this.estadoCartas[idx1].icono === this.estadoCartas[idx2].icono) {
      // --- CASO ACUERDO DE PAR CORRECTO ---
      this.limpiarTemporizador();
      this.mensajeFeedback = '¡Bien! ⭐';
      this.fallosConsecutivos = 0;
      this.cartasSeleccionadasIndices = [];
      this.cdr.detectChanges();

      // Si todas las cartas ya están descubiertas o decide avanzar, espera los 2 segundos reglamentarios
      this.ejecutarEsperaYSalida();
    } else {
      // --- CASO ERROR DE PAR ---
      this.fallosConsecutivos++;
      this.limpiarTemporizador();

      setTimeout(() => {
        this.zone.run(() => {
          this.estadoCartas[idx1].revelada = false;
          this.estadoCartas[idx2].revelada = false;
          this.cartasSeleccionadasIndices = [];

          if (this.fallosConsecutivos === 1) {
            this.mensajeFeedback = 'Intenta otra vez';
          } else if (this.fallosConsecutivos >= 2) {
            this.mensajeFeedback = 'Intenta otra vez';
            this.resaltarParCorrecto = true; // Fuerza el resalte del par objetivo ('apple')
          }
          this.cdr.detectChanges();
          this.iniciarTemporizadorInactividad();
        });
      }, 1000); // Pequeña ventana de visualización del error antes de voltearlas boca abajo
    }
  }

  procesarSiguiente() {
    // Si presiona Siguiente de forma proactiva sin completar, el sistema activa la omisión/ayuda
    this.marcarOmisionSistema();
  }

  private marcarOmisionSistema() {
    this.limpiarTemporizador();

    this.zone.run(() => {
      // El sistema auto-revela y resalta el par correcto por el niño
      this.estadoCartas.forEach(carta => {
        if (carta.esParteDelParObjetivo) {
          carta.revelada = true;
        }
      });
      this.mensajeFeedback = '¡Bien! ⭐';
      this.resaltarParCorrecto = false;
      this.cdr.detectChanges();
    });

    this.ejecutarEsperaYSalida();
  }

  private ejecutarEsperaYSalida() {
    // CONDICIÓN: Espera exacta de 2 segundos fijos mostrando el acierto antes de limpiar el canvas
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.avanzarSiguientePantalla();
        });
      }, 2000);
    });
  }

  private iniciarTemporizadorInactividad() {
    this.limpiarTemporizador();
    
    this.zone.runOutsideAngular(() => {
      this.temporizadorInactividad = setTimeout(() => {
        this.marcarOmisionSistema();
      }, 8000); // CONDICIÓN: 8 segundos exactos de inactividad
    });
  }

  private limpiarTemporizador() {
    if (this.temporizadorInactividad) {
      clearTimeout(this.temporizadorInactividad);
    }
  }

  private avanzarSiguientePantalla() {
    console.log('Navegando al siguiente estado del juego...');
    // Inserta aquí tu enrutador local o emisor de salida del módulo TEA
  }
}
