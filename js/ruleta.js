import { preguntas } from "../assets/data/questions.js"; 

let preguntasUsadas = [];

function obtenerPreguntaNoRepetida() {
    let disponibles = preguntas.filter(
        pregunta => !preguntasUsadas.includes(pregunta.id)
    );

    if (disponibles.length === 0) {
        preguntasUsadas = [];
        disponibles = preguntas;
    }

    const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
    const preguntaElegida = disponibles[indiceAleatorio];
    preguntasUsadas.push(preguntaElegida.id);
    return preguntaElegida;
}

window.addEventListener('DOMContentLoaded', () => {

    const ruleta = document.getElementById('ruleta');
    const contenedorRuleta = document.querySelector('.contenedor-ruleta-juego');
    const pantallaPreguntas = document.getElementById('pantallaPreguntas');
    
    const tituloPregunta = document.querySelector('.pregunta-titulo');
    const botonesRespuesta = document.querySelectorAll('.btn-respuesta');

    const opciones = [
        "Pregunta", "Castigo", "Pregunta", "Ganar Tiempo",
        "Pregunta", "Castigo", "Pregunta", "Perder Tiempo"
    ];

    let estadoRuleta = 'esperandoAlClic';
    let rotacionActual = 0;
    let opcionSeleccionada = 0; 
    let resultadoFinal = '';

    ruleta.addEventListener('click', () => {

        if (estadoRuleta === 'girando') return;
        estadoRuleta = 'girando';
        
        pantallaPreguntas.classList.add('oculto');

        // LIMPIEZA PROFESIONAL: Quitamos cualquier clase de estado anterior para apagar las luces
        contenedorRuleta.classList.remove(
            'resultado-pregunta', 
            'resultado-castigo', 
            'resultado-gana-tiempo', 
            'resultado-pierde-tiempo'
        );
        
        opcionSeleccionada = Math.floor(Math.random() * opciones.length);
        const gradosPorOpcion = 360 / opciones.length;
        const posicionActual = rotacionActual % 360;
        const anguloDestino = (360 - opcionSeleccionada * gradosPorOpcion) % 360;
        const vueltas = 5 * 360;
        const ajuste = (anguloDestino - posicionActual + 360) % 360;

        rotacionActual += vueltas + ajuste;
        ruleta.style.transform = `rotate(${rotacionActual}deg)`;
    });

    ruleta.addEventListener('transitionend', (evento) => {
        if (evento.propertyName !== 'transform') return;
        if (estadoRuleta !== 'girando') return;

        estadoRuleta = 'resultado';
        resultadoFinal = opciones[opcionSeleccionada];
        
        gestionarResultado(resultadoFinal);
    });

    function gestionarResultado(resultadoFinal) {
        switch (resultadoFinal) {
            case 'Pregunta':
                console.log('Ha salido una pregunta');
                
                // ASIGNAMOS LA CLASE AL CONTENEDOR (El CSS hace el resto)
                contenedorRuleta.classList.add('resultado-pregunta');
                
                const nuevaPregunta = obtenerPreguntaNoRepetida();
                tituloPregunta.textContent = nuevaPregunta.pregunta;
                botonesRespuesta.forEach((boton, index) => {
                    boton.textContent = nuevaPregunta.opciones[index];
                });
                
                setTimeout(() => {
                    pantallaPreguntas.classList.remove('oculto');
                    estadoRuleta = 'esperandoAlClic'; 
                    pantallaPreguntas.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 600);
                break;

            case 'Castigo':
                console.log('Ha salido un castigo');
                contenedorRuleta.classList.add('resultado-castigo');
                setTimeout(() => estadoRuleta = 'esperandoAlClic', 1000);
                break;

            case 'Ganar Tiempo':
                console.log('Se gana tiempo');
                contenedorRuleta.classList.add('resultado-gana-tiempo');
                setTimeout(() => estadoRuleta = 'esperandoAlClic', 1000);
                break;

            case 'Perder Tiempo':
                console.log('Se pierde tiempo');
                contenedorRuleta.classList.add('resultado-pierde-tiempo');
                setTimeout(() => estadoRuleta = 'esperandoAlClic', 1000);
                break;

            default:
                console.log('Resultado no reconocido');
                estadoRuleta = 'esperandoAlClic';
                break;
        }
    }
});