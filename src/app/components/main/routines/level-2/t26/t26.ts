import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t26',
  imports: [],
  templateUrl: './t26.html',
  styleUrl: './t26.css',
})
export class T26 implements OnInit {

  router = inject(Router)

  constructor() {}

  ngOnInit(): void {
    console.log('Pantalla de refuerzo TEACCH cargada. Solo estrella y botones activos.');
  }

  /**
   * Condición: Presionar Siguiente para avanzar.
   */
  onSiguiente(): void {
    this.router.navigate(['/app/routine/level-2/7']);
  }

  onListo(): void {
    this.router.navigate(['/app/routine/level-2/7']);

  }
}