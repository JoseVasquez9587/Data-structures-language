import { Component, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common'; //Este trae la importacion de for e if
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-analizador',
  imports: [RouterOutlet,CommonModule,MatIconModule,MatInputModule,MatFormFieldModule,FormsModule,MatButtonModule],
  templateUrl: './analizador.html',
  styleUrl: './analizador.css',
})
export class Analizador {
  protected readonly title = signal('Data-Structures-Language');
  tokens:any = [];
  texto:string = "";

  analizar(){
    this.texto = this.texto + "\n";//Obligatorio salto de linea
    let caracteres = [...this.texto];
    let estado = 'A';
    let fila = 1;
    let columna = 0;
    let token:any = {};

    let i = 0;
    while (i < caracteres.length){
      let c = caracteres[i];
      let codigo = c.charCodeAt(0);
      columna++;

      switch(estado){
        case 'A':
          switch(codigo){

            case 65: //A ADDNODE
              token = this.llenarToken("Identificador", "A", fila, columna);
              estado = 'A1'
            break;

            case 68: //D DEQUEUE
              token = this.llenarToken("Identificador", "D", fila, columna);
              estado = 'D1'
            break;

            case 69: //E ENQUEUE
              token = this.llenarToken("Identificador", "E", fila, columna);
              estado = 'E1'
            break;

            case 71: //G GET AND GRAPH
              token = this.llenarToken("Identificador", "G", fila, columna);
              estado = 'G'
            break;

            case 72: //H HASH
              token = this.llenarToken("Identificador", "H", fila, columna);
              estado = 'H'
            break;

            case 73: //I INSERT
              token = this.llenarToken("Identificador", "I", fila, columna);
              estado = 'I'
            break;

            case 76: //L LEFT AND LIST
              token = this.llenarToken("Identificador", "L", fila, columna);
              estado = 'L'
            break;

            case 80: //P POP AND PRINT AND PUSH
              token = this.llenarToken("Identificador", "P", fila, columna);
              estado = 'P'
            break;

            case 81: //Q QUEUE
              token = this.llenarToken("Identificador", "Q", fila, columna);
              estado = 'Q'
            break;

            case 82: //R REMOVE AND RIGHT AND ROOT
              token = this.llenarToken("Identificador", "R", fila, columna);
              estado = 'R'
            break;

            case 83: //S SET AND STACK
              token = this.llenarToken("Identificador", "S", fila, columna);
              estado = 'S'
            break;

            case 84: //T TREE
              token = this.llenarToken("Identificador", "T", fila, columna);
              estado = 'T'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token = this.llenarToken("Identificador", c, fila, columna);
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'A1': //lleva A
          switch(codigo){

            case 68: //D
              token = this.llenarToken("Identificador", "AD", fila, token.columna);
              estado = 'A2'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'A2': //lleva AD
          switch(codigo){

            case 68: //D
              token = this.llenarToken("Identificador", "ADD", fila, token.columna);
              estado = 'A3'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'A3': //lleva ADD
          switch(codigo){

            case 78: //N
              token = this.llenarToken("Identificador", "ADDN", fila, token.columna);
              estado = 'A4'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'A4': //lleva ADDN
          switch(codigo){

            case 79: //O
              token = this.llenarToken("Identificador", "ADDNO", fila, token.columna);
              estado = 'A5'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'A5': //lleva ADDNO
          switch(codigo){

            case 68: //D
              token = this.llenarToken("Identificador", "ADDNOD", fila, token.columna);
              estado = 'A6'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'A6': //lleva ADDNOD
          switch(codigo){

            case 69: //E
              token = this.llenarToken("Reservada", "ADDNODE", fila, token.columna);
              estado = 'A7'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'A7': //ADDNODE 
          switch(codigo){

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                //llegó más letra/digito: ya no es reservada, ahora es identificador
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                //delimitador u operador: cierra ADDNODE como reservada y reprocesa este caracter desde 'A'
                if(token?.token) this.tokens.push(token);
                token = {};
                estado = 'A';
                i--;
              }
            break;
          } 
        break;
        
        case 'D1': //lleva D
          switch(codigo){

            case 69: //E DEQUEUE
              token = this.llenarToken("Identificador", "DE", fila, token.columna);
              estado = 'D2'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'D2': //lleva DE
          switch(codigo){

            case 81: //Q DEQUEUE
              token = this.llenarToken("Identificador", "DEQ", fila, token.columna);
              estado = 'D3'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'D3': //lleva DEQ
          switch(codigo){

            case 85: //U DEQUEUE
              token = this.llenarToken("Identificador", "DEQU", fila, token.columna);
              estado = 'D4'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'D4': //lleva DEQU
          switch(codigo){

            case 69: //E DEQUEUE
              token = this.llenarToken("Identificador", "DEQUE", fila, token.columna);
              estado = 'D5'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'D5': //lleva DEQUE
          switch(codigo){

            case 85: //U DEQUEUE
              token = this.llenarToken("Identificador", "DEQUEU", fila, token.columna);
              estado = 'D6'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'D6': //lleva DEQUEU
          switch(codigo){

            case 69: //E DEQUEUE
              token = this.llenarToken("Reservada", "DEQUEUE", fila, token.columna);
              estado = 'D7'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'D7': //DEQUEUE 
          switch(codigo){

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                //delimitador u operador: cierra ADDNODE como reservada y reprocesa este caracter desde 'A'
                if(token?.token) this.tokens.push(token);
                token = {};
                estado = 'A';
                i--;
              }
            break;
          } 
        break;
        
        case 'E1': //lleva E
          switch(codigo){

            case 78: //N 
              token = this.llenarToken("Identificador", "EN", fila, token.columna);
              estado = 'E2'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'E2': //lleva EN
          switch(codigo){

            case 81: //Q
              token = this.llenarToken("Identificador", "ENQ", fila, token.columna);
              estado = 'E3'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'E3': //lleva ENQ
          switch(codigo){

            case 85: //U 
              token = this.llenarToken("Identificador", "ENQU", fila, token.columna);
              estado = 'E4'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'E4': //lleva ENQU
          switch(codigo){

            case 69: //E 
              token = this.llenarToken("Identificador", "ENQUE", fila, token.columna);
              estado = 'E5'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'E5': //lleva ENQUE
          switch(codigo){

            case 85: //U
              token = this.llenarToken("Identificador", "ENQUEU", fila, token.columna);
              estado = 'E6'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'E6': //lleva ENQUEU
          switch(codigo){

            case 69: //E 
              token = this.llenarToken("Reservada", "ENQUEUE", fila, token.columna);
              estado = 'E7'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;
        
        case 'E7': //ENQUEUE 
          switch(codigo){

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                //delimitador u operador: cierra ADDNODE como reservada y reprocesa este caracter desde 'A'
                if(token?.token) this.tokens.push(token);
                token = {};
                estado = 'A';
                i--;
              }
            break;
          } 
        break;

        case 'G':
          switch(codigo){

            case 69: //E
              token = this.llenarToken("Identificador", "GE", fila, token.columna);
              estado = 'GE'
            break;

            case 82: //R
              token = this.llenarToken("Identificador", "GR", fila, token.columna);
              estado = 'GR'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'GE':
          switch(codigo){

            case 84: //T
              token = this.llenarToken("Reservada", "GET", fila, token.columna);
              estado = 'GET'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'GET': //GET 
          switch(codigo){

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {};
                estado = 'A';
                i--;
              }
            break;
          } 
        break;

        case 'GR':
          switch(codigo){

            case 65: //A
              token = this.llenarToken("Identificador", "GRA", fila, token.columna);
              estado = 'GRA'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'GRA':
          switch(codigo){

            case 80: //P
              token = this.llenarToken("Identificador", "GRAP", fila, token.columna);
              estado = 'GRAP'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'GRAP':
          switch(codigo){

            case 72: //H
              token = this.llenarToken("Reservada", "GRAPH", fila, token.columna);
              estado = 'GRAPH'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'GRAPH': //GRAPH
          switch(codigo){

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {};
                estado = 'A';
                i--;
              }
            break;
          } 
        break;

        case 'H':
          switch(codigo){

            case 65://A
              token = this.llenarToken("Identificador", "HA", fila, token.columna);
              estado = 'HA'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'HA':
          switch(codigo){

            case 83://S
              token = this.llenarToken("Identificador", "HAS", fila, token.columna);
              estado = 'HAS'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'HAS':
          switch(codigo){

            case 72://H
              token = this.llenarToken("Reservada", "HASH", fila, token.columna);
              estado = 'HASH'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'HASH': //HASH
          switch(codigo){

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {};
                estado = 'A';
                i--;
              }
            break;
          } 
        break;

        case 'I':
          switch(codigo){

            case 78://N
              token = this.llenarToken("Identificador", "IN", fila, token.columna);
              estado = 'IN'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'IN':
          switch(codigo){

            case 83://S
              token = this.llenarToken("Identificador", "INS", fila, token.columna);
              estado = 'INS'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'INS':
          switch(codigo){

            case 69://E
              token = this.llenarToken("Identificador", "INSE", fila, token.columna);
              estado = 'INSE'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'INSE':
          switch(codigo){

            case 82://R
              token = this.llenarToken("Identificador", "INSER", fila, token.columna);
              estado = 'INSER'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'INSER':
          switch(codigo){

            case 84://T
              token = this.llenarToken("Reservada", "INSERT", fila, token.columna);
              estado = 'INSERT'
            break;

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          } 
        break;

        case 'INSERT': //INSERT
          switch(codigo){

            case 10://Salto de Linea ASCII
              if(token?.token) this.tokens.push(token);
                fila++;
                columna = 0;
                token = {};
                estado = 'A';
            break;

            case 32://Space
              if(token?.token) this.tokens.push(token)
                //fila++;
                //columna = 0;
                token = {};
                estado = 'A';
            break;

            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {};
                estado = 'A';
                i--;
              }
            break;
          } 
        break;
        
        case 'L':
          switch(codigo){
            case 69: //E
              token = this.llenarToken("Identificador", "LE", fila, token.columna);
              estado = 'LE'
            break;
            case 73: //I
              token = this.llenarToken("Identificador", "LI", fila, token.columna);
              estado = 'LI'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'LE':
          switch(codigo){
            case 70: //F
              token = this.llenarToken("Identificador", "LEF", fila, token.columna);
              estado = 'LEF'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'LEF':
          switch(codigo){
            case 84: //T
              token = this.llenarToken("Reservada", "LEFT", fila, token.columna);
              estado = 'LEFT'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'LEFT'://LEFT
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'LI':
          switch(codigo){
            case 83: //S
              token = this.llenarToken("Identificador", "LIS", fila, token.columna);
              estado = 'LIS'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'LIS':
          switch(codigo){
            case 84: //T
              token = this.llenarToken("Reservada", "LIST", fila, token.columna);
              estado = 'LIST'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'LIST'://LIST
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'P':
          switch(codigo){
            case 79: //O
              token = this.llenarToken("Identificador", "PO", fila, token.columna);
              estado = 'PO'
            break;
            case 82: //R
              token = this.llenarToken("Identificador", "PR", fila, token.columna);
              estado = 'PR'
            break;
            case 85: //U
              token = this.llenarToken("Identificador", "PU", fila, token.columna);
              estado = 'PU'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'PO':
          switch(codigo){
            case 80: //P -> POP
              token = this.llenarToken("Reservada", "POP", fila, token.columna);
              estado = 'POP'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'POP'://POP
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'PR':
          switch(codigo){
            case 73: //I
              token = this.llenarToken("Identificador", "PRI", fila, token.columna);
              estado = 'PRI'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'PRI':
          switch(codigo){
            case 78: //N
              token = this.llenarToken("Identificador", "PRIN", fila, token.columna);
              estado = 'PRIN'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'PRIN':
          switch(codigo){
            case 84: //T
              token = this.llenarToken("Reservada", "PRINT", fila, token.columna);
              estado = 'PRINT'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'PRINT'://PRINT
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'PU':
          switch(codigo){
            case 83: //S
              token = this.llenarToken("Identificador", "PUS", fila, token.columna);
              estado = 'PUS'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'PUS':
          switch(codigo){
            case 72: //H
              token = this.llenarToken("Reservada", "PUSH", fila, token.columna);
              estado = 'PUSH'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'PUSH'://PUSH
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'Q':
          switch(codigo){
            case 85: //U
              token = this.llenarToken("Identificador", "QU", fila, token.columna);
              estado = 'QU'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'QU':
          switch(codigo){
            case 69: //E
              token = this.llenarToken("Identificador", "QUE", fila, token.columna);
              estado = 'QUE'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'QUE':
          switch(codigo){
            case 85: //U
              token = this.llenarToken("Identificador", "QUEU", fila, token.columna);
              estado = 'QUEU'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'QUEU':
          switch(codigo){
            case 69: //E -> QUEUE
              token = this.llenarToken("Reservada", "QUEUE", fila, token.columna);
              estado = 'QUEUE'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'QUEUE'://QUEUE
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'R':
          switch(codigo){
            case 69: //E
              token = this.llenarToken("Identificador", "RE", fila, token.columna);
              estado = 'RE'
            break;
            case 73: //I
              token = this.llenarToken("Identificador", "RI", fila, token.columna);
              estado = 'RI'
            break;
            case 79: //O
              token = this.llenarToken("Identificador", "RO", fila, token.columna);
              estado = 'RO'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'RE':
          switch(codigo){
            case 77: //M
              token = this.llenarToken("Identificador", "REM", fila, token.columna);
              estado = 'REM'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'REM':
          switch(codigo){
            case 79: //O
              token = this.llenarToken("Identificador", "REMO", fila, token.columna);
              estado = 'REMO'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'REMO':
          switch(codigo){
            case 86: //V
              token = this.llenarToken("Identificador", "REMOV", fila, token.columna);
              estado = 'REMOV'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'REMOV':
          switch(codigo){
            case 69: //E -> REMOVE
              token = this.llenarToken("Reservada", "REMOVE", fila, token.columna);
              estado = 'REMOVE'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'REMOVE'://REMOVE
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'RI':
          switch(codigo){
            case 71: //G
              token = this.llenarToken("Identificador", "RIG", fila, token.columna);
              estado = 'RIG'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'RIG':
          switch(codigo){
            case 72: //H
              token = this.llenarToken("Identificador", "RIGH", fila, token.columna);
              estado = 'RIGH'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'RIGH':
          switch(codigo){
            case 84: //T -> RIGHT
              token = this.llenarToken("Reservada", "RIGHT", fila, token.columna);
              estado = 'RIGHT'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'RIGHT'://RIGTH
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'RO':
          switch(codigo){
            case 79: //O
              token = this.llenarToken("Identificador", "ROO", fila, token.columna);
              estado = 'ROO'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'ROO':
          switch(codigo){
            case 84: //T -> ROOT
              token = this.llenarToken("Reservada", "ROOT", fila, token.columna);
              estado = 'ROOT'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'ROOT'://ROOT
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'S': 
          switch(codigo){
            case 69: //E
              token = this.llenarToken("Identificador", "SE", fila, token.columna);
              estado = 'SE'
            break;
            case 84: //T
              token = this.llenarToken("Identificador", "ST", fila, token.columna);
              estado = 'ST'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'SE':
          switch(codigo){
            case 84: //T -> SET
              token = this.llenarToken("Reservada", "SET", fila, token.columna);
              estado = 'SET'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'SET': //SET
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'ST':
          switch(codigo){
            case 65: //A
              token = this.llenarToken("Identificador", "STA", fila, token.columna);
              estado = 'STA'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'STA':
          switch(codigo){
            case 67: //C
              token = this.llenarToken("Identificador", "STAC", fila, token.columna);
              estado = 'STAC'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'STAC':
          switch(codigo){
            case 75: //K -> STACK
              token = this.llenarToken("Reservada", "STACK", fila, token.columna);
              estado = 'STACK'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'STACK':
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'T':
          switch(codigo){
            case 82: //R
              token = this.llenarToken("Identificador", "TR", fila, token.columna);
              estado = 'TR'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'TR':
          switch(codigo){
            case 69: //E
              token = this.llenarToken("Identificador", "TRE", fila, token.columna);
              estado = 'TRE'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'TRE':
          switch(codigo){
            case 69: //E -> TREE
              token = this.llenarToken("Reservada", "TREE", fila, token.columna);
              estado = 'TREE'
            break;
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.lexema += c;
                estado = 'ID';
              }
            break;
          }
        break;

        case 'TREE'://TREE
          switch(codigo){
            case 10:
              if(token?.token) this.tokens.push(token);
                fila++; columna = 0; token = {}; estado = 'A';
            break;
            case 32:
              if(token?.token) this.tokens.push(token)
                token = {}; estado = 'A';
            break;
            default:
              if((codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57)){
                token.token = "Identificador";
                token.lexema += c;
                estado = 'ID';
              } else {
                if(token?.token) this.tokens.push(token);
                token = {}; estado = 'A'; i--;
              }
            break;
          }
        break;

        case 'ID':
          switch(true){
            case (codigo>=65 && codigo<=90) || (codigo>=97 && codigo<=122) || (codigo>=48 && codigo<=57):
              token.lexema += c;
              estado = 'ID';
              break;
              case (codigo==10):
              if(token?.token){ token.token = "Identificador"; this.tokens.push(token); }
              fila++; columna = 0; token = {}; estado = 'A';
              break;

            case (codigo==32): 
              if(token?.token){ token.token = "Identificador"; this.tokens.push(token); }
              token = {}; estado = 'A';
              break;

            default:
              if(token?.token){ token.token = "Identificador"; this.tokens.push(token); }
              token = {};
              estado = 'A';
              i--;
          }
        break;
      
      }
      i++;
    }
  }

  llenarToken(token:string,lexema:string, fila:number, columna:number){
    let objeto:any = {};
    objeto.token = token;
    objeto.lexema = lexema;
    objeto.fila = fila;
    objeto.columna = columna;

    return objeto;
  
  }
}


    /*for(let c of caracteres){
      let codigo = c.charCodeAt(0);
      columna++;

      switch(estado){
        case 'A':
          switch(codigo){

            case 101://e
              token = this.llenarToken("Identificador", "e", fila, columna);
              estado = 'B'
            break;

            case 10://Salto de Linea ASCII
            if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;

            case 32://Space
            if(token?.token) this.tokens.push(token)
              //fila++;
              //columna = 0;
              token = {};
              estado = 'A';
            break;

          } 
          break; 
          //=======================================FIN A ================================= 
        case 'B':
          switch(codigo){
            case 108://l
              token = this.llenarToken("Identificador", "el", fila, token.columna);
              estado = 'C'
              break;
            
            case 10://Salto de Linea ASCII
            if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;

            case 32://Space
            if(token?.token) this.tokens.push(token)
              //fila++;
              //columna = 0;
              token = {};
              estado = 'A';
            break;

          }
          break;
          //======================================= B =================================
        case 'C':
          switch(codigo){
            case 115://s
              token = this.llenarToken("Identificador", "els", fila, token.columna);
              estado = 'D'
            break;

            case 10://Salto de Linea ASCII
            if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;

            case 32://Space
            if(token?.token) this.tokens.push(token)
              //fila++;
              //columna = 0;
              token = {};
              estado = 'A';
            break;
          }
          break;
          //======================================= C =================================
        case 'D':
          switch(codigo){
            case 101://e
              token = this.llenarToken("Identificador", "else", fila, token.columna);
              estado = 'E'
            break;

            case 10://Salto de Linea ASCII
            if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;

            case 32://Space
            if(token?.token) this.tokens.push(token)
              //fila++;
              //columna = 0;
              token = {};
              estado = 'A';
            break;
          }
          break;
          //======================================= D =================================
        case 'E':
          switch(codigo){
            case 10://Salto de Linea ASCII
            if(token?.token) this.tokens.push(token);
              fila++;
              columna = 0;
              token = {};
              estado = 'A';
            break;

            case 32://Space
            if(token?.token) this.tokens.push(token)
              //fila++;
              //columna = 0;
              token = {};
              estado = 'A';
            break;
          }
          break;
          //======================================= E =================================
      }

    }*/

  
