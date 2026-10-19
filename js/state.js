// Objeto que guardará la información global de la partida
export const estado = {
    calabazas: 4, // Empiezan con 4 vidas activas
    tiempoFinal: null
};

export function sumarCalabaza() {
    estado.calabazas += 1;
    if(estado.calabazas === 5) {
        // Detener cronometro y cambiar a la pantalla final
        // Guardar el tiempo final en el objeto
    }
}

export function quitarCalabaza() {
    estado.calabazas -= 1;
    if(estado.calabazas < 0){
        // estado.calabazas = 0;
    }
}

export function pintarEquipoLateral() {

}

export function pintarCronometroLateral() {

}

export function setCronometro() {

}

export function pintarPuntuacion() {

}