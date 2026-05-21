import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface HistoryEntry {
  id: number;
  date: string;
  time: string;
  evaluator: string;
  grade: string;
  percentage: number;
  trendIcon: string;
  trendValue: string;
  trendClass: string;
  gradeClass: string;
}

@Component({
  selector: 'app-test-tea',
  imports: [NgClass],
  templateUrl: './test-tea.html',
  styleUrl: './test-tea.css',
})
export class TestTea implements OnInit {

  lastEvaluationLevel: string = '2';
  historyEntries: HistoryEntry[] = [];

  constructor() {}

  ngOnInit(): void {
    // Mapeo estructurado y tipado de los registros clínicos de la tabla dense-data
    this.historyEntries = [
      {
        id: 1,
        date: '12 Octubre, 2023',
        time: '14:20 PM',
        evaluator: 'Dr. Aranda',
        grade: 'GRADO 2',
        percentage: 65,
        trendIcon: 'trending_up',
        trendValue: '+2.4%',
        trendClass: 'trend-up',
        gradeClass: 'pill-grade-2'
      },
      {
        id: 2,
        date: '28 Septiembre, 2023',
        time: '10:15 AM',
        evaluator: 'Online Eval',
        grade: 'GRADO 2',
        percentage: 62,
        trendIcon: 'trending_flat',
        trendValue: '0.0%',
        trendClass: 'trend-flat',
        gradeClass: 'pill-grade-2'
      },
      {
        id: 3,
        date: '05 Septiembre, 2023',
        time: '16:45 PM',
        evaluator: 'Dr. Aranda',
        grade: 'GRADO 3',
        percentage: 1,
        trendIcon: 'trending_down',
        trendValue: '-1.2%',
        trendClass: 'trend-down',
        gradeClass: 'pill-grade-3'
      },
      {
        id: 4,
        date: '15 Agosto, 2023',
        time: '09:00 AM',
        evaluator: 'Dr. Aranda',
        grade: 'GRADO 2',
        percentage: 68,
        trendIcon: 'trending_up',
        trendValue: '+5.1%',
        trendClass: 'trend-up',
        gradeClass: 'pill-grade-2'
      }
    ];
  }

  onStartLevel(): void {
    console.log('Iniciando nuevo nivel de evaluación interactiva TEA...');
  }

  onFilter(): void {
    console.log('Abriendo modal de filtrado avanzado de historial...');
  }

  onDownload(): void {
    console.log('Exportando el historial clínico completo en formato PDF/Excel...');
  }

  onRowClick(entry: HistoryEntry): void {
    console.log(`Fila seleccionada. Abriendo detalles del registro ID: ${entry.id}`);
  }

  onRowActions(entry: HistoryEntry): void {
    console.log(`Desplegando menú de acciones rápidas para el registro: ${entry.date}`);
  }
}
