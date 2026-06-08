import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t210',
  imports: [],
  templateUrl: './t210.html',
  styleUrl: './t210.css',
})
export class T210 implements OnInit {
  router = inject(Router)


constructor() {}

  ngOnInit(): void {
    console.log('Pantalla final 10/10 iniciada sin barra de navegación.');
  }

  onFinalizar(): void {
    this.router.navigate(['/app']);

  }
}