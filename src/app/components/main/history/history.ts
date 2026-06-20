import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
interface RoutineRecord {
  id: number;
  createdDate: string;
  activityName: string;
  level: number;
  status: string;
}

@Component({
  selector: 'app-history',
  imports: [NgClass,DatePipe],
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
        createdDate: '2026-08-14 09:15',
        activityName: 'Rutina de Lavado de Manos',
        level: 2,
        status: 'Completado',
      },
      {
        id: 2,
        createdDate: '2023-10-14 10:45',
        activityName: 'Lectura Compartida',
        level: 1,
        status: 'En progreso',
      },
      {
        id: 3,
        createdDate: '2027-09-19 11:30',
        activityName: 'Tiempo de Juego Social',
        level: 3,
        status: 'En progreso',
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
        return record.level.toString() === selectedValue;
      }
      if (filterType === 'estado') {
        if(selectedValue === '') {
          return true; 
        }
        return record.status === selectedValue;
      }
      return true;

    });
    console.log(`Filtrando el registro maestro por ${filterType}: ${selectedValue}`);

  }

  onExportCSV(): void {
    console.log('Generando archivo CSV estructurado del Historial de Rutinas...');
  }


}
