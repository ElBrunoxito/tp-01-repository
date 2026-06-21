import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';
import { ResponseUserDTO } from '../../../../../model/User';

@Component({
  selector: 'app-t26',
  imports: [],
  templateUrl: './t26.html',
  styleUrl: './t26.css',
})
export class T26 implements OnInit {

  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)

  constructor() {}

  ngOnInit(): void {
    console.log('Pantalla de refuerzo TEACCH cargada. Solo estrella y botones activos.');
  }

  /**
   * Condición: Presionar Siguiente para avanzar.
   */
  onSiguiente(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,26).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-2/7']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 
  }

  onListo(): void {
    this.onSiguiente()

  }
}