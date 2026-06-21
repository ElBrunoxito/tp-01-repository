import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';
import { ResponseUserDTO } from '../../../../../model/User';

@Component({
  selector: 'app-t22',
  imports: [],
  templateUrl: './t22.html',
  styleUrl: './t22.css',
})
export class T22 {
  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)
  
  constructor() {}

  onContinuar(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,22).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-2/3']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 
  }

}
