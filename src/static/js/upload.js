document.getElementById("fileUpload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
            file.type === "application/vnd.ms-excel") {
            console.log("Archivo válido:", file.name);
        } else {
            alert("Por favor, selecciona un archivo de Excel válido (.xls o .xlsx).");
        }
    }
});