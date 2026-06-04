import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
resultadoId!: string | null;

  // Variables para renderizar la UI
  nivelDetectado: number|1|2|3 = 0;
  puntuacionActual: number = 10;
  descripcionNivel: string = '';
  nivelTitle: string = '';
  strokeDashoffset: number = 364.4; 



  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Capturamos el parámetro 'id' de la URL de forma directa
    this.resultadoId = this.route.snapshot.paramMap.get('id');
    this.cargarDatosPorId();
  }

  cargarDatosPorId(): void {
    //Obtener data por ID
    //****
    // -***
    //  */
    this.nivelDetectado = 3;
    const baseResultados: DiccionarioResultados[] = [
      { level: 1, levelTitle: 'Leve', levelDesc: 'Nivel leve de riesgo de TEA. Es poco probable que el niño tenga TEA, pero si los padres o cuidadores tienen preocupaciones, se recomienda una evaluación adicional.' },
      { level: 2, levelTitle: 'Moderado', levelDesc: 'Nivel moderado de riesgo de TEA. Existe una posibilidad de que el niño tenga TEA, por lo que se recomienda una evaluación más detallada por parte de un profesional.' },
      { level: 3, levelTitle: 'Severo', levelDesc: 'Nivel severo de riesgo de TEA. Es probable que el niño tenga TEA, y se recomienda encarecidamente una evaluación exhaustiva por parte de un especialista en desarrollo infantil.' },
    ];
    const datos = baseResultados.find((d) => d.level === this.nivelDetectado) || baseResultados[0];
    this.descripcionNivel = datos.levelDesc;
    this.nivelTitle = datos.levelTitle;
    this.calcularProgresoCirculo();
  }

  calcularProgresoCirculo(): void {
    const partes = this.puntuacionActual.toString();
    if (partes.length === 2) {
      const obtenido = parseFloat(partes[0]);
      const total = parseFloat(partes[1]);
      const porcentaje = obtenido / total;
      const diametroMaximo = 364.4;
      this.strokeDashoffset = diametroMaximo - (diametroMaximo * porcentaje);
    }
  }


}