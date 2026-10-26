import { preguntas } from "../assets/data/questions.js";
import { quitarCalabaza, sumarCalabaza, getEquipoActual, sumarTiempo, restarTiempo } from "./state.js";

let preguntasUsadas = [];
let respuestaCorrectaActual = "";

function obtenerPreguntaNoRepetida() {
  let disponibles = preguntas.filter(
    (pregunta) => !preguntasUsadas.includes(pregunta.id),
  );

  if (disponibles.length === 0) {
    preguntasUsadas = [];
    disponibles = preguntas;
  }

  const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
  const preguntaElegida = disponibles[indiceAleatorio];
  preguntasUsadas.push(preguntaElegida.id);
  console.log(preguntasUsadas);
  return preguntaElegida;
}

window.addEventListener("DOMContentLoaded", () => {

  const ruleta = document.getElementById("ruleta");
  const contenedorRuleta = document.querySelector(".contenedor-ruleta-juego");
  const pantallaPreguntas = document.getElementById("pantallaPreguntas");
  const tituloPregunta = document.querySelector(".pregunta-titulo");
  const botonesRespuesta = document.querySelectorAll(".btn-respuesta");

  const opciones = [
    "Pregunta",
    "Castigo",
    "Pregunta",
    "Ganar Tiempo",
    "Pregunta",
    "Castigo",
    "Pregunta",
    "Perder Tiempo",
  ];

  let estadoRuleta = "esperandoAlClic";
  let rotacionActual = 0;
  let opcionSeleccionada = 0;
  let resultadoFinal = "";

  ruleta.addEventListener("click", () => {
    if (estadoRuleta !== "esperandoAlClic") return;
    estadoRuleta = "girando";

    pantallaPreguntas.classList.add("oculto");

    // LIMPIEZA PROFESIONAL: Quitamos cualquier clase de estado anterior para apagar las luces
    contenedorRuleta.classList.remove(
      "resultado-pregunta",
      "resultado-castigo",
      "resultado-gana-tiempo",
      "resultado-pierde-tiempo",
    );

    opcionSeleccionada = Math.floor(Math.random() * opciones.length);
    const gradosPorOpcion = 360 / opciones.length;
    const posicionActual = rotacionActual % 360;
    const anguloDestino = (360 - opcionSeleccionada * gradosPorOpcion) % 360;
    const ajuste = (anguloDestino - posicionActual + 360) % 360;

    rotacionActual += 5 * 360 + ajuste;
    ruleta.style.transform = `rotate(${rotacionActual}deg)`;
  });

  ruleta.addEventListener("transitionend", (evento) => {
    if (evento.target !== ruleta) return;
    if (evento.propertyName !== "transform") return;
    if (estadoRuleta !== "girando") return;

    estadoRuleta = "resultado";
    resultadoFinal = opciones[opcionSeleccionada];

    gestionarResultado(resultadoFinal);
  });

  function gestionarResultado(resultadoFinal) {
    switch (resultadoFinal) {
      case "Pregunta":
        contenedorRuleta.classList.add("resultado-pregunta");

        const nuevaPregunta = obtenerPreguntaNoRepetida();

        if (typeof nuevaPregunta.correcta === "number") {
          respuestaCorrectaActual = nuevaPregunta.opciones[nuevaPregunta.correcta].toString().trim();
        } else {
          respuestaCorrectaActual = nuevaPregunta.correcta.toString().trim();
        }

        tituloPregunta.textContent = nuevaPregunta.pregunta;
        botonesRespuesta.forEach((boton, index) => {
          boton.textContent = nuevaPregunta.opciones[index];
        });

        setTimeout(() => {
          contenedorRuleta.classList.add("oculto");
          pantallaPreguntas.classList.remove("oculto");
          estadoRuleta = "esperandoAlClic";
          pantallaPreguntas.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 2000);
        break;

      case "Castigo":
        contenedorRuleta.classList.add("resultado-castigo");
        quitarCalabaza(getEquipoActual()?.equipo);
        setTimeout(() => (estadoRuleta = "esperandoAlClic"), 1000);
        break;

      case "Ganar Tiempo":
        contenedorRuleta.classList.add("resultado-gana-tiempo");
        restarTiempo(30);
        setTimeout(() => (estadoRuleta = "esperandoAlClic"), 1000);
        break;

      case "Perder Tiempo":
        contenedorRuleta.classList.add("resultado-pierde-tiempo");
        sumarTiempo(30);
        setTimeout(() => (estadoRuleta = "esperandoAlClic"), 1000);
        break;

      default:
        estadoRuleta = "esperandoAlClic";
        break;
    }
  }

  botonesRespuesta.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      botonesRespuesta.forEach((btn) => (btn.style.pointerEvents = "none"));

      const respuestaElegida = evento.target.textContent.trim();

      // 2. Comparamos con la respuesta correcta que guardamos antes
      if (respuestaElegida === respuestaCorrectaActual) {
        sumarCalabaza(getEquipoActual()?.equipo);
        evento.target.classList.add("respuesta-correcta");
      } else {
        evento.target.classList.add("respuesta-incorrecta");
        botonesRespuesta.forEach((btn) => {
          if (btn.textContent === respuestaCorrectaActual) {
            btn.classList.add("respuesta-correcta");
          }
        });
      }

      // 3. Pequeña pausa para que vean si han acertado o fallado antes de cambiar
      setTimeout(() => {
        botonesRespuesta.forEach((btn) => {
          btn.classList.remove("respuesta-correcta", "respuesta-incorrecta");
          btn.style.pointerEvents = "auto"; // Volvemos a permitir clics
        });

        pantallaPreguntas.classList.add("oculto");
        contenedorRuleta.classList.remove("oculto");
      }, 2500);
    });
  });
});
