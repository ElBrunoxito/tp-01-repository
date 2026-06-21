import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

interface PasoSecuencia {
  id: string;
  titulo: string;
  imgUrl: string;
  ordenCorrectoIndex: number; // Posición reglamentaria (0-3)
  colocado: boolean;
}

interface SlotDestino {
  pasoContenido: PasoSecuencia | null;
  imgUrl: string;
}

@Component({
  selector: 'app-t15',
  imports: [NgClass],
  templateUrl: './t15.html',
  styleUrl: './t15.css',
})
export class T15 implements OnInit, OnDestroy {

  // Definición ordenada de la secuencia real (TEACCH / Rutina diaria)
  pasosOrigen: PasoSecuencia[] = [
    { id: 'cepillar', titulo: 'Cepillar', imgUrl:'https://static.vecteezy.com/system/resources/previews/015/209/275/non_2x/toothbrush-with-toothpaste-icon-cartoon-style-vector.jpg', ordenCorrectoIndex: 2, colocado: false },
    { id: 'enjuagar', titulo: 'Enjuagar', imgUrl:'https://thumbs.dreamstime.com/b/ilustraci%C3%B3n-de-dibujos-animados-dise%C3%B1o-lavar-las-manos-con-agua-para-evitar-g%C3%A9rmenes-lavarse-sobre-fondo-blanco-199712152.jpg',  ordenCorrectoIndex: 0, colocado: false },
    { id: 'limpiar', titulo: 'Limpiar', imgUrl:'https://us.123rf.com/450wm/djvstock/djvstock2006/djvstock200662193/150365688-limpieza-de-manos-con-toalla-sobre-fondo-blanco-dise%C3%B1o-de-ilustraciones-vectoriales.jpg?ver=6', ordenCorrectoIndex: 3, colocado: false },
    { id: 'pasta', titulo: 'Poner pasta', imgUrl:'https://static.vecteezy.com/system/resources/previews/029/310/770/non_2x/cartoon-illustration-toothpaste-and-toothbrush-icon-in-doodle-style-vector.jpg',  ordenCorrectoIndex: 1, colocado: false }
  ];

  // Cuatro espacios inicializados vacíos
  slotsDestino: SlotDestino[] = [
    { pasoContenido: null, imgUrl:'https://thumbs.dreamstime.com/b/ilustraci%C3%B3n-de-dibujos-animados-dise%C3%B1o-lavar-las-manos-con-agua-para-evitar-g%C3%A9rmenes-lavarse-sobre-fondo-blanco-199712152.jpg'},
    { pasoContenido: null, imgUrl: 'https://static.vecteezy.com/system/resources/previews/029/310/770/non_2x/cartoon-illustration-toothpaste-and-toothbrush-icon-in-doodle-style-vector.jpg'},
    { pasoContenido: null, imgUrl:'https://static.vecteezy.com/system/resources/previews/015/209/275/non_2x/toothbrush-with-toothpaste-icon-cartoon-style-vector.jpg' },
    { pasoContenido: null, imgUrl:'https://us.123rf.com/450wm/djvstock/djvstock2006/djvstock200662193/150365688-limpieza-de-manos-con-toalla-sobre-fondo-blanco-dise%C3%B1o-de-ilustraciones-vectoriales.jpg?ver=6' }
  ];

  pasoSeleccionadoId: string | null = null;
  fallosConsecutivos: number = 0;
  
  mensajeFeedback: string | null = null;
  resaltarSlotCorrecto: number | null = null; // Almacena el índice del casillero a iluminar
  
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
   * Acción 1: Seleccionar una tarjeta del banco de origen
   */
  seleccionarPasoOrigen(id: string) {
    this.pasoSeleccionadoId = id;
    this.mensajeFeedback = null;
    
    // Al seleccionar, se asume un intento de colocación en el primer slot libre disponible
    const primerSlotLibreIndex = this.slotsDestino.findIndex(s => s.pasoContenido === null);
    
    if (primerSlotLibreIndex !== -1) {
      this.ubicarPasoEnSlot(id, primerSlotLibreIndex);
    }
  }

  /**
   * Colocación y evaluación de correspondencia inmediata
   */
  private ubicarPasoEnSlot(pasoId: string, slotIndex: number) {
    const pasoIdxOrigen = this.pasosOrigen.findIndex(p => p.id === pasoId);
    const paso = this.pasosOrigen[pasoIdxOrigen];

    // REGLA CLAVE: Validar si la posición elegida corresponde a su orden académico real
    if (paso.ordenCorrectoIndex === slotIndex) {
      // --- ACIERTO DE UBICACIÓN ---
      this.slotsDestino[slotIndex].pasoContenido = paso;
      paso.colocado = true;
      this.pasoSeleccionadoId = null;
      this.resaltarSlotCorrecto = null; // Removemos guía de ayuda si existía
      this.fallosConsecutivos = 0;
    } else {
      // --- ❌ CONDICIÓN: SI FALLA -> EL ELEMENTO REGRESA ---
      this.fallosConsecutivos++;
      this.pasoSeleccionadoId = null;
      this.slotsDestino[slotIndex].pasoContenido = null; // Asegura que se limpie el destino
      paso.colocado = false; // El elemento se queda en el origen

      this.mensajeFeedback = 'Intenta otra vez';

      // --- ❌ CONDICIÓN: SI REPETIR -> MOSTRAR GUÍA VISUAL ---
      if (this.fallosConsecutivos >= 2) {
        // Apunta al casillero exacto donde DEBERÍA ir este elemento que acaba de fallar
        this.resaltarSlotCorrecto = paso.ordenCorrectoIndex;
      }
    }

    this.cdr.detectChanges();
    this.iniciarTemporizadorInactividad();
  }

  /**
   * Permite revertir de forma manual desbancando un slot ocupado
   */
  retirarPasoDelSlot(slotIndex: number) {
    const pasoEnSlot = this.slotsDestino[slotIndex].pasoContenido;
    if (!pasoEnSlot) return;

    const idxOrigen = this.pasosOrigen.findIndex(p => p.id === pasoEnSlot.id);
    this.pasosOrigen[idxOrigen].colocado = false;
    this.slotsDestino[slotIndex].pasoContenido = null;
    
    this.mensajeFeedback = null;
    this.cdr.detectChanges();
    this.iniciarTemporizadorInactividad();
  }

  /**
   * Accionador del botón "Listo"
   */
  validarSecuenciaCompleta() {
    const todasColocadas = this.slotsDestino.every(s => s.pasoContenido !== null);

    if (todasColocadas) {
      this.limpiarTemporizador();
      this.mensajeFeedback = '¡Bien! ⭐';
      this.resaltarSlotCorrecto = null;
      this.cdr.detectChanges();

      // Espera reglamentaria de 2 segundos antes de saltar la lona
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.avanzarSiguientePantalla();
          });
        }, 2000);
      });
    } else {
      // Si presiona Listo estando incompleto se procesa como omisión asistida
      this.marcarOmisionSistema();
    }
  }

  /**
   * Inactividad de 8 segundos o salto forzado de ayuda
   */
  private marcarOmisionSistema() {
    this.limpiarTemporizador();

    this.zone.run(() => {
      // El sistema auto-construye la secuencia en su orden correcto de forma guiada
      this.slotsDestino.forEach((slot, index) => {
        const pasoCorrecto = this.pasosOrigen.find(p => p.ordenCorrectoIndex === index);
        if (pasoCorrecto) {
          slot.pasoContenido = pasoCorrecto;
          pasoCorrecto.colocado = true;
        }
      });

      this.mensajeFeedback = '¡Bien! ⭐';
      this.resaltarSlotCorrecto = null;
      this.pasoSeleccionadoId = null;
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
        this.marcarOmisionSistema();
      }, 8000); // 8 Segundos exactos de reloj cognitivo
    });
  }

  private limpiarTemporizador() {
    if (this.temporizadorInactividad) {
      clearTimeout(this.temporizadorInactividad);
    }
  }

  private avanzarSiguientePantalla() {
    console.log('Secuencia resuelta. Transicionando a la pantalla 6/10...');
  }

}
