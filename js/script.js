import {sumarCalabaza, 
        quitarCalabaza, 
        pintarEquipoLateral, 
        pintarCronometroLateral, 
        setCronometro, 
        pintarPuntuacion } 
from './state.js'

import {infoGrupos} from '../assets/data/usuarios.js'

const seleccionIntegrantes = document.getElementById('numero-integrantes');
const divIntegrantes = document.getElementById('contenedor-integrantes');
const button = document.getElementById('empezar');

const pintarIntegrantes = () => {
    let numero = seleccionIntegrantes.value;
    divIntegrantes.innerHTML = '';

    for (let i = 0; i < numero; i++) {
        let label = document.createElement('label');
        label.htmlFor = `integrante-${i+1}`;
        label.textContent = `Nombre ${i+1} integrante`

        let input = document.createElement('input');
        input.type = "text";
        input.name = `integrante-${i+1}`;
        input.id = `integrante-${i+1}`;
        input.placeholder = "INTRODUCE TU NOMBRE"
        
        divIntegrantes.append(label);
        divIntegrantes.appendChild(input);
    }
}

const iniciarJuego = () => {

    if(validarInputs() === false){
        return
    };

    let integrantes = [];
    const inputs = divIntegrantes.querySelectorAll('input');
    for (const input of inputs) {
        integrantes.push(input.value.trim());
    }

    const grupo = document.getElementById('grupo');
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

const validarInputs = () => {
    const grupo = document.getElementById('grupo');
    if(grupo.value.trim() === ""){
        alert('Rellena todos los campos para avanzar.');
        return false;
    }
    
    const inputs = divIntegrantes.querySelectorAll('input');
    for (const input of inputs) {
        if(input.value.trim() === ""){
            alert('Rellena todos los campos para avanzar.');
            return false;
        }
    }
    return true;
}

const iniciarApp = () => {

    pintarIntegrantes();

    seleccionIntegrantes.addEventListener('change', pintarIntegrantes)
    
    button.addEventListener('click', (evento) => {
        evento.preventDefault(); 
        
        iniciarJuego();
            
        // - Ocultar el formulario y mostrar interfaz juego hablar con pedro de como va a hacer la ruleta
        // - Disparar el evento de inicio de cronometro
    
    });
}

window.addEventListener("DOMContentLoaded", iniciarApp);