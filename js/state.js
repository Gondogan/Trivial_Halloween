/**
 * ARCHIVO PARA GESTION DE DATOS, GRUPOS Y ESTADOS
 */

import { infoGrupos } from "../assets/data/usuarios.js";
import { divIntegrantes } from "./ui.js";
import { grupo } from "./ui.js";

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

export const sumarCalabaza = () => {
    estado.calabazas += 1;
    if(estado.calabazas === 5) {
        // Detener cronometro y cambiar a la pantalla final
        // Guardar el tiempo final en el objeto
    }
}

export const quitarCalabaza = () => {
    estado.calabazas -= 1;
    if(estado.calabazas < 0){
        // estado.calabazas = 0;
    }
}

export const pintarEquipoLateral = () => {
    
}

let intervaloCronometro = null;
let segundosTranscurridos = 0;

export const iniciarCronometro = () => {
    
    const tiempoTexto = document.querySelector('.tiempo-texto');

    clearInterval(intervaloCronometro);
    segundosTranscurridos = 0;
    tiempoTexto.textContent = "0:00";

    intervaloCronometro = setInterval(() => {
        segundosTranscurridos++;

        const minutos = Math.floor(segundosTranscurridos / 60);
        const segundos = segundosTranscurridos % 60;

        const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

        tiempoTexto.textContent = `${minutos}:${segundosFormateados}`;
        
    }, 1000);
};

export const pararCronometro = () => {

    clearInterval(intervaloCronometro);
    
    return segundosTranscurridos;
};

export const pintarPuntuacion = () => {
    
}