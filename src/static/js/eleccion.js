document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-confirmacion');
    const mensaje = document.getElementById('mensaje-confirmacion');
    const imagenCandidato = document.getElementById('imagen-candidato');
    const cancelarBtn = document.getElementById('cancelar-btn');
    const confirmarBtn = document.getElementById('confirmar-btn');
    let formActual = null;

    // Mostrar el modal de confirmación
    window.mostrarConfirmacion = (event, nombreCandidato, form) => {
        event.preventDefault(); // Evitar envío del formulario
        formActual = form; // Guardar el formulario actual

        // Actualizar el mensaje y la imagen del modal
        mensaje.textContent = `¿Está seguro de que desea elegir a ${nombreCandidato}?`;

        // Obtener la ruta de la imagen del candidato
        const imgSrc = form.previousElementSibling.previousElementSibling.src; // Ruta de la imagen
        imagenCandidato.src = imgSrc;
        imagenCandidato.style.display = 'block'; // Asegurarse de que sea visible

        // Mostrar el modal
        modal.classList.add('mostrar');
        return false;
    };

    // Cerrar el modal al cancelar
    cancelarBtn.addEventListener('click', () => {
        modal.classList.remove('mostrar');
        formActual = null;
        imagenCandidato.style.display = 'none'; // Ocultar la imagen
    });

    // Confirmar la elección
    confirmarBtn.addEventListener('click', () => {
        modal.classList.remove('mostrar');
        if (formActual) {
            formActual.submit(); // Enviar el formulario guardado
        }
        imagenCandidato.style.display = 'none'; // Ocultar la imagen
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let minutos = 1;
    let segundos = 10;

    const temporizador = document.getElementById("temporizador");
    const spanMinutos = document.getElementById("minutos");
    const spanSegundos = document.getElementById("segundos");

    const intervalo = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalo);
                window.location.href = "/"; // Redirigir al final del tiempo
                return;
            } else {
                minutos--;
                segundos = 59;
            }
        } else {
            segundos--;
        }

        // Actualizar el contenido del temporizador
        spanMinutos.textContent = minutos.toString().padStart(1, "0");
        spanSegundos.textContent = segundos.toString().padStart(2, "0");

        // Cambiar estilos cuando queden 10 segundos o menos
        if (minutos === 0 && segundos <= 10) {
            temporizador.classList.add("alerta");
        }

        // Aplicar parpadeo en los últimos 5 segundos
        if (minutos === 0 && segundos <= 5) {
            temporizador.classList.add("parpadeo");
        }
    }, 1000);
});
