import { Component, OnInit } from '@angular/core';

interface EvaluationRecord {
  fecha: string;
  atencion: number;
  clasificacion: number;
  memoria: number;
  secuencia: number;
  asociacion: number;
  indice: number;
}

@Component({
  selector: 'app-kaufman',
  imports: [],
  templateUrl: './kaufman.html',
  styleUrl: './kaufman.css',
})
export class Kaufman implements OnInit {
  
  // Métricas del Dashboard
  public promedioPuntaje: number = 114;
  public incrementoPorcentaje: string = '+5.2%';
  public totalTests: number = 24;
  
  // Datos de la tabla reactiva
  public evaluaciones: EvaluationRecord[] = [
    { fecha: '12/03/2024', atencion: 14, clasificacion: 11, memoria: 15, secuencia: 12, asociacion: 10, indice: 116 },
    { fecha: '05/02/2024', atencion: 12, clasificacion: 10, memoria: 14, secuencia: 11, asociacion: 9,  indice: 108 },
    { fecha: '15/12/2023', atencion: 13, clasificacion: 12, memoria: 13, secuencia: 10, asociacion: 11, indice: 112 },
    { fecha: '20/10/2023', atencion: 11, clasificacion: 9,  memoria: 12, secuencia: 10, asociacion: 8,  indice: 102 }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Métodos de acción
  public onNuevaEvaluacion(): void {
    console.log('Navegando a nueva evaluación o abriendo modal...');
    // Aquí iría la lógica para abrir un formulario o redirigir
  }

  public verDetalle(evaluacion: EvaluationRecord): void {
    console.log('Mostrando detalle de la evaluación del día:', evaluacion.fecha);
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