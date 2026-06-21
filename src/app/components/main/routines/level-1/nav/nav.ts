import id from '@angular/common/locales/id';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ResponseUserDTO } from '../../../../../model/User';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';

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

  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)
// Lista estática y fija de las rutas de tu rutina
  stepTitles: Step[] = [
    { id: 11, nombre: 'Saludo y Bienvenida', ruta: '/app/routine/level-1/1' },
    { id: 12, nombre: 'Elección de Actividad', ruta: '/app/routine/level-1/2' },
    { id: 13, nombre: 'Identificación de Colores', ruta: '/app/routine/level-1/3' },
    { id: 14, nombre: 'Juego de Memoria (Pares)', ruta: '/app/routine/level-1/4' },
    { id: 15, nombre: 'Secuencia Lógica Dinámica', ruta: '/app/routine/level-1/5' },
    { id: 16, nombre: 'Resolución de Problema Simple', ruta: '/app/routine/level-1/6' },
    { id: 17, nombre: 'Selección de Objeto', ruta: '/app/routine/level-1/7' },
    { id: 18, nombre: 'Tiempo de Descanso Controlado', ruta: '/app/routine/level-1/8' },
    { id: 19, nombre: 'Clasificación por Categorías', ruta: '/app/routine/level-1/9' },
    { id: 10, nombre: 'Despedida y Cierre', ruta: '/app/routine/level-1/10' }
  ];
constructor() {}

  ngOnInit() {
    const urlSegments = this.router.url.split('/');
    this.currentStep = Number(urlSegments[urlSegments.length - 1]);
    console.warn(this.currentStep)

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
      const proximoPaso = this.stepTitles[proximoId-1]
      if (proximoPaso) {
        const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
        this.routine.registerRoutine(idChild,this.stepTitles[this.currentStep-1].id).subscribe({
          next: (res)=>{
            this.router.navigate([proximoPaso.ruta]);
          },
          error: (err)=>{
            console.error("error al guardar en backend")
          }
        }); 
      }
    }
  }

  navigatePrevious() {
    if (this.currentStep > 1) {
      const idAnterior = this.currentStep - 1;
      const pasoAnterior = this.stepTitles[idAnterior-1]
      
      if (pasoAnterior) {
        const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
        this.routine.registerRoutine(idChild,this.stepTitles[this.currentStep-1].id).subscribe({
          next: (res)=>{
            this.router.navigate([pasoAnterior.ruta]);
          },
          error: (err)=>{
            console.error("error al guardar en backend")
          }
        }); 
      }
    }
  }
}
