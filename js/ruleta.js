window.addEventListener('DOMContentLoaded', () => {

    const ruleta = document.getElementById('ruleta');
    // Atrapamos el nuevo contenedor que tiene las variables CSS
    const contenedorRuleta = document.querySelector('.contenedor-ruleta-juego');
    const pantallaPreguntas = document.getElementById('pantallaPreguntas');

    const opciones = [
        "Pregunta",
        "Castigo",
        "Pregunta",
        "Ganar Tiempo",
        "Pregunta",
        "Castigo",
        "Pregunta",
        "Perder Tiempo"
    ];

    let estadoRuleta = 'esperandoAlClic';
    let rotacionActual = 0;
    let opcionSeleccionada = 0;
    let resultadoFinal = '';

    ruleta.addEventListener('click', () => {
        if (estadoRuleta === 'girando') return;
        estadoRuleta = 'girando';
        
        // Ocultamos la tarjeta si estaba visible
        pantallaPreguntas.classList.add('oculto');

        // Reseteamos los colores de las variables CSS a su estado original
        contenedorRuleta.style.setProperty('--color-pregunta', '#4a148c');
        contenedorRuleta.style.setProperty('--color-castigo', '#e65100');
        contenedorRuleta.style.setProperty('--color-gana-tiempo', '#00c853');
        contenedorRuleta.style.setProperty('--color-pierde-tiempo', '#b71c1c');
        ruleta.style.boxShadow = '0 0 30px rgba(153, 0, 255, 0.6), 0 0 60px rgba(0, 204, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.8)';

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
                // Iluminamos el color morado manipulando el CSS
                contenedorRuleta.style.setProperty('--color-pregunta', '#a64dff'); 
                ruleta.style.boxShadow = '0 0 80px rgba(166, 77, 255, 0.8), inset 0 0 20px rgba(0,0,0,0.8)';
                
                // Mostramos la tarjeta fantasma
                setTimeout(() => {
                    pantallaPreguntas.classList.remove('oculto');
                    estadoRuleta = 'esperandoAlClic'; 
                }, 600);
                break;

            case 'Castigo':
                console.log('Ha salido un castigo');
                contenedorRuleta.style.setProperty('--color-castigo', '#ff8c1a');
                ruleta.style.boxShadow = '0 0 80px rgba(255, 140, 26, 0.8), inset 0 0 20px rgba(0,0,0,0.8)';
                setTimeout(() => estadoRuleta = 'esperandoAlClic', 1000);
                break;

            case 'Ganar Tiempo':
                console.log('Se gana tiempo');
                contenedorRuleta.style.setProperty('--color-gana-tiempo', '#00ff66');
                ruleta.style.boxShadow = '0 0 80px rgba(0, 255, 102, 0.8), inset 0 0 20px rgba(0,0,0,0.8)';
                setTimeout(() => estadoRuleta = 'esperandoAlClic', 1000);
                break;

            case 'Perder Tiempo':
                console.log('Se pierde tiempo');
                contenedorRuleta.style.setProperty('--color-pierde-tiempo', '#ff3333');
                ruleta.style.boxShadow = '0 0 80px rgba(255, 51, 51, 0.8), inset 0 0 20px rgba(0,0,0,0.8)';
                setTimeout(() => estadoRuleta = 'esperandoAlClic', 1000);
                break;

            default:
                console.log('Resultado no reconocido');
                estadoRuleta = 'esperandoAlClic';
                break;
        }
    }
});