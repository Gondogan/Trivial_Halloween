/**
 * ARCHIVO PARA FUNCIONES RELACIONADAS CON LA UI ( Manipulacion del DOM y validaciones HTML)
 */

export const seleccionIntegrantes = document.getElementById('numero-integrantes');
export const divIntegrantes = document.getElementById('contenedor-integrantes');
export const grupo = document.getElementById('grupo');

export const pintarIntegrantes = () => {
    let numero = seleccionIntegrantes.value;
    divIntegrantes.innerHTML = '';

    for (let i = 0; i < numero; i++) {
        let label = document.createElement('label');
        label.htmlFor = `integrante-${i+1}`;
        label.textContent = `Nombre ${i+1} integrante`

        let input = document.createElement('input');
        input.type = "text";
        input.name = `integrante-${i+1}`;
        input.id = `integrante-${i+1}`;
        input.placeholder = "INTRODUCE TU NOMBRE"
        
        divIntegrantes.append(label);
        divIntegrantes.appendChild(input);
    }
}

export const validarInputs = () => {
    if(grupo.value.trim() === ""){
        alert('Rellena todos los campos para avanzar.');
        return false;
    }
    
    const inputs = divIntegrantes.querySelectorAll('input');
    for (const input of inputs) {
        if(input.value.trim() === ""){
            alert('Rellena todos los campos para avanzar.');
            return false;
        }
    }
    return true;
}

export const cambioRuleta = () => {
    const registro = document.getElementById('pantallaRegistro');
    registro.classList.add('oculto');

    const ruleta = document.getElementById('pantallaRuleta');
    const panelIzquierdo = document.getElementById('panelIzquierdo')
    const panelDerecho = document.getElementById('panelDerecho')
    ruleta.classList.remove('oculto');
    panelIzquierdo.classList.remove('oculto');
    panelDerecho.classList.remove('oculto');
    
}