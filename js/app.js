import { seleccionIntegrantes, pintarIntegrantes, validarInputs, cambioRuleta } from "./ui";
import { guardarGrupo } from "./state";

const button = document.getElementById('empezar');

const iniciarJuego = () => {

    if(validarInputs() === false){
        return
    };

    guardarGrupo();
    cambioRuleta();
    // Iniciar cronometro aqui
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