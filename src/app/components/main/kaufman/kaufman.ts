import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ResultadosKaufman } from '../../../model/Kaufman';
import { KaufmanService } from '../../../service/kaufman-service';
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO } from '../../../model/User';
import id from '@angular/common/locales/id';


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
  public evaluaciones: ResultadosKaufman[] = [];

  router = inject(Router)
  constructor() {}
  kaufmanService = inject(KaufmanService)
  storage = inject(StorageService)
  cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    const idChild= (this.storage.getUser() as ResponseUserDTO).idChild

    this.kaufmanService.getKaufmanLogs(idChild).subscribe({
      next:(res)=>{
        this.evaluaciones = res
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.warn("A ocurrido un error al obtener la data")
      }

    })

  }



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