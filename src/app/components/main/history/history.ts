import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RoutineService } from '../../../service/routine-service';
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO } from '../../../model/User';


@Component({
  selector: 'app-history',
  imports: [NgClass,DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit {
  routineRecords: RoutineGetDTO[] = [];
  filteredRecords: RoutineGetDTO[] = [];

  routine = inject(RoutineService)
  storage = inject(StorageService)
  cdr = inject(ChangeDetectorRef)
  idChild!: any

  constructor() {}
  
  ngOnInit(): void {
    this.idChild = (this.storage.getUser() as ResponseUserDTO).idChild
    this.routine.getRoutinesByIdChild(this.idChild).subscribe({
      next: (res) => {
        this.routineRecords = res
        this.filteredRecords = this.routineRecords;
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error(err.error)
      }
    })

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
