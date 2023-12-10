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
    var fecha_nacimiento = document.contacto.fecha_nacimiento.value;
    if (fecha_nacimiento === "") {
        alert("Debe seleccionar una fecha de nacimiento.");
        document.contacto.fecha_nacimiento.focus();
        return false;
    }

        // Calcula la edad a partir de la fecha de nacimiento
        var fecha_nacimientoDate = new Date(fecha_nacimiento);
        var fechaActual = new Date();
        var edad = fechaActual.getFullYear() - fecha_nacimientoDate.getFullYear();
    
        // Verifica si el cumpleaños ya ha ocurrido este año
        if (
            fecha_nacimientoDate.getMonth() > fechaActual.getMonth() ||
            (fecha_nacimientoDate.getMonth() === fechaActual.getMonth() && fecha_nacimientoDate.getDate() > fechaActual.getDate())
        ) {
            edad--;
        }
    
        // Valida que la edad sea mayor o igual a 18
        if (edad < 18) {
            alert("Debe ser mayor o igual a 18 años para asistir al evento.");
            document.contacto.fecha_nacimiento.focus();
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
document.getElementById('form-container').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    
    // Obtener los datos del formulario
    const formData = new FormData(document.getElementById('contactForm'));

    // Realizar el envío utilizando fetch
    fetch('http://Emiliano90.pythonanywhere.com/leads', {
    method: 'POST',
    body: formData
    })
    .then(response => {
        if (response.ok) {
            // Ocultar formulario
            document.getElementById('contactForm').style.display = 'none'; 
            // Mostrar el mensaje de "Datos enviados"
            // document.getElementById('mensajeEnviado').style.display = 'block';
            
            // Reiniciar el formulario después de 2 segundos (puedes ajustar el tiempo)
            setTimeout(function() {
            // Ocultar formulario
            document.getElementById('form-container').reset();
            document.getElementById('form-container').style.display = 'block'; 
            // document.getElementById('mensajeEnviado').style.display = 'none';
            }, 2000);
        } else {
            throw new Error('Error al enviar los datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
