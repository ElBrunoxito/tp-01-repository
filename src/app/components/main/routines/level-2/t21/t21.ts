import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';
import { ResponseUserDTO } from '../../../../../model/User';

@Component({
  selector: 'app-t21',
  imports: [],
  templateUrl: './t21.html',
  styleUrl: './t21.css',
})
export class T21 {
  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)
  constructor() {}

  onSiguiente(): void {
    this.onListo()
  }

  onListo(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,21).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-2/2']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 

  }
}
