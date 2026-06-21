import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUserDTO } from '../../../../../model/User';
import { RoutineService } from '../../../../../service/routine-service';
import { StorageService } from '../../../../../service/storage-service';

@Component({
  selector: 'app-t210',
  imports: [],
  templateUrl: './t210.html',
  styleUrl: './t210.css',
})
export class T210 implements OnInit {
  routine = inject(RoutineService)
  storage = inject(StorageService)
  router = inject(Router)



  constructor() {}

  ngOnInit(): void {
    console.log('Pantalla final 10/10 iniciada sin barra de navegación.');
  }

  onFinalizar(): void {
    const idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.registerRoutine(idChild,20).subscribe({
      next: (res)=>{
        this.router.navigate(['/app']);
      },
      error: (err)=>{
        console.error("error al guardar en backend")
      }
    });
  }
}