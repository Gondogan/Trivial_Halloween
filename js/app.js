import { seleccionIntegrantes, pintarIntegrantes, validarInputs, cambioRuleta } from "./ui.js";
import { guardarGrupo, iniciarCronometro, pintarEquipoLateral } from './state.js';

const button = document.getElementById('empezar');

const iniciarJuego = () => {

    if(validarInputs() === false) return;

    guardarGrupo();
    pintarEquipoLateral();
    cambioRuleta();
    iniciarCronometro();
    document.body.classList.add('fondo-juego');
}

const iniciarApp = () => {
    
    pintarIntegrantes();
    seleccionIntegrantes.addEventListener('change', pintarIntegrantes);
    
    button.addEventListener('click', (evento) => {
        evento.preventDefault(); 
        iniciarJuego();    
    });
}

window.addEventListener("DOMContentLoaded", iniciarApp);