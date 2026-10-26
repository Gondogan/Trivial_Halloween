/**
 * ARCHIVO PARA GESTION DE DATOS, GRUPOS Y ESTADOS
 */

import { divIntegrantes } from "./ui.js";
import { grupo } from "./ui.js";

let intervaloCronometro = null;
let segundosTranscurridos = 0;
let equipoEnJuego = null;

export const getEquipoActual = () => equipoEnJuego;

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

    const gruposGuardados = localStorage.getItem('trivial-grupos');

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

    let nuevoEquipo = {
        equipo: grupo.value.trim(),
        integrantes: integrantes,
        calabazas: 0,
        preguntasUsadas: 0,
        tiempoFinal: 0
    }
    
    grupos.push(nuevoEquipo)

    localStorage.setItem('trivial-grupos', JSON.stringify(grupos));

    equipoEnJuego = nuevoEquipo;

    return nuevoEquipo;
}

export const sumarCalabaza = (nombreEquipo) => {
    
    const grupos = obtenerGrupos();

    const indice = grupos.findIndex(grupo => grupo.equipo === nombreEquipo);

    if(indice !== -1){
        grupos[indice].calabazas++;
        equipoEnJuego.calabazas = grupos[indice].calabazas;

        if(grupos[indice].calabazas >= 5){
            const tiempoTotal = pararCronometro();

            grupos[indice].tiempoFinal = tiempoTotal;

            // LLamar a la funcion que muestra pantalla victoria
        }
        localStorage.setItem('trivial-grupos', JSON.stringify(grupos));
        pintarPuntuacion();
    }
}

export const quitarCalabaza = (nombreEquipo) => {
    const grupos = obtenerGrupos();
    const indice = grupos.findIndex(grupo => grupo.equipo === nombreEquipo);

    if(indice !== -1){
        grupos[indice].calabazas = Math.max(0, grupos[indice].calabazas - 1);
        
        if (equipoEnJuego){
            equipoEnJuego.calabazas = grupos[indice].calabazas;
        }    

        localStorage.setItem('trivial-grupos', JSON.stringify(grupos));
        pintarPuntuacion();
    }
}

export const pintarEquipoLateral = () => {
    const nombre = document.querySelector('.nombre-grupo');
    nombre.textContent = equipoEnJuego.equipo;
}

export const pintarPuntuacion = () => {
    const spans = document.querySelectorAll('.calabaza');
    
    spans.forEach((span, indice) => {
        if (indice < equipoEnJuego.calabazas) {
            span.classList.add('activa');
            span.classList.remove('inactiva');
        } else {
            span.classList.add('inactiva');
            span.classList.remove('activa');
        }
    });
}

export const restarTiempo = () => {
    segundosTranscurridos = Math.max(0, segundosTranscurridos - 30);
}

export const sumarTiempo = () => {
    segundosTranscurridos += 30;
}