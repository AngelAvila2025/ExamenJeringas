document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const feedback = document.getElementById('feedback'); // Lo mantenemos si quieres, pero no lo usamos para mostrar mensajes.
    const saludo = document.getElementById('saludo');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Al cargar, recuperar el nombre guardado en Local Storage (si existe)
    const storedName = localStorage.getItem('nombreUsuario');
    if (storedName) {
        saludo.textContent = `¡Bienvenido de nuevo, ${storedName}!`;
    } else {
        saludo.textContent = 'Por favor, registra tus datos en el formulario.';
    }

    // Evento de envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validación nativa
        if (!form.checkValidity()) {
            // Mostrar mensaje de error en el botón
            submitButton.textContent = 'Completa todos los campos';
            submitButton.style.backgroundColor = '#d90429'; // rojo
            form.reportValidity(); // Muestra mensajes nativos

            // Volver a texto original luego de 2 seg
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.style.backgroundColor = ''; // vuelve a color original del CSS
            }, 2000);

            return;
        }

        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();

        // Guardar nombre en Local Storage
        localStorage.setItem('nombreUsuario', nombre);

        // Mostrar mensaje éxito en el botón
        submitButton.textContent = '¡Datos guardados!';
        submitButton.style.backgroundColor = '#38b000'; // verde

        saludo.textContent = `¡Bienvenido, ${nombre}!`;

        // Limpiar formulario y volver texto botón luego de 2 segundos
        setTimeout(() => {
            form.reset();
            submitButton.textContent = originalButtonText;
            submitButton.style.backgroundColor = '';
        }, 2000);
    });
});
