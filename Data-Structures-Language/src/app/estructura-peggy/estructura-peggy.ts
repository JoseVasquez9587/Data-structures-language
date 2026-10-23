import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Parser } from './parser/parser';

@Component({
  selector: 'app-estructura-peggy',
  imports: [FormsModule],
  templateUrl: './estructura-peggy.html',
  styleUrl: './estructura-peggy.css',
})
export class EstructuraPeggy {
  texto:string = "";
  estructuras:any = [];
  salida:string = "";
  errores:any = [];
  private parser:Parser;

  constructor(parser:Parser){
    this.parser = parser;
    
  }

  parsear(){
    this.estructuras = [];
    this.salida = "";
    this.errores = [];
 
    try{
      this.estructuras = this.parser.compilar(this.texto);
      this.salida = this.estructuras.map((e:any) => JSON.stringify(e)).join("\n");
    }catch(e:any){
      console.log(e);
      this.errores.push({
        linea: e.location?.start.line,
        columna: e.location?.start.column,
        encontrado: e.found ?? "EOF",
        descripcion: e.message
      });
    }
 
  }
}
