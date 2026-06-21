import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseUserDTO } from '../../../model/User';
import { StorageService } from '../../../service/storage-service';

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
  storage = inject(StorageService)
  activeRoute : string = '';
  id: any
  constructor() {}

  ngOnInit(): void {
    console.log('Menú de navegación lateral cargado.');
    const user:ResponseUserDTO = this.storage.getUser()
    this.id = user.id
    if(!user.idChild){
      this.router.navigate([`/app/user/${user.id}`]);
    }
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

  logout(){
    this.storage.dropAll()
    this.router.navigate([`login`]);
  }
}
