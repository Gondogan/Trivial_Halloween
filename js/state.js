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
        pintarCronometro();
    }, 1000);
}

export const formatearTiempo = (total) => `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
export const pintarCronometro = () => {
    const elemento = document.querySelector('.tiempo-texto');
    if (elemento) elemento.textContent = formatearTiempo(segundosTranscurridos);
};

export const pararCronometro = () => {

    clearInterval(intervaloCronometro);
    return segundosTranscurridos;
}

export const obtenerGrupos = () => {

    const gruposGuardados = localStorage.getItem('trivial-grupos');

    if(!gruposGuardados){
        return [];
    }

    try {
        const grupos = JSON.parse(gruposGuardados);
        return Array.isArray(grupos) ? grupos : [];
    } catch {
        return [];
    }
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

            localStorage.setItem('trivial-grupos', JSON.stringify(grupos));
            window.dispatchEvent(new CustomEvent('trivial:victoria', { detail: { equipo: grupos[indice] } }));
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

export const restarTiempo = (segundos = 30) => {
    segundosTranscurridos = Math.max(0, segundosTranscurridos - segundos);
    pintarCronometro();
}

export const sumarTiempo = (segundos = 30) => {
    segundosTranscurridos += segundos;
    pintarCronometro();
}