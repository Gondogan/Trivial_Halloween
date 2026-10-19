import { preguntas } from "../assets/data/questions.js";

let preguntasUsadas = [];

function obtenerPreguntaNoRepetida() {
  let disponibles = preguntas.filter( pregunta => !preguntasUsadas.includes(pregunta.id) );

  if (disponibles.length === 0) {
    preguntasUsadas = [];
    disponibles = preguntas;
  }

  const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
  const preguntaElegida = disponibles[indiceAleatorio];

  preguntasUsadas.push(preguntaElegida.id);

  return preguntaElegida;
}