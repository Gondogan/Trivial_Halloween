import { preguntas } from "../assets/data/questions.js";
import { quitarCalabaza } from "./state.js";
import { sumarCalabaza } from "./state.js";
import { obtenerGrupos } from "./state.js";

let preguntasUsadas = [];
let respuestaCorrectaActual = "";
let equipoActual = "";

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
  const equipos = obtenerGrupos();
  if(equipos.length > 0){
    equipoActual = equipos[equipos.length - 1].equipo;
  } else {
    equipoActual = "Equipo Fantasma";
  }

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
    const vueltas = 5 * 360;
    const ajuste = (anguloDestino - posicionActual + 360) % 360;

    rotacionActual += vueltas + ajuste;
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
        console.log("Ha salido una pregunta");
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
        quitarCalabaza();
        // Añadir un alert o mensaje de unos segundos informando que pierden una calabaza
        console.log("Ha salido un castigo");
        contenedorRuleta.classList.add("resultado-castigo");
        setTimeout(() => (estadoRuleta = "esperandoAlClic"), 1000);
        break;

      case "Ganar Tiempo":
        // Ejecutar funcion restarTiempo()
        // Añadir un alert o mensaje de unos segundos informando que restan tiempo
        console.log("Se gana tiempo");
        contenedorRuleta.classList.add("resultado-gana-tiempo");
        setTimeout(() => (estadoRuleta = "esperandoAlClic"), 1000);
        break;

      case "Perder Tiempo":
        // Ejecutar funcion sumarTiempo()
        // Añadir un alert o mensaje de unos segundos informando que suman tiempo
        contenedorRuleta.classList.add("resultado-pierde-tiempo");
        setTimeout(() => (estadoRuleta = "esperandoAlClic"), 1000);
        break;

      default:
        console.log("Resultado no reconocido");
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
        console.log("¡Respuesta Correcta!");
        sumarCalabaza(equipoActual);
        evento.target.classList.add("respuesta-correcta");
      } else {
        console.log("¡Respuesta Incorrecta!");
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
