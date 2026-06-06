import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
export interface ResultadosKaufman {
  indice_general: number;
  clasificacion: number;
  secuenciacion: number;
  asociacion: number;
  memoria: number;
  visual: number;
  atencion: number;
}
@Component({
  selector: 'app-kaufman-result',
  imports: [NgClass],
  templateUrl: './kaufman-result.html',
  styleUrl: './kaufman-result.css',
})
export class KaufmanResult implements OnInit {
  
  // Tu DTO directo
  data: ResultadosKaufman = {
    indice_general:90,
    atencion: 60,      // 1. Arriba
    memoria: 66,       // 2. Derecha Superior
    asociacion: 50,    // 3. Derecha Inferior
    secuenciacion: 45, // 4. Izquierda Inferior
    clasificacion: 90, // 5. Izquierda Superior
    visual: 78
  };

  userName: string = 'Alexander';
  currentIndex: number = 1;
  totalIndex: number = 10;
  radarPoints: string = '';

  ngOnInit(): void {
    this.generateRadarPolygon();
  }

  // Llama a esta función cada vez que modifiques dinámicamente un valor de 'data'
  generateRadarPolygon(): void {
    const centerX = 100;
    const centerY = 100;
    const maxRadius = 80;
    
    // -90 grados (en radianes) apunta directamente hacia ARRIBA en un plano cartesiano estándar.
    // Como el diseño original ya contempla la rotación en el CSS/SVG, usamos -Math.PI / 2
    const angleOffset = -Math.PI / 2; 

    // ORDEN CORREGIDO: Sigue estrictamente las manecillas del reloj alineado a las etiquetas SVG
    const scores = [
      this.data.atencion,       // Vértice 1: Arriba
      this.data.memoria,        // Vértice 2: Derecha Superior
      this.data.asociacion,     // Vértice 3: Derecha Inferior
      this.data.secuenciacion,  // Vértice 4: Izquierda Inferior
      this.data.clasificacion   // Vértice 5: Izquierda Superior
    ];

    const points = scores.map((score, i) => {
      // Divide el círculo en 5 partes iguales (72 grados por sección)
      const angle = (i * 2 * Math.PI / 5) + angleOffset;
      const radius = (score / 100) * maxRadius;
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    this.radarPoints = points.join(' ');
  }

  getPerformanceLevel(score: number): 'Bajo' | 'Medio' | 'Alto' {
    if (score < 50) return 'Bajo';
    if (score <= 85) return 'Medio';
    return 'Alto';
  }

  getCircularProgressBg(): string {
    return `radial-gradient(closest-side, white 82%, transparent 83% 100%),
            conic-gradient(#075fab ${this.data.indice_general}%, #e7e8e9 0)`;
  }

  printResults(): void {
    window.print();
  }

  downloadReport(): void {
    console.log('Descargando informe para:', this.userName);
  }
}