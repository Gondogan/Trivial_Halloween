import {sumarCalabaza, 
        quitarCalabaza, 
        pintarEquipoLateral, 
        pintarCronometroLateral, 
        setCronometro, 
        pintarPuntuacion } 
from './state.js'

import {infoGrupos} from '../assets/data/usuarios.js'

const grupo = document.getElementById('input-nombre');
const nombre1 = document.getElementById('integrante-1');
const nombre2 = document.getElementById('integrante-2');
const nombre3 = document.getElementById('integrante-3');
const nombre4 = document.getElementById('integrante-4');

const button = document.getElementById('registrar');

button.addEventListener('click', () => {
    // Inicio del juego:
    //     - Validar inputs (impedir avanzar con campos vacios)
    //     - Guardar datos del grupo e integrantes
    //     - Ocultar el formulario y mostrar interfaz juego
    //     - Disparar el evento de inicio de cronometro


});

window.addEventListener("DOMContentLoaded", iniciarApp);