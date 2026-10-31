import { Injectable } from '@angular/core';
import * as peggy from 'peggy';


@Injectable({
  providedIn: 'root',
})
export class Parser {

  // ! Viene de js (Le ponga null si viene '')
  private parser!:peggy.Parser;

  constructor(){
    this.compileGrammar();
  }

  private compileGrammar(){
  const grammar =`
  {
  let estructuras = [];
  }

    INICIO = SENTENCIAS {
      console.log(estructuras); //Para debuguear
      return estructuras;
    }

    SENTENCIAS = (_ SENTENCIA)+ _
    //PROBLEMA POR EL QUE DUPLICA EL ULTIMO
    //SENTENCIAS = _ SENTENCIA _ SENTENCIAS
    //            /_ SENTENCIA _
    
    SENTENCIA = "STACK" _ nom:Identificador _ ";" {
                  let estructura = {};
                  estructura.nombre = nom;
                  estructura.tipo = "PILA";
                  estructura.valores = [];
                  //Este guarda la estructura en el arreglo estructuras
                  estructuras.push(estructura);
                }
                /"PUSH" _ "(" _ nom:Identificador _ "," _ val:VALOR _ ")" _ ";" {
                  for (let estructura of estructuras){
                    if(estructura.nombre == nom){
                      estructura.valores.push(val);
                    }
                  }
                }
                /"POP" _ "(" _ nom:Identificador _ ")" _ ";"{
                  for(let estructura of estructuras){
                    if (estructura.nombre == nom){
                      estructura.valores.pop();
                    }
                  }
                }
                / "GRAPH" _ "(" _ nom:Identificador _ ")" _ ";"{
                  for(let estructura of estructuras){
                    if(estructura.nombre == nom){
                      estructura.graficar = true;
                    }
                  }
                }
                /"QUEUE" _ nom:Identificador _ ";" {
                  let estructura = {};
                  estructura.nombre = nom;
                  estructura.tipo = "COLA";
                  estructura.valores = [];
                  //Este guarda la estructura en el arreglo estructuras
                  estructuras.push(estructura);
                }
                /"ENQUEUE" _ "(" _ nom:Identificador _ "," _ val:VALOR _ ")" _ ";" {
                  for(let estructura of estructuras){
                    if(estructura.nombre == nom){
                      estructura.valores.push(val);
                    }
                  }
                }
                /"DEQUEUE" _ "(" _ nom:Identificador _ ")" _ ";" {
                  for (let estructura of estructuras){
                    if (estructura.nombre == nom){
                      estructura.valores.shift();
                    }
                  }
                }
                /"LIST" _ nom:Identificador _ ";" {
                  let estructura = {};
                  estructura.nombre = nom;
                  estructura.tipo = "LISTA";
                  estructura.valores = [];
                  //Este guarda la estructura en el arreglo estructuras
                  estructuras.push(estructura);
                }
                /"INSERT" _ "(" _ nom:Identificador _ "," _ val:VALOR _ ")" _ ";" {
                  for (let estructura of estructuras){
                    if (estructura.nombre == nom){
                      estructura.valores.push(val);
                    }
                  }
                }
                /"REMOVE" _ "(" _ nom:Identificador _ "," _ val:VALOR _ ")" _ ";" {
                  for (let estructura of estructuras){
                    if (estructura.nombre == nom){
                      let indice = estructura.valores.indexOf(val); //Esto es para buscar la posicion por un indice dentro de la estructura
                      console.log(indice);
                      if (indice !== -1) { //La posicion empieza en 0  (-1 si no existe por eso se valida)
                        estructura.valores.splice(indice,1); //Posicion y Elementos
                      }
                    }
                  }
                }
                /"ARRAY" _ nom:Identificador _ ";"{
                  let estructura = {};
                  estructura.nombre = nom;
                  estructura.tipo = "ARREGLO";
                  estructura.posicion = [];
                  estructura.valores = [];
                  estructuras.push(estructura);
                }
                /"INDEX" _ "(" nom:Identificador _ "," _ pos:VALOR _ "," _ val:VALOR _ ")" _ ";" {
                for (let estructura of estructuras){
                  if (estructura.nombre == nom){
                    estructura.valores.push(val);
                    estructura.posicion.push(pos);
                    }
                  }  
                }

    VALOR = num:Numero{
            return num;
          }
          / cad:Cadena{
            return cad;
          }

    //Expresiones regulares
    Identificador = a:[a-zA-Z_] b:[a-zA-Z0-9_]* {
      return a + b.join("");
      //Como funciona:
      //["o","l","a","1"].join("") = "ola1"
      //"h" + "ola1" = "hola1"
    }

    Numero = c:[0-9]+ {
      return c.join("");
    }

    Cadena = "\\"" c:[^\\"]* "\\"" {
      return c.join("");    
    }

    //Ignora espacios y comentarios
    _ = (Blancos / Comentario) *

    Blancos = [ \\t\\n\\r]+

    Comentario = "//" [^\\n]* ("\\n" / !.)
  `;
    this.parser = peggy.generate(grammar);

  }

  parse(texto: string): any {
    return this.parser.parse(texto);
  }
  
}
