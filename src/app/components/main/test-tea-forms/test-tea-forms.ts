import { NgClass} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../service/storage-service';
import { Router } from '@angular/router';

interface Question {
  id: number;
  texto: string;
  ejemplo: string;
  respuestaSeleccionada: number|null; // 'SI', 'NO' o null si no se ha respondido
}

@Component({
  selector: 'app-test-tea-forms',
  imports: [NgClass],
  templateUrl: './test-tea-forms.html',
  styleUrl: './test-tea-forms.css',
})
export class TestTeaForms implements OnInit {
  listaPreguntas: Question[] = [
    { id: 1, texto: '¿Si usted señala algo al otro lado de la habitación, su hijo lo mira?', ejemplo: '(Por ejemplo, si usted señala a un juguete o a un animal, ¿su hijo mira al juguete o al animal?)', respuestaSeleccionada: null },
    { id: 2, texto: '¿Alguna vez se ha preguntado si su hijo pudiera ser sordo?', ejemplo: '(Por ejemplo, porque no responde a los sonidos o llamados)', respuestaSeleccionada: null },
    { id: 3, texto: '¿Su hijo juega a juegos de simulación o de hacer creer?', ejemplo: '(Por ejemplo, hacer como que bebe de una taza vacía, hablar por teléfono o dar de comer a una muñeca)', respuestaSeleccionada: null },
    { id: 4, texto: '¿A su hijo le gusta subirse a las cosas?', ejemplo: '(Por ejemplo, a las sillas, a los juegos del parque o a los sillones)', respuestaSeleccionada: null },
    { id: 5, texto: '¿Hace su hijo movimientos inusuales con sus dedos cerca de sus ojos?', ejemplo: '(Por ejemplo, mueve sus dedos cerca de sus ojos de forma extraña)', respuestaSeleccionada: null },
    { id: 6, texto: '¿Su hijo señala con un dedo para pedir algo o ayuda?', ejemplo: '(Por ejemplo, señalar un juguete o comida fuera de su alcance)', respuestaSeleccionada: null },
    { id: 7, texto: '¿Su hijo señala con un dedo para mostrarle algo interesante?', ejemplo: '(Por ejemplo, un avión o un camión grande)', respuestaSeleccionada: null },
    { id: 8, texto: '¿Su hijo muestra interés por otros niños?', ejemplo: '(Por ejemplo, los observa, sonríe o se acerca a ellos)', respuestaSeleccionada: null },
    { id: 9, texto: '¿Su hijo le muestra objetos llevándoselos o levantándolos para que los vea?', ejemplo: '(Por ejemplo, una flor o un juguete; no para pedir ayuda, sino para compartir)', respuestaSeleccionada: null },
    { id: 10, texto: '¿Su hijo responde cuando usted lo llama por su nombre?', ejemplo: '(Por ejemplo, voltea, balbucea o deja de hacer lo que estaba haciendo)', respuestaSeleccionada: null },
    { id: 11, texto: '¿Cuando usted le sonríe a su hijo, él o ella le devuelve la sonrisa?', ejemplo: '(Por ejemplo, responde a su gesto alegre de manera espontánea)', respuestaSeleccionada: null },
    { id: 12, texto: '¿Le molestan a su hijo los ruidos cotidianos?', ejemplo: '(Por ejemplo, la licuadora, la aspiradora o la música fuerte)', respuestaSeleccionada: null },
    { id: 13, texto: '¿Su hijo camina?', ejemplo: '(Por ejemplo, camina con soporte o de forma completamente independiente)', respuestaSeleccionada: null },
    { id: 14, texto: '¿Su hijo le mira a los ojos cuando usted le habla, juega con él o lo viste?', ejemplo: '(Por ejemplo, mantiene contacto visual directo con usted)', respuestaSeleccionada: null },
    { id: 15, texto: '¿Su hijo intenta copiar lo que usted hace?', ejemplo: '(Por ejemplo, decir adiós con la mano, aplaudir o hacer un sonido gracioso)', respuestaSeleccionada: null },
    { id: 16, texto: '¿Si usted voltea a ver algo, su hijo voltea a mirar para ver lo que usted está viendo?', ejemplo: '(Por ejemplo, seguir la dirección de su mirada)', respuestaSeleccionada: null },
    { id: 17, texto: '¿Intenta su hijo hacer que usted lo mire?', ejemplo: '(Por ejemplo, busca su mirada para recibir un elogio o para decir "mírame")', respuestaSeleccionada: null },
    { id: 18, texto: '¿Entiende su hijo cuando usted le dice que haga algo?', ejemplo: '(Por ejemplo, si usted no hace gestos, ¿entiende "pon el libro en la mesa" o "trae tus zapatos"?)', respuestaSeleccionada: null },
    { id: 19, texto: '¿Si pasa algo nuevo, su hijo lo mira a la cara para ver cómo reacciona usted?', ejemplo: '(Por ejemplo, si oye un ruido extraño, ¿lo mira para ver si usted está asustado o tranquilo?)', respuestaSeleccionada: null },
    { id: 20, texto: '¿Le gustan a su hijo las actividades de movimiento?', ejemplo: '(Por ejemplo, que lo balanceen, lo hagan saltar en sus rodillas o lo mezan)', respuestaSeleccionada: null }
  ];

  elementosPorPagina = 5;
  paginaActual = 0;

  storage = inject(StorageService);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    const preguntasGuardadas = this.storage.getQuestions();
    if (preguntasGuardadas) {
      this.listaPreguntas = preguntasGuardadas;
    }
  }

  // Obtiene únicamente las 5 preguntas que corresponden al bloque actual
  get preguntasDelBloque(): Question[] {
    const inicio = this.paginaActual * this.elementosPorPagina;
    return this.listaPreguntas.slice(inicio, inicio + this.elementosPorPagina);
  }

  // Registra la respuesta seleccionada por el usuario
  seleccionarRespuesta(preguntaId: number, valor: 1|0|null): void {
    const pregunta = this.listaPreguntas.find(p => p.id === preguntaId);
    if (pregunta) {
      pregunta.respuestaSeleccionada = valor;
      this.storage.setQuestions(this.listaPreguntas);
    }
  }

  // Navegación hacia adelante
  siguientePagina(): void {
    if (this.puedeAvanzar()) {
      this.paginaActual++;
      window.scrollTo(0, 0); // Regresa arriba para comodidad visual
    }
  }

  // Navegación hacia atrás
  anteriorPagina(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      window.scrollTo(0, 0);
    }
  }

  // Validación opcional: Verifica si se respondieron las 5 preguntas del bloque actual antes de avanzar
  puedeAvanzar(): boolean {
    const totalPaginas = Math.ceil(this.listaPreguntas.length / this.elementosPorPagina);
    if (this.paginaActual >= totalPaginas - 1) return false;

    // Si deseas obligar a responder todo el bloque antes de avanzar, descomenta lo siguiente:
    // return this.preguntasDelBloque.every(p => p.respuestaSeleccionada !== null);
    
    return true;
  }

  // Cálculo dinámico del porcentaje de avance total (basado en respuestas contestadas)
  get porcentajeProgreso(): number {
    const respondidas = this.listaPreguntas.filter(p => p.respuestaSeleccionada !== null).length;
    return Math.round((respondidas / this.listaPreguntas.length) * 100);
  }

  // Obtiene el número de paso actual (Ej: Paso 1 de 4)
  get pasoActual(): number {
    return this.paginaActual + 1;
  }

  get totalPasos(): number {
    return Math.ceil(this.listaPreguntas.length / this.elementosPorPagina);
  }

  finalizarTest(){
    this.storage.dropQuestions();
    //OBTENER ID DEL BACKEND
    let id = '1'; 

    this.router.navigate([`/app/resultados/${id}`]); 
    /*this.router.navigate(['/load'], { 
      state: { 
        texto: 'El algoritmo combinado está midiendo tu puntuación', // El texto que tú quieras
        destino: '/kaufman'                                      // A dónde irá después del tiempo random
      } 
    });*/
    console.log(this.listaPreguntas)
    let count = 0;
    this.listaPreguntas.forEach(p => {
      console.log(`${count + 1}: Respuesta: ${p.respuestaSeleccionada}`);
      count++;
    });
  }

}