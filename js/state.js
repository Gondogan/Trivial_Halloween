/**
 * ARCHIVO PARA GESTION DE DATOS, GRUPOS Y ESTADOS
 */

import { divIntegrantes } from "./ui.js";
import { grupo } from "./ui.js";

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
}

export const pararCronometro = () => {

    clearInterval(intervaloCronometro);
    
    return segundosTranscurridos;
}

export const obtenerGrupos = () => {

    const gruposGuardados = localStorage.getItem('trivial_grupos');

    if(!gruposGuardados){
        return [];
    }

    return JSON.parse(gruposGuardados);
}

export const guardarGrupo = () => {

    const grupos = obtenerGrupos();
    let integrantes = [];

    const inputs = divIntegrantes.querySelectorAll('input');

    for (const input of inputs) {
        integrantes.push(input.value.trim());
    }

    let equipoActual = {
        equipo: grupo.value.trim(),
        integrantes: integrantes,
        calabazas: 0,
        preguntasUsadas: 0,
        tiempoFinal: 0
    }
    
    grupos.push(equipoActual)
    
    console.log(grupos);
    return equipoActual
}

export const sumarCalabaza = (nombreGrupo) => {
    
    const grupos = obtenerGrupos();

    const indice = grupos.findIndex(grupo => grupo.equipo === nombreEquipo);

    if(indice !== -1){
        grupos[indice].calabazas += 1;

        if(grupos[indice].calabazas === 5){
            const tiempoTotal = pararCronometro();

            grupos[indice].tiempoFinal = tiempoTotal;

            // LLamar a la funcion que muestra pantalla game over
        }

        localStorage.setItem('trivial_grupos', JSON.stringify(grupos));
    }
}

export const quitarCalabaza = (nombreEquipo) => {
    const grupos = obtenerGrupos();
    const indice = grupos.findIndex(grupo => grupo.equipo === nombreEquipo);

    if(indice !== -1){
        grupos[indice].calabazas -= 1;
        
        if(grupos[indice].calabazas < 0){
            grupos[indice].calabazas = 0;
        }

        localStorage.setItem('trivial-grupos', JSON.stringify(grupos));
    }
}

export const pintarEquipoLateral = () => {
    
}



export const pintarPuntuacion = () => {
    
}