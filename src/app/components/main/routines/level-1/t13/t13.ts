import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-t13',
  imports: [NgClass],
  templateUrl: './t13.html',
  styleUrl: './t13.css',
})
export class T13 implements OnInit, OnDestroy {
  colorSeleccionado: string | null = null;
  fallosConsecutivos: number = 0;
  
  // Variables que controlan los textos de aviso y los estilos visuales en el HTML
  mensajeFeedback: string | null = null;
  resaltarCorrecto: boolean = false;
  
  // Guardamos la referencia del setTimeout de 8 segundos
  temporizadorInactividad: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    // CONDICIÓN: Iniciar la cuenta regresiva de 8 segundos apenas carga la pantalla
    this.iniciarTemporizadorInactividad();
  }

  ngOnDestroy(): void {
    this.limpiarTemporizador();
  }

  /**
   * Se ejecuta cuando el niño hace clic en cualquiera de las 4 tarjetas de color
   */
  seleccionarColor(color: string) {
    this.colorSeleccionado = color;
    this.mensajeFeedback = null; // Limpiamos avisos previos al recibir nueva interacción
    
    // Forzamos el renderizado del borde seleccionado inmediatamente
    this.cdr.detectChanges();
    
    // Al haber interacción, reiniciamos el reloj de 8 segundos
    this.iniciarTemporizadorInactividad();
  }

  /**
   * Se ejecuta al presionar el botón "Listo" (o cuando el sistema lo simula)
   */
  procesarRespuesta() {
    // Si da clic a "Listo" sin marcar nada, se cuenta como omisión/no-respuesta inmediata
    if (!this.colorSeleccionado) {
      this.marcarOmisionSistema();
      return;
    }

    if (this.colorSeleccionado === 'rojo') {
      // --- CASO RESPUESTA CORRECTA ---
      this.limpiarTemporizador();
      this.mensajeFeedback = '¡Bien! ⭐';
      this.resaltarCorrecto = false;
      this.fallosConsecutivos = 0;
      
      // Pintamos el "¡Bien! ⭐" en la pantalla en este preciso instante
      this.cdr.detectChanges();

      // CONDICIÓN: Espera exactamente 2 segundos en pantalla antes de saltar a lo siguiente
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.avanzarSiguientePantalla();
          });
        }, 2000);
      });

    } else {
      // --- CASO RESPUESTA INCORRECTA ---
      this.fallosConsecutivos++;

      if (this.fallosConsecutivos === 1) {
        // ❌ Condición 1: Si falla la primera vez -> "Intenta otra vez"
        this.mensajeFeedback = 'Intenta otra vez';
        this.colorSeleccionado = null; // Reseteamos la selección del niño
      } 
      else if (this.fallosConsecutivos >= 2) {
        // ❌ Condición 2: Si repite el fallo -> Mantener aviso + resaltar opción correcta ✨
        this.mensajeFeedback = 'Intenta otra vez';
        this.resaltarCorrecto = true; // Activa la animación del borde rojo grueso en el HTML
        this.colorSeleccionado = null;
      }
      
      // Forzamos actualización visual instantánea del error
      this.cdr.detectChanges();
    }
  }

  /**
   * CONDICIÓN 3: Si pasan 8 segundos sin responder, el sistema auto-marca rojo + "Bien" ⭐
   */
  private marcarOmisionSistema() {
    this.limpiarTemporizador();

    // Envolvemos los cambios dentro de la Zona de Angular para que los detecte con total seguridad
    this.zone.run(() => {
      this.colorSeleccionado = 'rojo'; // El sistema selecciona el cuadro rojo por él
      this.mensajeFeedback = '¡Bien! ⭐';
      this.resaltarCorrecto = false;
      
      this.cdr.detectChanges(); // Repintamos la lona inmediatamente
    });

    // CONDICIÓN: Espera de 2 segundos reglamentarios mostrando el acierto antes de irse
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.avanzarSiguientePantalla();
        });
      }, 2000);
    });
  }

  /**
   * Control y manejo del reloj cognitivo de inactividad
   */
  private iniciarTemporizadorInactividad() {
    this.limpiarTemporizador();
    
    // Corremos el temporizador fuera de Angular para evitar sobrecargar los ciclos internos de la app
    this.zone.runOutsideAngular(() => {
      this.temporizadorInactividad = setTimeout(() => {
        this.marcarOmisionSistema();
      }, 8000); // 8 segundos exactos de espera
    });
  }

  private limpiarTemporizador() {
    if (this.temporizadorInactividad) {
      clearTimeout(this.temporizadorInactividad);
    }
  }

  /**
   * Acción de salida una vez transcurridos los 2 segundos de éxito
   */
  private avanzarSiguientePantalla() {
    console.log('Cambiando a la siguiente actividad del flujo...');
    // Aquí ejecutas la lógica que desees para continuar (ej: emitir un evento al padre, cambiar un flag local, etc.)
  }
}