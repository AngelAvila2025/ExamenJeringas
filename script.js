document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const saludo = document.getElementById('saludo');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Al cargar, recuperar todos los datos guardados en Local Storage
    const storedData = {
        nombre: localStorage.getItem('nombreUsuario'),
        email: localStorage.getItem('emailUsuario'),
        edad: localStorage.getItem('edadUsuario'),
        pais: localStorage.getItem('paisUsuario')
    };

    // Función para mostrar los datos guardados en el saludo
    function mostrarSaludo(datos) {
        if (datos.nombre && datos.email && datos.edad && datos.pais) {
            const paisNombre = obtenerNombrePais(datos.pais);
            saludo.textContent = `¡Bienvenido de nuevo, ${datos.nombre}! ` +
                `Correo: ${datos.email}, Edad: ${datos.edad}, País: ${paisNombre}.`;
        } else {
            saludo.textContent = 'Por favor, registra tus datos en el formulario.';
        }
    }

    // Función para traducir el código de país a texto completo
    function obtenerNombrePais(codigo) {
        const paises = {
            'mx': 'México',
            'es': 'España',
            'ar': 'Argentina',
            'cl': 'Chile',
            'co': 'Colombia'
        };
        return paises[codigo] || 'Desconocido';
    }

    mostrarSaludo(storedData);

    // Evento envío formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            // Mostrar mensaje error en botón
            submitButton.textContent = 'Completa todos los campos';
            submitButton.style.backgroundColor = '#d90429'; // rojo
            form.reportValidity();

            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.style.backgroundColor = '';
            }, 2000);

            return;
        }

        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const edad = document.getElementById('edad').value.trim();
        const pais = document.getElementById('pais').value;

        // Guardar en Local Storage
        localStorage.setItem('nombreUsuario', nombre);
        localStorage.setItem('emailUsuario', email);
        localStorage.setItem('edadUsuario', edad);
        localStorage.setItem('paisUsuario', pais);

        // Mostrar mensaje éxito en botón
        submitButton.textContent = '¡Datos guardados!';
        submitButton.style.backgroundColor = '#38b000'; // verde

        // Actualizar saludo con los datos nuevos
        mostrarSaludo({ nombre, email, edad, pais });

        // Limpiar formulario y volver botón a estado original
        setTimeout(() => {
            form.reset();
            submitButton.textContent = originalButtonText;
            submitButton.style.backgroundColor = '';
        }, 2000);
    });
});
