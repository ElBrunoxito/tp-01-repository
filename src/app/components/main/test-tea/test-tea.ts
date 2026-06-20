import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GetTestTeaDTO } from '../../../model/TestTea';
import { Router } from '@angular/router';



@Component({
  selector: 'app-test-tea',
  imports: [NgClass, DatePipe],
  templateUrl: './test-tea.html',
  styleUrl: './test-tea.css',
})
export class TestTea implements OnInit {

  lastEvaluationLevel: any;
  historyEntries: GetTestTeaDTO[] = [];

  constructor() {}
  router = inject(Router)

  ngOnInit(): void {

    this.getAll();
    this.lastEvaluationLevel = this.historyEntries.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())[0].levelTEA.toString();

  }

  getAll(){
        // Mapeo estructurado y tipado de los registros clínicos de la tabla dense-data
    this.historyEntries = [
      {
        id: "31232132131",
        createdDate: '2027-12-10 14:20',
        levelTEA: 2,
        points: 8
      },
      {
        id: "2",
        createdDate: '2023-09-09 10:15',
        levelTEA: 2,
        points:1
      },
      {
        id: "3",
        createdDate: '2023-05-09 16:45',
        levelTEA: 3,
        points: 15
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

  onViewTest(entry: GetTestTeaDTO): void {
    console.log(`Fila seleccionada. Abriendo detalles del registro ID: ${entry.id}`);
  }

  onRowActions(entry: GetTestTeaDTO): void {
    this.router.navigate([`/app/resultados/${entry.id}`]);

  }
}
