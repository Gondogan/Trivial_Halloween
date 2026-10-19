/**
 * ARCHIVO PARA GESTION DE DATOS, GRUPOS Y ESTADOS
 */

import { infoGrupos } from "../assets/data/usuarios";
import { divIntegrantes } from "./ui";
import { grupo } from "./ui";

export const guardarGrupo = () => {
    let integrantes = [];
    const inputs = divIntegrantes.querySelectorAll('input');
    for (const input of inputs) {
        integrantes.push(input.value.trim());
    }

    let nuevoGrupo = {
        equipo: grupo.value.trim(),
        integrantes: integrantes,
        calabazas: 0,
        preguntasUsadas: 0,
        tiempoFinal: 0
    }
    infoGrupos.push(nuevoGrupo);
    console.log(infoGrupos);
}

export function sumarCalabaza() {
    estado.calabazas += 1;
    if(estado.calabazas === 5) {
        // Detener cronometro y cambiar a la pantalla final
        // Guardar el tiempo final en el objeto
    }
}

export function quitarCalabaza() {
    estado.calabazas -= 1;
    if(estado.calabazas < 0){
        // estado.calabazas = 0;
    }
}

export function pintarEquipoLateral() {
    
}

export function pintarCronometroLateral() {

}

export function setCronometro() {

}

export function pintarPuntuacion() {
    
}