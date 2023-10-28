function valida_envia() {
    // Valida el nombre
    var nombre = document.contacto.nombre.value.trim();
    nombre = nombre.toUpperCase(); // Convertir a mayúsculas
    if (nombre === "") {
        alert("Tiene que escribir su nombre");
        document.contacto.nombre.focus();
        return false;
    }

    var apellido = document.contacto.apellido.value.trim();
    if (apellido === "") {
        alert("Tiene que escribir su apellido");
        document.contacto.apellido.focus();
        return false;
    }

    // Valida que el dni sea valido.
    var dni = document.contacto.dni.value;
    dni = validarEntero(dni);
    document.contacto.dni.value = dni;
    if (dni === "" || dni < 100 ) {
        alert("Ingrese un dni válido");
        document.contacto.dni.focus();
        return false;
    }

    // Valida que el telefono sea valido.
    var telefono = document.contacto.telefono.value;
    telefono = validarEntero(telefono);
    document.contacto.telefono.value = telefono;
    if (telefono === "" || telefono < 1000000000 ) {
        alert("Ingrese un teléfono válido");
        document.contacto.telefono.focus();
        return false;
    }

    // Valida el correo electrónico
    var email = document.contacto.email.value.trim();
    if (email === "" || email.indexOf('@') === -1) {
        alert("Ingrese un mail valido");
        document.contacto.email.focus();
        return false;
    }
    
    // Valida el correo electrónico
    var email = document.contacto.email.value.trim();
    if (email === "" || email.indexOf('.com') === -1) {
        alert("Ingrese un mail valido");
        document.contacto.email.focus();
        return false;
    }

    // Valida la fecha de nacimiento
    var fechaNacimiento = document.contacto.fechaNacimiento.value;
    if (fechaNacimiento === "") {
        alert("Debe seleccionar una fecha de nacimiento.");
        document.contacto.fechaNacimiento.focus();
        return false;
    }

        // Calcula la edad a partir de la fecha de nacimiento
        var fechaNacimientoDate = new Date(fechaNacimiento);
        var fechaActual = new Date();
        var edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    
        // Verifica si el cumpleaños ya ha ocurrido este año
        if (
            fechaNacimientoDate.getMonth() > fechaActual.getMonth() ||
            (fechaNacimientoDate.getMonth() === fechaActual.getMonth() && fechaNacimientoDate.getDate() > fechaActual.getDate())
        ) {
            edad--;
        }
    
        // Valida que la edad sea mayor o igual a 18
        if (edad < 18) {
            alert("Debe ser mayor o igual a 18 años para asistir al evento.");
            document.contacto.fechaNacimiento.focus();
            return false;
        }


    //valido el sexo
    if (document.contacto.sexo.selectedIndex == 0) {
        alert("Debe seleccionar un genero válido.")
        document.contacto.sexo.focus()
        return 0;
    }

    //valido el marca
    if (document.contacto.marca.selectedIndex == 0) {
        alert("Debe seleccionar una marca de interés.")
        document.contacto.marca.focus()
        return 0;
    }

    // El formulario se envía
    alert("Su inscripción se registro con éxito");
    document.contacto.submit();
    return true;
}

function validarEntero(valor) {
    valor = parseInt(valor);
    if (isNaN(valor)) {
        return "";
    } else {
        return valor;
    }
}

function buro() {
    let dni = document.contacto.dni.value;
    let sexo = document.contacto.sexo.value;
    console.log(sexo);
}