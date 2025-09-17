const btnAbrir = document.getElementById("btn-abrir-formulario");
const modal = document.getElementById("formulario-modal");
const overlay = document.getElementById("overlay");
const cerrar = document.getElementById("cerrar-modal");

btnAbrir.addEventListener("click", () => {
    modal.classList.add("show");
    overlay.classList.add("show");
});

cerrar.addEventListener("click", () => {
    modal.classList.remove("show");
    overlay.classList.remove("show");
});

overlay.addEventListener("click", () => {
    modal.classList.remove("show");
    overlay.classList.remove("show");
});

function confirmarEliminar(event) {
    event.preventDefault();
    const url = event.currentTarget.getAttribute("href");

    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará al candidato permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = url;
        }
    });
}

function mostrarNotificacion(event) {
    event.preventDefault();

    Swal.fire({
        title: '¡Candidato añadido!',
        text: 'Se ha registrado correctamente.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

    setTimeout(() => {
        event.target.submit();
    }, 2000);
}