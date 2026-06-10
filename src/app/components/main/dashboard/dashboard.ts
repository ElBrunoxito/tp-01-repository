import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {
  
  // Propiedades reactivas del Paciente y Progreso
  currentProgress! : number;
  animateBars: boolean = false;

  social!: number;
  communication!: number;
  motor!: number;
  cognitive!: number;
  
  nameChild!: string;
  levelChild!: number;
  ageChild!: number;

  router = inject(Router)

  constructor() {}

  ngOnInit(): void {
    // Inicialización de los datos clínicos de la vista
    this.currentProgress = 45;

    this.nameChild = 'Salazar Garcia';
    this.ageChild = 6;
    this.levelChild = 1;
    
    this.social = 68;
    this.communication = 72;
    this.motor = 55;
    this.cognitive = 80;
  }

  ngAfterViewInit(): void {
    // Retardo controlado para ejecutar de forma fluida las barras de competencias en pantalla
    setTimeout(() => {
      this.animateBars = true;
    }, 100);
  }

  /**
   * Ejecuta operaciones rápidas de negocio en el panel
   */
  triggerAction(actionType: string): void {
    console.log(`Acción del panel derecho ejecutada: [${actionType}]`);
    if(actionType === "new-routine"){
      this.router.navigate([`/app/routine/level-${this.levelChild}`]);
    }
  }
}
