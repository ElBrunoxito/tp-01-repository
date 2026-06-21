import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GetTestTeaDTO } from '../../../model/TestTea';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO } from '../../../model/User';
import { TestTeaService } from '../../../service/test-tea-service';



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
  storage = inject(StorageService)
  testTea = inject(TestTeaService)
  cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    const user = this.storage.getUser() as ResponseUserDTO
    this.testTea.getChildTestsTea(user.idChild).subscribe({
      next: (res)=>{
        this.historyEntries = res
        this.lastEvaluationLevel = res[0].levelTEA.toString();
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.error(err.message)
      }
    })
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
