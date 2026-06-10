import { Component, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t110',
  imports: [],
  templateUrl: './t110.html',
  styleUrl: './t110.css',
})
export class T110 implements OnInit {
  router = inject(Router)


constructor() {}

  ngOnInit(): void {
    console.log('Pantalla final 10/10 iniciada sin barra de navegación.');
  }

  onFinalizar(): void {
    this.router.navigate(['/app']);

  }
}