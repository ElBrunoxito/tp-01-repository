import { Component, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUserDTO } from '../../../../../model/User';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';

@Component({
  selector: 'app-t110',
  imports: [],
  templateUrl: './t110.html',
  styleUrl: './t110.css',
})
export class T110 implements OnInit {
  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)


constructor() {}

  ngOnInit(): void {
    console.log('Pantalla final 10/10 iniciada sin barra de navegación.');
  }

  onFinalizar(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,10).subscribe({
      next: (res)=>{
        this.router.navigate(['/app']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    }); 

  }
}