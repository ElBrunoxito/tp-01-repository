import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t22',
  imports: [],
  templateUrl: './t22.html',
  styleUrl: './t22.css',
})
export class T22 {
  router = inject(Router)

  constructor() {}

  onContinuar(): void {
    this.router.navigate(['/app/routine/level-2/3']);

  }

}
