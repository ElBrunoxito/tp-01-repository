import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-t11',
  imports: [NgClass],
  templateUrl: './t11.html',
  styleUrl: './t11.css',
})
export class T11{
  highlightStartBtn: boolean = false;
  omissionAttempts: number = 0;
  router = inject(Router)
  constructor(){
    
  }
  startFlow() {
    this.highlightStartBtn = false;
    this.omissionAttempts = 0;
    this.router.navigate(['/app/routine/level-1/2']);

  }

  // Si el sistema detecta que el usuario no avanzó, se gatilla este resalte
  simulateNoAction() {
    this.omissionAttempts++;
    this.highlightStartBtn = true;
  }
}
