import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';
import { ResponseUserDTO } from '../../../../../model/User';

@Component({
  selector: 'app-t11',
  imports: [NgClass],
  templateUrl: './t11.html',
  styleUrl: './t11.css',
})
export class T11{
  highlightStartBtn: boolean = false;
  omissionAttempts: number = 0;
  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)

  constructor(){
    
  }
  startFlow() {
    this.highlightStartBtn = false;
    this.omissionAttempts = 0;
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,11).subscribe({
      next: (res)=>{
        this.router.navigate(['/app/routine/level-1/2']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 

  }

  // Si el sistema detecta que el usuario no avanzó, se gatilla este resalte
  simulateNoAction() {
    this.omissionAttempts++;
    this.highlightStartBtn = true;
  }
}
