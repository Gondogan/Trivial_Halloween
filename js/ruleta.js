window.addEventListener('DOMContentLoaded', () => {

    // 1. Variables y elementos HTML
    const ruleta = document.getElementById('ruleta');

    const opciones = [
        "Pregunta",
        "Castigo",
        "Ganar Tiempo",
        "Pregunta",
        "Pregunta",
        "Castigo",
        "Perder Tiempo",
        "Pregunta"
    ];

    let estadoRuleta = 'esperandoAlClic';
    let rotacionActual = 0;
    let opcionSeleccionada = 0;
    let resultadoFinal = '';

    // 2. Evento que hace girar la ruleta
    ruleta.addEventListener('click', () => {

        if (estadoRuleta === 'girando') {
            return;
        }

        estadoRuleta = 'girando';

        opcionSeleccionada = Math.floor(Math.random() * opciones.length);

        const gradosPorOpcion = 360 / opciones.length;
        const posicionActual = rotacionActual % 360;

        const anguloDestino =
            (360 - opcionSeleccionada * gradosPorOpcion) % 360;

        const vueltas = 5 * 360;

        const ajuste =
            (anguloDestino - posicionActual + 360) % 360;

        rotacionActual += vueltas + ajuste;

        ruleta.style.transform = `rotate(${rotacionActual}deg)`;
    });

    // 3. Evento que detecta cuándo termina el giro
    ruleta.addEventListener('transitionend', (evento) => {

        if (evento.propertyName !== 'transform') {
            return;
        }

        if (estadoRuleta !== 'girando') {
            return;
        }

        estadoRuleta = 'resultado';

        resultadoFinal = opciones[opcionSeleccionada];

        gestionarResultado(resultadoFinal);
    });

    // 4. Función que gestiona el resultado
    function gestionarResultado(resultadoFinal) {

        switch (resultadoFinal) {

            case 'Pregunta':
                console.log('Ha salido una pregunta');
                break;

            case 'Castigo':
                console.log('Ha salido un castigo');
                break;

            case 'Ganar Tiempo':
                console.log('Se gana tiempo');
                break;

            case 'Perder Tiempo':
                console.log('Se pierde tiempo');
                break;

            default:
                console.log('Resultado no reconocido');
                break;
        }
    }

});