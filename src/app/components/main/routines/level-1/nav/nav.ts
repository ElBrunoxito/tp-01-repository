import id from '@angular/common/locales/id';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

interface Step {
  id:number | string,
  nombre: string,
  ruta: string
}

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 10;
  progressPercentage: number = 10;

// Lista estática y fija de las rutas de tu rutina
  stepTitles: Step[] = [
    { id: 1, nombre: 'Saludo y Bienvenida', ruta: '/app/routine/level-1/1' },
    { id: 2, nombre: 'Elección de Actividad', ruta: '/app/routine/level-1/2' },
    { id: 3, nombre: 'Identificación de Colores', ruta: '/app/routine/level-1/3' },
    { id: 4, nombre: 'Juego de Memoria (Pares)', ruta: '/app/routine/level-1/4' },
    { id: 5, nombre: 'Secuencia Lógica Dinámica', ruta: '/app/routine/level-1/5' },
    { id: 6, nombre: 'Resolución de Problema Simple', ruta: '/app/routine/level-1/6' },
    { id: 7, nombre: 'Selección de Objeto', ruta: '/app/routine/level-1/7' },
    { id: 8, nombre: 'Tiempo de Descanso Controlado', ruta: '/app/routine/level-1/8' },
    { id: 9, nombre: 'Clasificación por Categorías', ruta: '/app/routine/level-1/9' },
    { id: 10, nombre: 'Despedida y Cierre', ruta: '/app/routine/level-1/10' }
  ];
constructor(private router: Router) {}

  ngOnInit() {
    // Escuchamos el router para sincronizar el paso visual con la URL actual
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateStepByRoute(event.urlAfterRedirects);
      }
    });
  }

  private updateStepByRoute(url: string) {
    // Extrae el último número de la URL (ej: /1, /2, ... /10)
    const match = url.match(/\/(\d+)$/);
    
    if (match) {
      // Seteamos el paso actual directamente con el número que viene en la ruta
      this.currentStep = parseInt(match[1], 10);
      this.progressPercentage = (this.currentStep / this.totalSteps) * 100;
    }
  }

  getStepTitle(): string {
    // Buscamos el nombre correspondiente al ID del paso actual
    const pasoActual = this.stepTitles.find(step => step.id === this.currentStep);
    return pasoActual ? pasoActual.nombre : 'Actividad Estructurada';
  }

  // Navegación lineal simple basada en el ID del paso
  navigateNext() {
    if (this.currentStep < this.totalSteps) {
      const proximoId = this.currentStep + 1;
      const proximoPaso = this.stepTitles.find(step => step.id === proximoId);
      
      if (proximoPaso) {
        this.router.navigate([proximoPaso.ruta]);
      }
    }
  }

  navigatePrevious() {
    if (this.currentStep > 1) {
      const idAnterior = this.currentStep - 1;
      const pasoAnterior = this.stepTitles.find(step => step.id === idAnterior);
      
      if (pasoAnterior) {
        this.router.navigate([pasoAnterior.ruta]);
      }
    }
  }
}
