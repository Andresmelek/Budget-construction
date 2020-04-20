// variables
const presupuestoUsuario = prompt('Cúal es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

// clases
// clase presupuesto
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // Método para ir reststando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }

}
//clase de interfaz maneja todo lo relacionado al html
class Interfaz {
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // intertat al html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;

    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'Error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-succes');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        // quitar el alert después de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }

    // insertar los gastos a la lista
        agregarGastoListado(nombre, cantidad){
            const gastoListado = document.querySelector('#gastos ul');

            // crear un li
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            // insertar gasto
            li.innerHTML = `
                        ${nombre}
                        <span class="badge badge-primary badge-pill">$ ${cantidad} </span>
            `;

            //insertar al html
            gastoListado.appendChild(li);

        }
    // comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        // actualizamos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
       
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }
    // cambia de color el presupuesto restante
    comprobarPresupuesto (){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        // comprobar el 25% del gasto
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-succes', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2 ) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-succes');
            restante.classList.add('alert-warning');
        }
    }
}


// event listeners
document.addEventListener('DOMContentLoaded', function(){
    if (presupuestoUsuario === null || presupuestoUsuario === ""){
        window.location.reload();
    } else {
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        // instanciarr la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});
 
formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //leer del formulario del gasto

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //Instanciar la interfaz
    const ui = new Interfaz();

    // comprobar que los campos no esten vacíos
    if (nombreGasto === "" || cantidadGasto === ""){
        // Dos parametros mensaje y tipo
        ui.imprimirMensaje('Hubo en error', 'Error');
    } else {
        ui.imprimirMensaje('Correcto', 'Correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});