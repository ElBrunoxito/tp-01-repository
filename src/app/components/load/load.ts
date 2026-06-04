import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load',
  imports: [],
  templateUrl: './load.html',
  styleUrl: './load.css',
})
export class Load implements OnInit {
  // Texto por defecto por si no se recibe ninguno
  textoInformativo: string = 'Procesando información...';
  rutaDestino: string = '/app'; // Ruta por defecto para evitar bloqueos

  constructor(private router: Router) {
    // Capturamos el objeto 'state' enviado en la navegación anterior.
    // Esto DEBE hacerse dentro del constructor.
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.textoInformativo = navigation.extras.state['texto'] || this.textoInformativo;
      this.rutaDestino = navigation.extras.state['destino'] || this.rutaDestino;
    }
  }

  ngOnInit(): void {
    // Generar un tiempo aleatorio entre 3 y 7 segundos (en milisegundos)
    // Math.random() * (max - min) + min
    const tiempoAleatorioMs = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
    
    console.log(`La carga durará exactamente: ${tiempoAleatorioMs / 1000} segundos.`);

    // Ejecutar la redirección automática al cumplir el tiempo aleatorio
    setTimeout(() => {
      try{
        this.router.navigate([this.rutaDestino]);
      }catch(error){
        this.router.navigate(['/app']);
      }

    }, tiempoAleatorioMs);
  }
}