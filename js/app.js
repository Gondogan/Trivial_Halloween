import { seleccionIntegrantes, pintarIntegrantes, validarInputs, cambioRuleta } from "./ui.js";
import { guardarGrupo, iniciarCronometro, pintarEquipoLateral, obtenerGrupos, formatearTiempo } from './state.js';

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
// Pantallas finales y ranking real, almacenado en el navegador.
const mostrarPantalla = (id) => {
    ['pantallaRegistro', 'pantallaRuleta', 'pantallaPreguntas', 'pantallaGameOver', 'pantallaRanking', 'panelIzquierdo', 'panelDerecho'].forEach((pantalla) => {
        document.getElementById(pantalla)?.classList.add('oculto');
    });
    document.getElementById(id)?.classList.remove('oculto');
};

// ==========================================
// CONSULTAR RANKING DESDE EL REGISTRO
// ==========================================

const btnVerRanking = document.getElementById('btnVerRanking');
const btnVolverRegistro = document.getElementById('btnVolverRegistro');
const btnJugarDeNuevo = document.getElementById('btnJugarDeNuevo');
const marcadorActual = document.querySelector('.marcador-actual');
const subtituloVictoria = document.querySelector('.subtitulo-victoria');

// Renderiza la tabla sin modificar los equipos guardados.
const pintarTablaRanking = () => {
    const clasificacion = obtenerGrupos()
        .filter(grupo => grupo.calabazas >= 5 && Number.isFinite(grupo.tiempoFinal))
        .sort((a, b) => a.tiempoFinal - b.tiempoFinal);

    const cuerpo = document.getElementById('cuerpoRanking');
    cuerpo.replaceChildren();

    if (clasificacion.length === 0) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.colSpan = 3;
        celda.textContent = 'Todavía no hay equipos clasificados';
        fila.appendChild(celda);
        cuerpo.appendChild(fila);
        return;
    }

    clasificacion.forEach((grupo, indice) => {
        const fila = document.createElement('tr');
        [indice + 1, grupo.equipo, formatearTiempo(grupo.tiempoFinal)].forEach(valor => {
            const celda = document.createElement('td');
            celda.textContent = valor;
            fila.appendChild(celda);
        });
        cuerpo.appendChild(fila);
    });
};

// Ranking consultado desde la pantalla de registro.
btnVerRanking.addEventListener('click', () => {
    pintarTablaRanking();
    marcadorActual.classList.add('oculto');
    subtituloVictoria.classList.add('oculto');
    btnJugarDeNuevo.classList.add('oculto');
    btnVolverRegistro.classList.remove('oculto');
    document.getElementById('pantallaRegistro').classList.add('oculto');
    document.getElementById('pantallaRanking').classList.remove('oculto');
});

// Volver al registro SIN recargar y SIN modificar la partida.
btnVolverRegistro.addEventListener('click', () => {
    document.getElementById('pantallaRanking').classList.add('oculto');
    document.getElementById('pantallaRegistro').classList.remove('oculto');
    btnVolverRegistro.classList.add('oculto');
    btnJugarDeNuevo.classList.remove('oculto');
    marcadorActual.classList.remove('oculto');
    subtituloVictoria.classList.remove('oculto');
});

const mostrarRanking = (equipo) => {
    document.getElementById('rankingNombreGrupo').textContent = equipo.equipo;
    document.getElementById('rankingTiempo').textContent = formatearTiempo(equipo.tiempoFinal);
    pintarTablaRanking();
    marcadorActual.classList.remove('oculto');
    subtituloVictoria.classList.remove('oculto');
    btnJugarDeNuevo.classList.remove('oculto');
    btnVolverRegistro.classList.add('oculto');
    mostrarPantalla('pantallaRanking');
};

window.addEventListener('trivial:victoria', (evento) => mostrarRanking(evento.detail.equipo));
window.addEventListener('DOMContentLoaded', () => {
    ['btnJugarDeNuevo', 'btnReiniciarJuego'].forEach((id) => {
        document.getElementById(id)?.addEventListener('click', () => window.location.reload());
    });
});
