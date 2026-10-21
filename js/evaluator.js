function comprobarRespuesta(pregunta, opcionSeleccionada) {
  return opcionSeleccionada === pregunta.correcta;
}

export { comprobarRespuesta };
