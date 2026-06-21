import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUserDTO } from '../../../../../model/User';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';

interface BloqueSecuencia {
  id: number;
  posicionCorrecta: number; // 0 para el Espacio 1, 1 para el Espacio 2, 2 para el Espacio 3
  imgUrl: string;
  alt: string;
}

@Component({
  selector: 'app-t39',
  imports: [NgClass],
  templateUrl: './t39.html',
  styleUrl: './t39.css',
})
export class T39 implements OnInit, OnDestroy {
  // TEXTO DE INSTRUCCIÓN DINÁMICO
  instructionText: string = 'Ordena la secuencia';

  // BANCO DE BLOQUES DISPONIBLES (ZONA SUPERIOR)
  bloquesArriba: (BloqueSecuencia | null)[] = [
    { id: 391, posicionCorrecta: 0, imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzDlcVDIlXmOzfTBlpqXyv7rpSi1fqkdUN0MGIHWC_H7qe2gVeC4cNAU-Be5nzJJzHT6jNfg75Q4qqzL6xl-BxM73QGMBVtcbn3V8HhMeQwbx-OGV0DhYu7AHNadBCTpGNks3TDv4SfUWwcbGpHjyHtKMDu4cvVDMj9F1BaT7ZW_7HpRs3zz78SYWzC-AGx3AwDDJ4V_ntE5t_M5AmAyYrhIFvDr-r4DZWjz8xbHAXpwx0R7rxYbilVGzWLiuqtOlYmr0cpMWtQys', alt: '1' },
    { id: 392, posicionCorrecta: 2, imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpJeenzmMEx8Ykgi-0twZk3S74OQ1CGBrRu_gJo9ZmmEsr71pO22ffVd8iHITh3r6CYYH9jGO_cYJmSoeB6LKpyKB5ZYGieKeB_1R_4SvbhoW2UZ_f0JoC051-hJ5R8-yy5cTVXjkJiajTpdzJB3t1Nbl3AUXfSHutXZ8PqbCaLv0VnGRXKa_01Vbx_i2wpnPvK1NCzRbf1OpY7u7ZIFK7tF0Gk95XvAYW7tutrwo_wyY6hZdiQxO8_vTn8mntUj4Y6aGfYWxpSeE', alt: '3' },
    { id: 393, posicionCorrecta: 1, imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtTxWKkHYOYihCUhpP5P1c_aLErper266neUGykP-dlmlpat2bRMMPObIArOKjD1EWpsgf11KLgNwUxZiVDx27WYrjbs4k23XTkSQKtDIuLD0f6IdQ41fPAIlZ-Aw3KMnvNUJ3WOEHdTNXQq_QCxdGKkK65JfcjWPK3ST1zFgpR1qo_mRbOSzWFL0bPzsCxEZ-C3jrO8dB5oGD5H5spNADGY2QWw5WheWEAlqsGN4JT1ZhTgeyfc7Cy0vasEi-kQYy1rRo9DqqjDs', alt: '2' }
  ];

  // ESPACIOS DE DESTINO (ZONA INFERIOR: POSICIONES 1, 2 Y 3)
  espaciosAbajo: (BloqueSecuencia | null)[] = [null, null, null];

  // LOGICA SENSORIAL Y DE CONTROL COGNITIVO TEACCH
  intentosFallidos: number = 0;
  isSystemSolving: boolean = false;         // Bloqueo total por éxito o auto-resolución
  idBloqueErroneo: number | null = null;    // Para detonar la animación de regreso/sacudida arriba
  indiceResaltadoGlow: number | null = null;// Indica qué casillero de abajo brillará ante repetidos fallos ✨

  // TEMPORIZADORES REACTIVOS
  inactivityTimer: any;
  navigationTimer: any;                     
  consoleTimer: any;
  bounceTimer: any;
  segundosTranscurridos: number = 0;

  readonly NO_RESPONSE_LIMIT = 8000;       // ⚡ Límite exacto de 8 segundos por inactividad
  readonly WAIT_TIME_BEFORE_NAV = 2000;     // ⚡ Retención visual de 2 segundos antes de cambiar de pantalla

  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)
  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.resetAndStartTimer();
  }

  ngOnDestroy() {
    this.clearAllTimers();
  }

  /**
   * Ejecutada al hacer clic en un bloque de arriba para moverlo abajo
   */
  onSeleccionarBloque(bloque: BloqueSecuencia, indexArriba: number): void {
    if (this.isSystemSolving || this.idBloqueErroneo !== null) return;

    // Encontrar el primer espacio libre disponible abajo (de izquierda a derecha)
    const primerEspacioLibre = this.espaciosAbajo.findIndex(slot => slot === null);

    if (primerEspacioLibre === -1) return; // Si ya se ocuparon todos, no procesa más clics

    // VALIDACIÓN: ¿El bloque coincide con la posición del casillero libre actual?
    if (bloque.posicionCorrecta === primerEspacioLibre) {
      console.log(`🎉 ¡Acierto manual! Bloque colocado en el Espacio ${primerEspacioLibre + 1} a los ${this.segundosTranscurridos}s.`);
      
      // Mover físicamente el objeto
      this.espaciosAbajo[primerEspacioLibre] = bloque;
      this.bloquesArriba[indexArriba] = null;
      
      // Resetear estados de error locales
      this.indiceResaltadoGlow = null;
      this.intentosFallidos = 0;
      this.instructionText = '¡Excelente!';
      this.resetAndStartTimer(); // Reiniciamos ventana de inactividad para el siguiente bloque libre

      // Verificar si con este acierto ya se completaron los 3 espacios de la secuencia
      this.evaluarFinDeActividad();

    } else {
      // ❌ FALLÓ: El bloque no corresponde a este espacio disponible
      this.intentosFallidos++;
      console.warn(`❌ Error. Se intentó colocar en Espacio ${primerEspacioLibre + 1} pero correspondía al Espacio ${bloque.posicionCorrecta + 1}`);

      this.resetAndStartTimer();

      if (this.intentosFallidos === 1) {
        this.instructionText = 'Intenta otra vez';
        this.triggerBounceBack(bloque.id); // ❌ Condición 1: Objeto regresa
      } else if (this.intentosFallidos >= 2) {
        this.instructionText = 'Intenta otra vez';
        this.triggerBounceBack(bloque.id);
        // ❌ Condición 2: Si repite -> Resaltar la posición de abajo donde REALMENTE debe ir el bloque seleccionado
        this.indiceResaltadoGlow = bloque.posicionCorrecta;
      }
    }
    this.cdr.detectChanges();
  }

  /**
   * Verifica si los 3 espacios de abajo ya están completos para gatillar la transición final
   */
  evaluarFinDeActividad(): void {
    const totalCompletados = this.espaciosAbajo.filter(slot => slot !== null).length;
    if (totalCompletados === 3) {
      this.clearAllTimers();
      this.isSystemSolving = true; // Bloquea todo
      this.instructionText = '¡Secuencia completa!';
      this.cdr.detectChanges();

      // ⏱️ 2 segundos fijos de retención visual antes de avanzar de página
      this.navigationTimer = setTimeout(() => {
        this.zone.run(() => {
          this.navegarASiguientePantalla();
        });
      }, this.WAIT_TIME_BEFORE_NAV);
    }
  }

  /**
   * Genera el efecto visual de que el bloque no se mueve y regresa automáticamente sacudiéndose
   */
  triggerBounceBack(elementId: number): void {
    this.idBloqueErroneo = elementId;
    this.cdr.detectChanges();

    this.bounceTimer = setTimeout(() => {
      this.idBloqueErroneo = null;
      this.cdr.detectChanges();
    }, 450);
  }

  /**
   * Administrador del temporizador reactivo por inactividad (8 segundos)
   */
  resetAndStartTimer(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
    this.segundosTranscurridos = 0;

    this.zone.run(() => {
      this.consoleTimer = setInterval(() => {
        this.segundosTranscurridos++;
        console.log(`⏱️ Inactividad Ordenar Secuencia: ${this.segundosTranscurridos}s`);
        this.cdr.detectChanges();
      }, 1000);
    });

    // ❌ Condición 3: Si no responde en 8s -> El sistema coloca automáticamente el bloque correcto restante
    this.inactivityTimer = setTimeout(() => {
      this.zone.run(() => {
        clearInterval(this.consoleTimer);
        
        console.warn('🤖 Alarma de inactividad (8s). El sistema autocompleta la secuencia actual.');
        this.isSystemSolving = true;
        this.indiceResaltadoGlow = null;
        this.instructionText = 'Bien hecho ⭐';

        // Autocompletar secuencialmente todos los espacios vacíos de abajo con sus bloques correspondientes
        this.espaciosAbajo.forEach((slot, indexAbajo) => {
          if (slot === null) {
            const bloqueCorrecto = this.bloquesArriba.find(b => b !== null && b.posicionCorrecta === indexAbajo);
            if (bloqueCorrecto) {
              this.espaciosAbajo[indexAbajo] = bloqueCorrecto;
              const indexArriba = this.bloquesArriba.findIndex(b => b?.id === bloqueCorrecto.id);
              if (indexArriba !== -1) this.bloquesArriba[indexArriba] = null;
            }
          }
        });

        this.cdr.detectChanges();

        // ⏱️ Espera reglamentaria de 2 segundos tras el autocompletado del sistema
        this.navigationTimer = setTimeout(() => {
          this.zone.run(() => {
            this.navegarASiguientePantalla();
          });
        }, this.WAIT_TIME_BEFORE_NAV);

      });
    }, this.NO_RESPONSE_LIMIT);
  }

  navegarASiguientePantalla(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,39).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-3/10']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 
  }

  clearAllTimers(): void {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.navigationTimer) clearTimeout(this.navigationTimer);
    if (this.bounceTimer) clearTimeout(this.bounceTimer);
    if (this.consoleTimer) clearInterval(this.consoleTimer);
  }
}
