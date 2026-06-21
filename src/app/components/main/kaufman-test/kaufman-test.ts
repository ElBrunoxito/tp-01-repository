import { Component, inject, OnInit, RESPONSE_INIT } from '@angular/core';
import { Router } from '@angular/router';
import { KaufmanService } from '../../../service/kaufman-service';
import { ResultadosKaufman } from '../../../model/Kaufman';
import { StorageService } from '../../../service/storage-service';
import id from '@angular/common/locales/id';
import { ResponseUserDTO } from '../../../model/User';


@Component({
  selector: 'app-kaufman-test',
  imports: [],
  templateUrl: './kaufman-test.html',
  styleUrl: './kaufman-test.css',
})
export class KaufmanTest implements OnInit {
  // Control global de pantallas ajustado de la 0 a la 10
  pantallaActual: number = 0;

  // Registro para las 10 preguntas evaluativas reales
  respuestas: { [key: string]: number } = {
    p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0, p9: 0, p10: 0
  };

  p4Volteada: boolean = false;
  p6CasilleroSeleccionado: string | null = null;
  
  p7Items = [
    { id: 1, nombre: 'Perrito Juguete', categoria: 'Animales', asignado: '' },
    { id: 2, nombre: 'Manzana Plástica', categoria: 'Otros', asignado: '' }
  ];

  idChild: any
  storage = inject(StorageService)
  router = inject(Router)
  kaufmanService = inject(KaufmanService)


  ngOnInit(): void {
    this.idChild = (this.storage.getUser() as ResponseUserDTO).idChild
  }

  siguientePantalla(): void {
    if (this.pantallaActual < 10) {
      this.pantallaActual++;
    } else {
      this.calcularYEmitirMetricas();
    }
  }

  registrarRespuesta(pantallaKey: string, esCorrecta: boolean): void {
    this.respuestas[pantallaKey] = esCorrecta ? 1 : 0;
    this.siguientePantalla();
  }

  voltearTarjetaP4(esCorrecta: boolean): void {
    this.p4Volteada = !this.p4Volteada;
    this.respuestas['p4'] = esCorrecta ? 1 : 0;
  }

  seleccionarCasilleroP6(identificador: string, esCorrecto: boolean): void {
    this.p6CasilleroSeleccionado = identificador;
    this.respuestas['p6'] = esCorrecto ? 1 : 0;
  }

  asignarCategoriaP7(itemId: number, destino: string): void {
    const item = this.p7Items.find(i => i.id === itemId);
    if (item) {
      item.asignado = destino;
    }
    const totalCorrectos = this.p7Items.every(i => i.asignado === i.categoria);
    this.respuestas['p7'] = totalCorrectos ? 1 : 0;
  }

  calcularYEmitirMetricas(): void {
    const P1 = this.respuestas['p1'];
    const P2 = this.respuestas['p2'];
    const P3 = this.respuestas['p3'];
    const P4 = this.respuestas['p4'];
    const P5 = this.respuestas['p5'];
    const P6 = this.respuestas['p6'];
    const P7 = this.respuestas['p7'];
    const P8 = this.respuestas['p8'];
    const P9 = this.respuestas['p9'];
    const P10 = this.respuestas['p10'];

    // Mapeo clínico exacto equilibrado para las 10 preguntas fijas
    const memoria = P1 * 100;
    const clasificacion = ((P2 + P3) / 2) * 100;
    const atencion = ((P2 + P3 + P4 + P6) / 4) * 100;
    const secuenciacion = P4 * 100;
    const asociacion = ((P5 + P7 + P9) / 3) * 100; // P5 (pato), P7 (categorías), P9 (palabra pelota)
    const visual = ((P8 + P10) / 2) * 100;         // P8 (gajo curvo) y P10 (patrón de cierre angular)
    
    // Métrica global sobre el total de ítems evaluados
    const indice_general = ((P1 + P2 + P3 + P4 + P5 + P6 + P7 + P8 + P9 + P10) / 10) * 100;

    const estructuraResultado: ResultadosKaufman = {
      "icg": Math.round(indice_general),
      "classification":  Math.round(clasificacion),
      "logicalSequencing":  Math.round(secuenciacion),
      "association":     Math.round(asociacion),
      "memory":        Math.round(memoria),
      "visual":         Math.round(visual),
      "attention":       Math.round(atencion)
    };
    //console.log(JSON.stringify(estructuraResultado, null, 2));
    this.kaufmanService.saveResult(this.idChild, estructuraResultado).subscribe({
      next: (res)=>{
        (res.icg)
        this.router.navigate([`/app/kaufman/result/${res.id}`]);
      },
      error: (err)=>{
        console.log("A ocurrido un error")
      }
    })


  }
  
}
