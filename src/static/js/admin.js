function actualizarVotos() {
    $.ajax({
        url: "/admin/votos",
        type: "GET",
        success: function (data) {
            $("#tabla-votos").html(data.html);

            // 🔄 Actualizar filtro de jornada
            const jornadaSelect = $("#filtro-jornada");
            const jornadaActual = jornadaSelect.val();
            jornadaSelect.empty().append(`<option value="">Todas</option>`);
            data.jornadas.forEach(j => {
                jornadaSelect.append(`<option value="${j}">${j.charAt(0).toUpperCase() + j.slice(1)}</option>`);
            });
            jornadaSelect.val(jornadaActual); // Restaurar selección

            // Actualizar filtro de candidato
            const candidatoSelect = $("#filtro-candidato");
            const candidatoActual = candidatoSelect.val();
            candidatoSelect.empty().append(`<option value="">Todos</option>`);
            data.candidatos.forEach(c => {
                candidatoSelect.append(`<option value="${c}">${c}</option>`);
            });
            candidatoSelect.val(candidatoActual); // Restaurar selección

            // Reaplicar los filtros activos
            aplicarFiltros();

            $("#form-exportar").on("submit", function (e) {
                // Copiar los filtros activos a los inputs ocultos
                $("#filtro-jornada-hidden").val($("#filtro-jornada").val());
                $("#filtro-candidato-hidden").val($("#filtro-candidato").val());
            });

            $("#total-votos").text(data.total);
            actualizarResumenVotos(data);
        }
    });
}

function actualizarResumenVotos(data) {
    // Procesar datos del resumen
    const resumenPorJornada = {};
    
    // Inicializar el resumen por jornada con los totales
    data.total_por_jornada.forEach(tj => {
        resumenPorJornada[tj.jornada] = {
            total: tj.total_votos,
            candidatos: {}
        };
    });

    // Agregar los votos por candidato en cada jornada
    data.resumen_votos.forEach(rv => {
        if (!resumenPorJornada[rv.jornada].candidatos) {
            resumenPorJornada[rv.jornada].candidatos = {};
        }
        resumenPorJornada[rv.jornada].candidatos[rv.nombre_candidato] = rv.total_votos;
    });

    // Generar HTML del resumen
    let html = `<div class="total-votos-resumen">Votos Totales: ${data.total}</div>`;

    // Agregar resumen por jornada
    Object.keys(resumenPorJornada).forEach(jornada => {
        const jornadaData = resumenPorJornada[jornada];
        html += `
            <div class="jornada-resumen">
                <div class="jornada-titulo">
                    Jornada ${jornada.charAt(0).toUpperCase() + jornada.slice(1)}: ${jornadaData.total}
                </div>
                <div class="candidato-votos">`;

        // Agregar votos por candidato
        Object.keys(jornadaData.candidatos).forEach(candidato => {
            html += `
                <div>
                    ${candidato}: ${jornadaData.candidatos[candidato]}
                </div>`;
        });

        html += `</div></div>`;
    });

    // Actualizar el contenido
    $('.resumenes').html(html);

    // Agregar resumen por jornada
    Object.keys(resumen.jornadas).forEach(jornada => {
        const jornadaData = resumen.jornadas[jornada];
        html += `
            <div class="jornada-resumen">
                <div class="jornada-titulo">
                    Jornada ${jornada.charAt(0).toUpperCase() + jornada.slice(1)}: ${jornadaData.total}
                </div>
                <div class="candidato-votos">`;

        // Agregar votos por candidato
        Object.keys(jornadaData.candidatos).forEach(candidato => {
            html += `
                <div>
                    ${candidato}: ${jornadaData.candidatos[candidato]}
                </div>`;
        });

        html += `</div></div>`;
    });

    // Actualizar el contenido
    $('.resumenes').html(html);
}

setInterval(actualizarVotos, 1000); // Recarga los votos cada segundo

function aplicarFiltros() {
    const jornadaSeleccionada = $('#filtro-jornada').val().toLowerCase();
    const candidatoSeleccionado = $('#filtro-candidato').val().toLowerCase();

    $('#tabla-votos tr').each(function () {
        const jornada = $(this).find('td:eq(3)').text().toLowerCase();
        const candidato = $(this).find('td:eq(4)').text().toLowerCase();

        const coincideJornada = !jornadaSeleccionada || jornada === jornadaSeleccionada;
        const coincideCandidato = !candidatoSeleccionado || candidato === candidatoSeleccionado;

        if (coincideJornada && coincideCandidato) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

$('#filtro-jornada, #filtro-candidato').on('change', aplicarFiltros);