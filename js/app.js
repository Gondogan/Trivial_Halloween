import { seleccionIntegrantes, pintarIntegrantes, validarInputs, cambioRuleta } from "./ui.js";
import { guardarGrupo, iniciarCronometro } from './state.js';

const button = document.getElementById('empezar');

const iniciarJuego = () => {

    if(validarInputs() === false){
        return
    };

    guardarGrupo();
    cambioRuleta();
    iniciarCronometro();
}

const iniciarApp = () => {
    
    pintarIntegrantes();
    seleccionIntegrantes.addEventListener('change', pintarIntegrantes)
    
    button.addEventListener('click', (evento) => {
        evento.preventDefault(); 
        iniciarJuego();    
    });
}

window.addEventListener("DOMContentLoaded", iniciarApp);