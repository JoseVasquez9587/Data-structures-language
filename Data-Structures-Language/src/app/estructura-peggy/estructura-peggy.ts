import { Component,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Parser } from './parser/parser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estructura-peggy',
  imports: [FormsModule],
  templateUrl: './estructura-peggy.html',
  styleUrl: './estructura-peggy.css',
})
export class EstructuraPeggy {
  private router = inject(Router);
  jsonGenerado: string = ""; //PARA IMPRIMIR EN EL TEXT AREA

  texto: string =
`STACK miPila;
PUSH(miPila,1);
PUSH(miPila,2);
PUSH(miPila,3);
GRAPH(miPila);

QUEUE miCola;
ENQUEUE(miCola,10);
ENQUEUE(miCola,20);
ENQUEUE(miCola,30);
DEQUEUE(miCola);
GRAPH(miCola);

LIST usuarios;
INSERT(usuarios,100);
INSERT(usuarios,"Carlos");
INSERT(usuarios,"Pablo");
INSERT(usuarios,"Ana");
INSERT(usuarios,"Luis");
REMOVE(usuarios,"Pablo");
GRAPH(usuarios);
  `;
  private parser: Parser;

  constructor(parser: Parser) {
    this.parser = parser;
  }

  parsear() {
    try {
      let arregloEstructuras = this.parser.parse(this.texto);
      //console.log(arregloEstructuras);
      this.jsonGenerado = JSON.stringify(arregloEstructuras); //PARA IMPRIMIR EN EL TEXT AREA
      this.graficarEstructuras(arregloEstructuras);

    } catch (e: any) {
      console.log(e);
      alert("Cadena invalida");
    }

  }

  graficarEstructuras(estructuras: any) {
    let retraso = 0;
    for (let estructura of estructuras)  {
      if (estructura.graficar){
        let codigoGraphviz = "";
        if (estructura.tipo == "PILA"){
          for (let i = 0; i < estructura.valores.length; i++){
            codigoGraphviz += estructura.valores[i];
            if ( i != estructura.valores.length - 1){
              codigoGraphviz += "->";
            }
          }
        } else if (estructura.tipo == "COLA"){
          codigoGraphviz = "rankdir=LR; ";
          for (let i = 0; i < estructura.valores.length; i++){
            codigoGraphviz += estructura.valores[i];
            if (i != estructura.valores.length - 1){
              codigoGraphviz += "->";
            }
          }
        } else if (estructura.tipo == "LISTA"){
          codigoGraphviz = "rankdir=LR; ";
          for (let i = 0; i < estructura.valores.length; i++){
            codigoGraphviz += estructura.valores[i];
            if (i != estructura.valores.length - 1){
              codigoGraphviz += "->";
            }
          }
          codigoGraphviz += "; ";
          for (let i = estructura.valores.length - 1; i >= 0; i--){
            codigoGraphviz += estructura.valores[i];
            if (i != 0){
              codigoGraphviz += "->";
            }
          }
        }
        const urlTree = this.router.createUrlTree(['/grafo'],{
          queryParams: { codigoGraphviz: codigoGraphviz, nombre: estructura.nombre }
        });
        const urlCompleta = this.router.serializeUrl(urlTree);
        window.open(urlCompleta, '_blank');
      }
    }
  }
}
