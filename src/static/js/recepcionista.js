document.getElementById('buscarForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const documento = document.getElementById('documento').value;

    fetch('/buscar_votante', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documento: documento })
    })
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');

        // Si la solicitud fue exitosa, muestra los datos del usuario
        if (data.status === 'success' || data.status === 'warning') {
            const usuario = data.data;
            resultadoDiv.innerHTML = `
                <p><strong>Documento:</strong> ${usuario.documento}</p>
                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p><strong>Ficha:</strong> ${usuario.ficha}</p>
                <p><strong>Jornada:</strong> ${usuario.jornada}</p>
                <p><strong>Mesa:</strong> ${usuario.mesa}</p>
                <p>${data.message}</p>
            `;
            resultadoDiv.style.color = data.status === 'success' ? 'green' : 'orange';
        } else {
            // Si hay un error, muestra el mensaje de error
            resultadoDiv.innerHTML = `<p>${data.message}</p>`;
            resultadoDiv.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado').innerHTML = '<p>Error al procesar la solicitud.</p>';
    });
});
