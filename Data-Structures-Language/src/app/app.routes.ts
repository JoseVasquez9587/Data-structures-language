import { Routes } from '@angular/router';
import { Analizador } from './analizador/analizador';
import { EstructuraPeggy } from './estructura-peggy/estructura-peggy';
import { Grafica } from './grafica/grafica';

export const routes: Routes = [
    {path:'',component:EstructuraPeggy},
    {path:'grafo',component:Grafica}
];
