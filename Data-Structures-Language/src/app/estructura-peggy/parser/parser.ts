import { Injectable } from '@angular/core';
import * as peggy from 'peggy';


@Injectable({
  providedIn: 'root',
})
export class Parser {

  // ! Viene de js (Le ponga null si viene '')
  private compilador!:peggy.Parser;

  constructor(){
    this.compileGrammar();
  }

  private compileGrammar(){
  const grammar = String.raw
  `
    {
        // Nombre con el que se devuelve cada tipo de estructura
        const NOMBRES = { STACK: "Pila", QUEUE: "Cola", LIST: "Lista", HASH: "Tabla", TREE: "Arbol" };
    
        function buscar(estructuras, nombre){
            for(let e of estructuras){
                if(e.nombre === nombre){
                    return e;
                }
            }
            return null;
        }
    
        // Recibe las sentencias en el orden en que aparecieron y devuelve las estructuras ya terminadas
        function ejecutar(sentencias){
            let estructuras = [];
            for(let s of sentencias){
    
                if(s.clase === "declaracion"){
                    if(buscar(estructuras, s.nombre) === null){
                        let nueva = { tipo: NOMBRES[s.tipo], nombre: s.nombre, valores: [] };
                        if(s.tipo === "TREE"){
                            nueva.enlaces = [];
                        }
                        nueva.graficar = false;
                        estructuras.push(nueva);
                    }
                    continue;
                }
    
                let e = buscar(estructuras, s.nombre);
                if(e === null){
                    continue;
                }

                //Aqui van las instrucciones
                switch(s.clase){
                    case "push":
                        if(e.tipo === "Pila"){
                            e.valores.push(s.valor);
                        }
                    break;
                    case "pop":
                        if(e.tipo === "Pila"){
                            e.valores.pop();
                        }
                    break;
                    case "enqueue":
                        if(e.tipo === "Cola"){
                            e.valores.push(s.valor);
                        }
                    break;
                    case "dequeue":
                        if(e.tipo === "Cola"){
                            e.valores.shift();
                        }
                    break;
                    case "insert":
                        if(e.tipo === "Lista"){
                            e.valores.push(s.valor);
                        }
                    break;
                    case "remove":
                        if(e.tipo === "Lista"){
                            let pos = e.valores.indexOf(s.valor);
                            if(pos !== -1){
                                e.valores.splice(pos, 1);
                            }
                        }
                    break;
                    case "set":
                        if(e.tipo === "Tabla"){
                            let fila = e.valores.find(x => x.llave === s.llave);
                            if(fila){
                                fila.valor = s.valor;
                            }else{
                                e.valores.push({ llave: s.llave, valor: s.valor });
                            }
                        }
                    break;
                    case "get":
                        if(e.tipo === "Tabla"){
                            let pos = e.valores.findIndex(x => x.llave === s.llave);
                            if(pos !== -1){
                                e.valores.splice(pos, 1);
                            }
                        }
                    break;
                    case "root":
                        if(e.tipo === "Arbol" && e.valores.length === 0){
                            e.valores.push(s.valor);
                        }
                    break;
                    case "left":
                    case "right":
                        if(e.tipo === "Arbol"){
                            let lado = (s.clase === "left") ? "izq" : "der";
                            let hayPadre = e.valores.includes(s.padre);
                            let ocupado = e.enlaces.some(x => x.padre === s.padre && x.lado === lado);
                            if(hayPadre && !ocupado){
                                e.valores.push(s.hijo);
                                e.enlaces.push({ padre: s.padre, hijo: s.hijo, lado: lado });
                            }
                        }
                    break;
                    case "graph":
                        e.graficar = true;
                    break;
                }
            }
            return estructuras;
        }
    }
    
    // I = inicio, P = programa, S = sentencia, D = declaracion, T = tipo, O = operacion, V = valor
    I = _ p:P{
        return ejecutar(p.sentencias);
    }
    
    P = s:S+{
        return { sentencias: s };
    }
    
    S = d:D _{
        return d;
    }
        /o:O _{
        return o;
    }
    
    D = t:T __ i:ID _ ";"{
        let nodo = {};
        nodo.clase = "declaracion";
        nodo.tipo = t;
        nodo.nombre = i;
        return nodo;
    }
    
    T = "STACK" / "QUEUE" / "LIST" / "HASH" / "TREE"
    
    O = "PUSH" _ "(" _ i:ID _ "," _ v:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "push";
        nodo.nombre = i;
        nodo.valor = v;
        return nodo;
    }
        /"POP" _ "(" _ i:ID _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "pop";
        nodo.nombre = i;
        return nodo;
    }
        /"ENQUEUE" _ "(" _ i:ID _ "," _ v:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "enqueue";
        nodo.nombre = i;
        nodo.valor = v;
        return nodo;
    }
        /"DEQUEUE" _ "(" _ i:ID _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "dequeue";
        nodo.nombre = i;
        return nodo;
    }
        /"INSERT" _ "(" _ i:ID _ "," _ v:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "insert";
        nodo.nombre = i;
        nodo.valor = v;
        return nodo;
    }
        /"REMOVE" _ "(" _ i:ID _ "," _ v:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "remove";
        nodo.nombre = i;
        nodo.valor = v;
        return nodo;
    }
        /"SET" _ "(" _ i:ID _ "," _ l:V _ "," _ v:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "set";
        nodo.nombre = i;
        nodo.llave = l;
        nodo.valor = v;
        return nodo;
    }
        /"GET" _ "(" _ i:ID _ "," _ l:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "get";
        nodo.nombre = i;
        nodo.llave = l;
        return nodo;
    }
        /"ROOT" _ "(" _ i:ID _ "," _ v:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "root";
        nodo.nombre = i;
        nodo.valor = v;
        return nodo;
    }
        /"LEFT" _ "(" _ i:ID _ "," _ p:V _ "," _ h:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "left";
        nodo.nombre = i;
        nodo.padre = p;
        nodo.hijo = h;
        return nodo;
    }
        /"RIGHT" _ "(" _ i:ID _ "," _ p:V _ "," _ h:V _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "right";
        nodo.nombre = i;
        nodo.padre = p;
        nodo.hijo = h;
        return nodo;
    }
        /"GRAPH" _ "(" _ i:ID _ ")" _ ";"{
        let nodo = {};
        nodo.clase = "graph";
        nodo.nombre = i;
        return nodo;
    }
    
    V = x:NUMERO{
        return parseInt(x, 10);
    }
        /x:CADENA{
        return x;
    }
    
    // Palabras reservadas no se usan como ID
    Reservada = ("STACK" / "QUEUE" / "LIST" / "HASH" / "TREE"
              / "PUSH" / "POP" / "ENQUEUE" / "DEQUEUE"
              / "INSERT" / "REMOVE" / "SET" / "GET"
              / "ROOT" / "LEFT" / "RIGHT" / "GRAPH"
              / "ADDNODE" / "PRINT") ![a-zA-Z0-9]
    
    ID = !Reservada x:$([a-zA-Z][a-zA-Z0-9]*) { return x; }
    
    NUMERO = $([0-9]+)
    
    CADENA = '"' x:$([^"\n]*) '"' { return x; }
    
    _  = ([ \t\n\r] / "//" [^\n]* / "/*" (!"*/" .)* "*/")*
    
    __ = ([ \t\n\r] / "//" [^\n]* / "/*" (!"*/" .)* "*/")+
        `;
    this.compilador = peggy.generate(grammar);
}
  

  /*private compileGrammar(){

    const grammar = 
    `
        {
          //Aqui se escribe cualquier Codigo de JS 
          function potenciaDos(pot){
              let resultado = 1;
              for(let i = 1; i<= pot; i++){
                  resultado = 2*resultado;
              }
              return resultado;
          }
        }
        I = s:S{
                let nodo = {...s};
                return nodo;
            }
        S = b:B s:S{
                let nodo = {};
                nodo.val = potenciaDos(s.pot+1)*b.val + s.val;
                nodo.pot = s.pot + 1;
                return nodo;
            } 
            /b:B{
                let nodo = {...b};
                return nodo;
            }
        B = "0"{
                let nodo = {};
                nodo.val = 0;
                nodo.pot = 0;
                return nodo;
            }
            /"1"{
                let nodo = {};
                nodo.val = 1;
                nodo.pot = 0;
                return nodo;
            }
    `;
    this.compilador = peggy.generate(grammar);
  }*/

  compilar(texto:string):any{
    return this.compilador.parse(texto);
  }
  
}
