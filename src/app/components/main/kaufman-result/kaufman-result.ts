import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO } from '../../../model/User';
export interface ResultadosKaufman {
  idc: number;
  attention: number;
  memory: number;
  association: number
  logicalSequencing : number
  classification:number;
  visual: number;
}
@Component({
  selector: 'app-kaufman-result',
  imports: [NgClass],
  templateUrl: './kaufman-result.html',
  styleUrl: './kaufman-result.css',
})
export class KaufmanResult implements OnInit {
  
  storage = inject(StorageService)

  // Tu DTO directo
  data: ResultadosKaufman = {
    idc:90,
    attention: 60,      // 1. Arriba
    memory: 66,       // 2. Derecha Superior
    association: 50,    // 3. Derecha Inferior
    logicalSequencing: 45, // 4. Izquierda Inferior
    classification: 90, // 5. Izquierda Superior
    visual: 78
  };

  userName: string = 'Alexander';
  radarPoints: string = '';

  ngOnInit(): void {
    this.generateRadarPolygon();
    this.userName = (this.storage.getUser() as ResponseUserDTO).nameChild

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
      this.data.association,       // Vértice 1: Arriba
      this.data.memory,        // Vértice 2: Derecha Superior
      this.data.association,     // Vértice 3: Derecha Inferior
      this.data.logicalSequencing,  // Vértice 4: Izquierda Inferior
      this.data.classification   // Vértice 5: Izquierda Superior
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
            conic-gradient(#075fab ${this.data.idc}%, #e7e8e9 0)`;
  }

  printResults(): void {
    window.print();
  }

  downloadReport(): void {
    console.log('Descargando informe para:', this.userName);
  }
}