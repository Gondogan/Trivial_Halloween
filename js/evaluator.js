import { sumarCalabaza, pasarTurno } from "./state.js";

function comprobarRespuesta(pregunta, opcionSeleccionada) {
  return opcionSeleccionada === pregunta.correcta;
}

function procesarRespuesta(pregunta, opcionSeleccionada) {
  const esCorrecta = comprobarRespuesta(pregunta, opcionSeleccionada);

  if (esCorrecta) {
    sumarCalabaza();
  } else {
    pasarTurno();
  }

  return esCorrecta;
}

export { comprobarRespuesta, procesarRespuesta };