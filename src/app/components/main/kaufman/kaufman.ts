import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ResultadosKaufman } from '../../../model/Kaufman';


@Component({
  selector: 'app-kaufman',
  imports: [RouterLink],
  templateUrl: './kaufman.html',
  styleUrl: './kaufman.css',
})
export class Kaufman implements OnInit {
  
  // Métricas del Dashboard
  public promedioPuntaje: number = 114;
  public incrementoPorcentaje: string = '+5.2%';
  public totalTests: number = 24;
  
  // Datos de la tabla reactiva
  public evaluaciones: ResultadosKaufman[] = [
    { id:"1",createdDate: '12-03-2024', visual: 14,attention: 14, classification: 11, memory: 15, logicalSequencing: 12, association: 10, idc: 116 },
    { createdDate: '05-02-2024', visual: 14, attention: 12, classification: 10, memory: 14, logicalSequencing: 11, association: 9,  idc: 108 },
    { createdDate: '15-12-2023', visual: 14, attention: 13, classification: 12, memory: 13, logicalSequencing: 10, association: 11, idc: 112 },
    { createdDate: '20-10-2023', visual: 14, attention: 11, classification: 9,  memory: 12, logicalSequencing: 10, association: 8,  idc: 102 }
  ];

  router = inject(Router)
  constructor() {}

  ngOnInit(): void {}



  public verDetalle(evaluacion: ResultadosKaufman): void {
    console.log('Mostrando detalle de la evaluación del día:', evaluacion.createdDate);
    this.router.navigate([`/app/kaufman/result/${evaluacion.id}`]);

  }

  public exportarPDF(): void {
    console.log('Generando archivo PDF para exportación...');
  }

  public compartirReporte(): void {
    console.log('Abriendo opciones para compartir el reporte...');
  }

  public abrirSoporte(): void {
    console.log('Conectando con el agente de soporte...');
  }
}