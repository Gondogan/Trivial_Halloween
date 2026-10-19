import {
    sumarCalabaza, 
    quitarCalabaza, 
    pintarEquipoLateral, 
    pintarCronometroLateral, 
    setCronometro, 
    pintarPuntuacion 
} from './state.js';

// import {infoGrupos} from '../assets/data/usuarios.js' // Descomenta si vas a usar esta ruta

document.addEventListener("DOMContentLoaded", () => {
    
    const formLogin = document.getElementById('formulario-login');
    const pantallaLogin = document.getElementById('pantalla-login');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const nombreGrupoDisplay = document.getElementById('nombre-grupo-display');

    // --- LÓGICA DEL FORMULARIO (Mostrar/Ocultar integrantes) ---
    const selectIntegrantes = document.getElementById("numero-integrantes");
    const input4 = document.getElementById("integrante-4");
    const label4 = document.querySelector('label[for="integrante-4"]');

    if (selectIntegrantes) {
        selectIntegrantes.addEventListener("change", () => {
            // Si eligen 4 o 5 integrantes, mostramos el 4º input
            if (selectIntegrantes.value === "4" || selectIntegrantes.value === "5") {
                input4.classList.remove("oculto");
                label4.classList.remove("oculto");
                input4.required = true;
            } else {
                input4.classList.add("oculto");
                label4.classList.add("oculto");
                input4.required = false;
            }
        });
    }

    // --- LÓGICA DE CAMBIO DE PANTALLA SPA ---
    if (formLogin) {
        formLogin.addEventListener('submit', (evento) => {
            // 1. Evita que la página recargue al enviar el formulario
            evento.preventDefault();

            // 2. Coger el nombre del grupo del input y pintarlo en el panel de juego
            const nombreDelGrupo = document.getElementById('input-nombre').value;
            if (nombreGrupoDisplay) {
                nombreGrupoDisplay.textContent = nombreDelGrupo;
            }
            
            // 3. Ocultar el formulario de login y mostrar la interfaz de juego
            pantallaLogin.classList.add('oculto');
            pantallaJuego.classList.remove('oculto');
            
            // 4. CAMBIAR EL FONDO AL DEL JUEGO
            document.body.classList.add('fondo-juego');

            // 5. Aquí puedes disparar el evento de inicio de cronómetro
            // setCronometro();
        });
    }
});