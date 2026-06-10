import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

interface OpcionPatron {
  id: string;
  forma: 'rombo' | 'cuadrado' | 'circulo_rojo' | 'circulo_verde';
  esCorrecta: boolean;
}

@Component({
  selector: 'app-t16',
  imports: [NgClass],
  templateUrl: './t16.html',
  styleUrl: './t16.css',
})
export class T16 implements OnInit, OnDestroy {

  opcionesRespuesta: OpcionPatron[] = [
    { id: 'rombo_amarillo', forma: 'rombo', esCorrecta: false },
    { id: 'cuadrado_azul', forma: 'cuadrado', esCorrecta: true }, // Respuesta Target
    { id: 'circulo_rojo', forma: 'circulo_rojo', esCorrecta: false },
    { id: 'circulo_verde', forma: 'circulo_verde', esCorrecta: false }
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
   * Gestión de selección y evaluación de respuestas inmediatas
   */
  evaluarRespuesta(id: string) {
    if (this.bloquearInteraccion) return;
    
    this.opcionSeleccionadaId = id;
    const opcion = this.opcionesRespuesta.find(o => o.id === id);

    if (opcion && opcion.esCorrecta) {
      // --- ACIERTO ---
      this.fallosConsecutivos = 0;
      this.activarPistaVisual = false;
      this.mensajeFeedback = '¡Bien! ⭐';
      this.procesarAvanceExitoso();
    } else {
      // --- ❌ CONDICIÓN: SI FALLA -> MUESTRA "Intenta otra vez" ---
      this.fallosConsecutivos++;
      this.opcionSeleccionadaId = null; // Deselecciona el elemento erróneo
      this.mensajeFeedback = 'Intenta otra vez';

      // --- ❌ CONDICIÓN: SI REPETIR -> MOSTRAR PISTA VISUAL ---
      if (this.fallosConsecutivos >= 2) {
        this.activarPistaVisual = true;
      }
      
      this.cdr.detectChanges();
      this.iniciarTemporizadorInactividad();
    }
  }

  /**
   * Accionador del botón central "Listo" en la Navbar
   */
  presionarBotonListo() {
    if (this.bloquearInteraccion) return;

    if (this.opcionSeleccionadaId === 'cuadrado_azul') {
      this.procesarAvanceExitoso();
    } else {
      // Forzar evaluación de fallo por intentar avanzar de manera incorrecta o vacía
      this.evaluarRespuesta('omision_manual');
    }
  }

  /**
   * Pipeline de salida exitosa con delay reglamentario de 2 segundos
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
      }, 2000); // 2 Segundos fijos de feedback positivo
    });
  }

  /**
   * Gestión de Omisión Asistida por Inactividad (8 segundos)
   */
  private ejecutarOmisionPorInactividad() {
    this.limpiarTemporizador();
    this.zone.run(() => {
      this.bloquearInteraccion = true;
      this.mostrarSolucionAsistida = true;
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
      }, 8000); // 8 Segundos exactos de reloj cognitivo TEACCH
    });
  }

  private limpiarTemporizador() {
    if (this.temporizadorInactividad) {
      clearTimeout(this.temporizadorInactividad);
    }
  }

  private avanzarSiguientePantalla() {
    console.log('Nivel 6/10 superado con éxito. Transicionando a la pantalla 7/10...');
  }
}
