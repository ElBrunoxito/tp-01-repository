import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface HistoryEntry {
  id: number;
  date: string;
  time: string;
  grade: number;
  percentage: number;
  gradeClass: string;
}

@Component({
  selector: 'app-test-tea',
  imports: [NgClass],
  templateUrl: './test-tea.html',
  styleUrl: './test-tea.css',
})
export class TestTea implements OnInit {

  lastEvaluationLevel: any;
  historyEntries: HistoryEntry[] = [];

  constructor() {}

  ngOnInit(): void {

    this.getAll();
    this.lastEvaluationLevel = this.historyEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].grade.toString();

  }

  getAll(){
        // Mapeo estructurado y tipado de los registros clínicos de la tabla dense-data
    this.historyEntries = [
      {
        id: 1,
        date: '12-10-2027',
        time: '14:20',
        grade: 2,
        percentage: 65,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 2,
        date: '28-09-2023',
        time: '10:15',
        grade: 2,
        percentage: 62,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 3,
        date: '05-09-2023',
        time: '16:45',
        grade: 3,
        percentage: 1,
        gradeClass: 'pill-grade-3'
      },
      {
        id: 4,
        date: '15-08-2023',
        time: '09:00',
        grade: 2,
        percentage: 68,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 4,
        date: '15-08-2023',
        time: '09:00',
        grade: 2,
        percentage: 68,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 4,
        date: '15-08-2023',
        time: '09:00',
        grade: 2,
        percentage: 68,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 4,
        date: '15-08-2023',
        time: '09:00',
        grade: 2,
        percentage: 68,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 4,
        date: '15-08-2023',
        time: '09:00',
        grade: 2,
        percentage: 68,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 4,
        date: '15-08-2023',
        time: '09:00',
        grade: 2,
        percentage: 68,
        gradeClass: 'pill-grade-2'
      },
      {
        id: 4,
        date: '15-08-2023',
        time: '09:00',
        grade: 2,
        percentage: 68,
        gradeClass: 'pill-grade-2'
      }
    ];
  }


  onStartLevel(): void {
    console.log('Iniciando nuevo nivel de evaluación interactiva TEA...');
    if (this.lastEvaluationLevel) {
      //Empezar nivel
    }
    else{
      alert('No se tiene un nivel TEA registrado. Por favor realice una evaluación primero.');
    }
  }

  onDownload(): void {
    console.log('Exportando el historial clínico completo en formato PDF/Excel...');
  }

  onViewTest(entry: HistoryEntry): void {
    console.log(`Fila seleccionada. Abriendo detalles del registro ID: ${entry.id}`);
  }

  onRowActions(entry: HistoryEntry): void {
    console.log(`Desplegando menú de acciones rápidas para el registro: ${entry.date}`);
  }
}
