import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
interface RoutineRecord {
  id: number;
  date: string;
  time: string;
  activityName: string;
  grade: number;
  gradeBadgeClass: string;
  supportIcon: string;
  supportLabel: string;
  supportTypeClass: string;
  statusText: string;
  statusKey: 'completado' | 'en-progreso' | 'interrumpido';
  statusBadgeClass: string;
  statusDotClass: string;
}

@Component({
  selector: 'app-history',
  imports: [NgClass],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit {
  routineRecords: RoutineRecord[] = [];
  filteredRecords: RoutineRecord[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Inicialización y tipado exacto del modelo maestro del historial clínico
    this.routineRecords = [
      {
        id: 1,
        date: '14 Oct, 2023',
        time: '09:15 AM',
        activityName: 'Rutina de Lavado de Manos',
        grade: 2,
        gradeBadgeClass: 'tea-badge-grade2',
        supportIcon: 'visibility',
        supportLabel: 'Visual',
        supportTypeClass: 'support-icon-visual',
        statusText: 'Completado',
        statusKey: 'completado',
        statusBadgeClass: 'status-pill-completado',
        statusDotClass: 'dot-completado',
      },
      {
        id: 2,
        date: '14 Oct, 2023',
        time: '10:45 AM',
        activityName: 'Lectura Compartida',
        grade: 1,
        gradeBadgeClass: 'tea-badge-grade1',
        supportIcon: 'accessibility_new',
        supportLabel: 'Independiente',
        supportTypeClass: 'support-icon-independent',
        statusText: 'En progreso',
        statusKey: 'en-progreso',
        statusBadgeClass: 'status-pill-progreso',
        statusDotClass: 'dot-progreso',
      },
      {
        id: 3,
        date: '14 Oct, 2023',
        time: '11:30 AM',
        activityName: 'Tiempo de Juego Social',
        grade: 3,
        gradeBadgeClass: 'tea-badge-grade3',
        supportIcon: 'front_hand',
        supportLabel: 'Físico',
        supportTypeClass: 'support-icon-physical',
        statusText: 'En progreso',
        statusKey: 'en-progreso',
        statusBadgeClass: 'status-pill-progreso',
        statusDotClass: 'dot-progreso',
      }
    ];
    this.filteredRecords = this.routineRecords;
  }



  onFilterChange(filterType: string, event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filteredRecords = this.routineRecords.filter(record => {
      if (filterType === 'nivel') {
        if(selectedValue === '') {
          return true; 
        }
        return record.grade.toString() === selectedValue;
      }
      if (filterType === 'estado') {
        if(selectedValue === '') {
          return true; 
        }
        return record.statusKey === selectedValue;
      }
      return true;

    });
    console.log(`Filtrando el registro maestro por ${filterType}: ${selectedValue}`);

  }

  onExportCSV(): void {
    console.log('Generando archivo CSV estructurado del Historial de Rutinas...');
  }


}
