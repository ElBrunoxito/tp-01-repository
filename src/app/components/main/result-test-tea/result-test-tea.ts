import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetTestTeaDTO } from '../../../model/TestTea';
import { TestTeaService } from '../../../service/test-tea-service';

interface DiccionarioResultados {
  level: 1|2|3,
  levelTitle: string;
  levelDesc: string;
  
  
}

@Component({
  selector: 'app-result-test-tea',
  imports: [RouterLink],
  templateUrl: './result-test-tea.html',
  styleUrl: './result-test-tea.css',
})
export class ResultTestTea implements OnInit {


  
  nivelDetectado: number|1|2|3 = 0;
  puntuacionActual: number = 0;
  descripcionNivel: string = '';
  nivelTitle: string = '';
  observation: string | undefined = 'Estructura visual recomendada'

  testTeaService = inject(TestTeaService)
  route = inject(ActivatedRoute)
  cdr = inject(ChangeDetectorRef)

  baseResultados: DiccionarioResultados[] = [
    { level: 1, levelTitle: 'Leve', levelDesc: 'Nivel leve de riesgo de TEA. Es poco probable que el niño tenga TEA, pero si los padres o cuidadores tienen preocupaciones, se recomienda una evaluación adicional.' },
    { level: 2, levelTitle: 'Moderado', levelDesc: 'Nivel moderado de riesgo de TEA. Existe una posibilidad de que el niño tenga TEA, por lo que se recomienda una evaluación más detallada por parte de un profesional.' },
    { level: 3, levelTitle: 'Severo', levelDesc: 'Nivel severo de riesgo de TEA. Es probable que el niño tenga TEA, y se recomienda encarecidamente una evaluación exhaustiva por parte de un especialista en desarrollo infantil.' },
  ];
  constructor(
  ) {}

  ngOnInit(): void {
    var resultadoId = this.route.snapshot.paramMap.get('id');
    this.testTeaService.getTestById(resultadoId).subscribe({
      next: (res)=>{
        this.nivelDetectado = res.levelTEA
        this.puntuacionActual = res.points
        if(res.obs) {
          this.observation = res.obs
        }
        const datos = this.baseResultados.find((d) => d.level === this.nivelDetectado) || this.baseResultados[0];
        this.descripcionNivel = datos.levelDesc;
        this.nivelTitle = datos.levelTitle;
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.error(err)
      } 
    })
  }




}