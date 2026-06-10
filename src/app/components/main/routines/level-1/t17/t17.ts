import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

interface OpcionLectura {
  id: string;
  texto: string;
  esCorrecta: boolean;
}

@Component({
  selector: 'app-t17',
  imports: [NgClass],
  templateUrl: './t17.html',
  styleUrl: './t17.css',
})
export class T17 implements OnInit, OnDestroy {

  opcionesLectura: OpcionLectura[] = [
    { id: 'platano', texto: 'Plátano', esCorrecta: false },
    { id: 'manzana', texto: 'Manzana', esCorrecta: true }, // Respuesta Target
    { id: 'pera', texto: 'Pera', esCorrecta: false },
    { id: 'naranja', texto: 'Naranja', esCorrecta: false }
  ];

  opcionSeleccionadaId: string | null = null;
  fallosConsecutivos: number = 0;
  
  mensajeFeedback: string | null = null;
  activarPistaVisual: boolean = false;
  mostrarSolucionAsistida: boolean = false;
  bloquearInteraccion: boolean = false;
  
  temporizadorInactividad: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.iniciarTemporizadorInactividad();
  }

  ngOnDestroy(): void {
    this.limpiarTemporizador();
  }

  /**
   * Procesa la selección del bloque de respuesta de texto
   */
  evaluarRespuesta(id: string) {
    if (this.bloquearInteraccion) return;
    
    this.opcionSeleccionadaId = id;
    const opcion = this.opcionesLectura.find(o => o.id === id);

    if (opcion && opcion.esCorrecta) {
      // --- ACIERTO ---
      this.fallosConsecutivos = 0;
      this.activarPistaVisual = false;
      this.mensajeFeedback = '¡Bien! ⭐';
      this.procesarAvanceExitoso();
    } else {
      // --- ❌ CONDICIÓN: SI FALLA -> MUESTRA "Intenta otra vez" ---
      this.fallosConsecutivos++;
      this.opcionSeleccionadaId = null; // Quita la selección errónea del casillero destino
      this.mensajeFeedback = 'Intenta otra vez';

      // --- ❌ CONDICIÓN: SI REPETIR -> MOSTRAR RESALTE EN LA CORRECTA ---
      if (this.fallosConsecutivos >= 2) {
        this.activarPistaVisual = true;
      }
      
      this.cdr.detectChanges();
      this.iniciarTemporizadorInactividad();
    }
  }

  /**
   * Manejador del botón "Luego" (Siguiente) de la Navbar
   */
  presionarBotonListo() {
    if (this.bloquearInteraccion) return;

    if (this.opcionSeleccionadaId === 'manzana') {
      this.procesarAvanceExitoso();
    } else {
      // Si intenta forzar el avance sin responder, cuenta como fallo
      this.evaluarRespuesta('omision_manual_navbar');
    }
  }

  /**
   * Flujo de salida exitosa: 2 segundos fijos mostrando el acierto
   */
  private procesarAvanceExitoso() {
    this.limpiarTemporizador();
    this.bloquearInteraccion = true;
    this.mensajeFeedback = '¡Bien! ⭐';
    this.cdr.detectChanges();

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.avanzarSiguientePantalla();
        });
      }, 2000); // 2 segundos fijos de feedback positivo reglamentario
    });
  }

  /**
   * Omisión Asistida automática por Inactividad de 8 segundos
   */
  private ejecutarOmisionPorInactividad() {
    this.limpiarTemporizador();
    this.zone.run(() => {
      this.bloquearInteraccion = true;
      this.mostrarSolucionAsistida = true; // Auto-escribe "Manzana" en el target
      this.activarPistaVisual = false;
      this.opcionSeleccionadaId = null;
      this.mensajeFeedback = '¡Bien! ⭐';
      this.cdr.detectChanges();
    });

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
        this.ejecutarOmisionPorInactividad();
      }, 8000); // 8 segundos de reloj cognitivo TEACCH
    });
  }

  private limpiarTemporizador() {
    if (this.temporizadorInactividad) {
      clearTimeout(this.temporizadorInactividad);
    }
  }

  private avanzarSiguientePantalla() {
    console.log('Nivel 7/10 completado con éxito. Transicionando a la pantalla 8/10...');
  }

}
