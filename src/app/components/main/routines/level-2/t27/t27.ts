import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUserDTO } from '../../../../../model/User';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';

interface TarjetaSecuencia {
  id: string;
  nombre: string;
  icono: string;
  ordenCorrecto: number; // Su posición real en el proceso (1 al 4)
}

interface ZonaDestino {
  paso: number;
  elementoContenido: TarjetaSecuencia | null;
}

@Component({
  selector: 'app-t27',
  imports: [NgClass],
  templateUrl: './t27.html',
  styleUrl: './t27.css',
})
export class T27 implements OnInit {

  // Definición de las tarjetas iniciales mezcladas/banco
  bancoTarjetas: TarjetaSecuencia[] = [
    { id: 'soap', nombre: 'Jabón', icono: 'soap', ordenCorrecto: 2 },
    { id: 'dry', nombre: 'Secar', icono: 'dry_cleaning', ordenCorrecto: 4 },
    { id: 'rub', nombre: 'Frotar', icono: 'front_hand', ordenCorrecto: 3 }
  ];

  // Las 4 zonas de destino del Workspace. El Paso 1 ya viene completado según tu HTML
  zonasDestino: ZonaDestino[] = [
    { paso: 1, elementoContenido: { id: 'water', nombre: 'Abrir agua', icono: 'water_drop', ordenCorrecto: 1 } },
    { paso: 2, elementoContenido: null },
    { paso: 3, elementoContenido: null },
    { paso: 4, elementoContenido: null }
  ];
  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)

  // Controles adaptativos
  conteoErrores: number = 0;
  mostrarGuiaAyuda: boolean = false;
  actividadCompletada: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Componente de Secuencia cargado en paso 7/10.');
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault(); // Permite la acción de soltar el elemento
  }

  onDragStart(event: DragEvent, tarjeta: TarjetaSecuencia): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', JSON.stringify(tarjeta));
    }
  }

  /**
   * Maneja el evento de soltar la tarjeta en una zona específica.
   */
  onDrop(event: DragEvent, numeroPasoDestino: number): void {
    event.preventDefault();
    if (!event.dataTransfer) return;

    const dataRaw = event.dataTransfer.getData('text/plain');
    if (!dataRaw) return;

    const tarjetaArrastrada: TarjetaSecuencia = JSON.parse(dataRaw);
    const zonaDestino = this.zonasDestino.find(z => z.paso === numeroPasoDestino);

    if (!zonaDestino || zonaDestino.elementoContenido !== null) return;

    // CONDICIÓN: Verificar si corresponde exactamente al orden correcto
    if (tarjetaArrastrada.ordenCorrecto === numeroPasoDestino) {
      
      // Éxito: Se aloja en el workspace y se elimina del banco de disponibles
      zonaDestino.elementoContenido = tarjetaArrastrada;
      this.bancoTarjetas = this.bancoTarjetas.filter(t => t.id !== tarjetaArrastrada.id);
      
      this.verificarEstadoFinal();
      this.cdr.detectChanges();

    } else {
      // ❌ CONDICIÓN: Si falla -> El elemento regresa automáticamente al banco (No se agrega a la zona)
      this.conteoErrores++;
      console.log(`Paso incorrecto colocado en la zona ${numeroPasoDestino}. Total errores: ${this.conteoErrores}`);

      // ❌ CONDICIÓN: Si repite error (más de 1 fallo) -> Mostrar guía visual estricta TEACCH
      if (this.conteoErrores >= 2) {
        this.mostrarGuiaAyuda = true;
      }
      
      this.cdr.detectChanges();
    }
  }

  /**
   * Devuelve el nombre del paso que va en ese casillero para guiar visualmente al alumno.
   */
  getNombrePasoCorrecto(paso: number): string {
    if (paso === 2) return 'Jabón';
    if (paso === 3) return 'Frotar';
    if (paso === 4) return 'Secar';
    return '';
  }

  /**
   * Evalúa si todas las zonas fueron completadas secuencialmente de forma correcta.
   */
  private verificarEstadoFinal(): void {
    const todasLlenas = this.zonasDestino.every(z => z.elementoContenido !== null);
    if (todasLlenas) {
      this.actividadCompletada = true;
      this.mostrarGuiaAyuda = false; // Remueve guías de error al ganar
      console.log('Secuencia completada correctamente. Botón Siguiente habilitado en Azul.');
    }
  }

  onSiguiente(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,27).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-2/8']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 
  }

  onListo(): void {
    if (this.actividadCompletada) {
      this.onSiguiente()
    }
  }
}
