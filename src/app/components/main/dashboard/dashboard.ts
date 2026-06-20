import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO } from '../../../model/User';

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

  memory!: number;
  association!: number;
  logicalSequencing!: number;
  classification!: number;
  attention!:number

  nameChild!: string;
  levelChild!: number;
  ageChild!: number;



  router = inject(Router)
  storage = inject(StorageService)

  constructor() {}

  ngOnInit(): void {
    // Inicialización de los datos clínicos de la vista


    this.currentProgress = 0;
    const user:ResponseUserDTO = this.storage.getUser()
    this.nameChild = user.nameChild;
    this.ageChild = user.ageChild;
    this.levelChild = user.levelTEA;
    
    this.memory = 68;
    this.association = 72;
    this.logicalSequencing = 55;
    this.classification = 80;
    this.attention = 50
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
