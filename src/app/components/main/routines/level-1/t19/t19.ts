import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ElementoClasificable {
  id: string;
  nombre: string;
  imagenUrl: string;
  categoriaCorrectaId: string;
}

interface CategoriaDestino {
  id: string;
  nombre: string;
  itemsClasificados: ElementoClasificable[];
}

@Component({
  selector: 'app-t19',
  imports: [NgClass],
  templateUrl: './t19.html',
  styleUrl: './t19.css',
})
export class T19 implements OnInit {

  // Listado de categorías destino
  categorias: CategoriaDestino[] = [
    { id: 'juguetes', nombre: 'Juguetes', itemsClasificados: [] },
    { id: 'utiles', nombre: 'Útiles Escolares', itemsClasificados: [] }
  ];

  // Cola de elementos por clasificar (Imágenes tomadas estructuralmente del lote de tus componentes)
  bancoElementos: ElementoClasificable[] = [
    { id: 'pelota', nombre: 'Pelota', imagenUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwE7PEjn31v6Lhrlxsd8RNpzBLbHpEv1VW6JYVlMfx_9EEmM3Pa_V_eaOBBlmDMdpB4hCAU-pAb20jZZSguWGmg2agI2YJ3VgR1cyOXQ182Y-StTqaAEa3fPcz3fPuwiK-fnng7TijwnzY8oz_LLKDHs85IErLTBEXmSUnSvr7UfIDVAbMlrBOmkQA9R4TWwVCK8ejdbooKL8qbSQEtxygE_AG9JTXRnEiu6fuKm5EwT57cxbK13t2A7NAoTI89Lkc3F_Z3thylV4', categoriaCorrectaId: 'juguetes' },
    { id: 'cuaderno', nombre: 'Cuaderno', imagenUrl: 'https://img.magnific.com/psd-gratis/articulo-vuelta-al-cole_23-2152003421.jpg?semt=ais_hybrid&w=740&q=80', categoriaCorrectaId: 'utiles' },
    { id: 'carro', nombre: 'Carrito', imagenUrl: 'https://i.pinimg.com/736x/17/f2/6d/17f26d6685d3ca11b02cf3c0287a2e9e.jpg', categoriaCorrectaId: 'juguetes' }
  ];

  elementoActual: ElementoClasificable | null = null;
  idCategoriaCorrectaActual: string = '';
  
  conteoErrores: number = 0;
  mostrarGuiaAyuda: boolean = false;
  actividadCompletada: boolean = false;
  router = inject(Router)

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarSiguienteElemento();
  }

  cargarSiguienteElemento(): void {
    if (this.bancoElementos.length > 0) {
      this.elementoActual = this.bancoElementos[0];
      this.idCategoriaCorrectaActual = this.elementoActual.categoriaCorrectaId;
      // Reiniciar guías de ayuda al cambiar de objeto
      this.mostrarGuiaAyuda = false;
      this.conteoErrores = 0;
    } else {
      this.elementoActual = null;
      this.idCategoriaCorrectaActual = '';
      this.actividadCompletada = true;
      console.log('Fase de clasificación ganada. Botón Siguiente desbloqueado.');
    }
    this.cdr.detectChanges();
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDragStart(event: DragEvent): void {
    if (event.dataTransfer && this.elementoActual) {
      event.dataTransfer.setData('text/plain', this.elementoActual.id);
    }
  }

  onDrop(event: DragEvent, idCategoriaDestino: string): void {
    event.preventDefault();
    if (!this.elementoActual) return;

    // CONDICIÓN: Comprobar si la categoría soltada coincide con la regla correcta
    if (idCategoriaDestino === this.idCategoriaCorrectaActual) {
      // Éxito: Agregar a la lista interna de esa columna
      const categoriaSel = this.categorias.find(c => c.id === idCategoriaDestino);
      if (categoriaSel) {
        categoriaSel.itemsClasificados.push(this.elementoActual);
      }
      
      // Remover de la cola principal y cargar el siguiente elemento
      this.bancoElementos.shift();
      this.cargarSiguienteElemento();
    } else {
      // ❌ CONDICIÓN 1: Si falla -> El elemento regresa al origen (no se altera la lista)
      this.conteoErrores++;
      console.log(`Intento incorrecto. Conteo de fallos: ${this.conteoErrores}`);

      // ❌ CONDICIÓN 2: Si repite error (2 o más fallos en el mismo objeto) -> Resaltar categoría correcta
      if (this.conteoErrores >= 2) {
        this.mostrarGuiaAyuda = true;
      }
      this.cdr.detectChanges();
    }
  }

  onSiguiente(): void {
    this.router.navigate(['/app/routine/level-2/10']);
  }

  onListo(): void {
    if (this.actividadCompletada) {
      this.router.navigate(['/app/routine/level-2/10']);
    }
  }

}
