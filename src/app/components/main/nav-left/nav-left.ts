import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-left',
  imports: [FormsModule, NgClass],
  templateUrl: './nav-left.html',
  styleUrl: './nav-left.css',
})
export class NavLeft implements OnInit {
// Control del estado responsive
  isMobileSidebarOpen: boolean = false;
  router = inject(Router);
  activeRoute : string = '';
  constructor() {}

  ngOnInit(): void {
    console.log('Menú de navegación lateral cargado.');
  }

  /**
   * Cambia el estado de visibilidad de la barra lateral en móviles
   */
  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  /**
   * Procesa las rutas o clics de navegación
   */
  onNavigate(event: Event, destination: string): void {
    event.preventDefault();
    this.isMobileSidebarOpen = false; // Cierra automáticamente el panel en móviles al hacer clic
    this.activeRoute = destination;
    this.router.navigate([`app/${destination}`]);

  }
}
