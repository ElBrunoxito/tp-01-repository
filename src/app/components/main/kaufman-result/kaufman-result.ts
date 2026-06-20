import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO } from '../../../model/User';
import { ResultadosKaufman } from '../../../model/Kaufman';
import { ActivatedRoute } from '@angular/router';
import { KaufmanService } from '../../../service/kaufman-service';

@Component({
  selector: 'app-kaufman-result',
  imports: [NgClass],
  templateUrl: './kaufman-result.html',
  styleUrl: './kaufman-result.css',
})
export class KaufmanResult implements OnInit {
  
  storage = inject(StorageService)
  kaufmanService = inject(KaufmanService)


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

  route = inject(ActivatedRoute)
  ngOnInit(): void {
    this.generateRadarPolygon();

    const id = this.route.snapshot.paramMap.get('id');
    console.info(id)
    this.getTestKaufmanbyid(id)
    this.userName = (this.storage.getUser() as ResponseUserDTO).nameChild

  }

  getTestKaufmanbyid(id:any){
    this.kaufmanService.getResultById(id).subscribe({
      next:(res)=>{
        this.data = res as ResultadosKaufman
      },
      error: (err)=>{
        
      }

    })
  }


  // Llama a esta función cada vez que modifiques dinámicamente un valor de 'data'
  generateRadarPolygon(): void {
    const centerX = 100;
    const centerY = 100;
    const maxRadius = 80;
    
    const angleOffset = -Math.PI / 2; 

    const scores = [
      this.data.association,       // Vértice 1: Arriba
      this.data.memory,        // Vértice 2: Derecha Superior
      this.data.association,     // Vértice 3: Derecha Inferior
      this.data.logicalSequencing,  // Vértice 4: Izquierda Inferior
      this.data.classification   // Vértice 5: Izquierda Superior
    ];

    const points = scores.map((score, i) => {
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