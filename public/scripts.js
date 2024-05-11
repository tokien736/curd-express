// Función para cargar la lista de usuarios desde el servidor
function loadUsers() {
    fetch('/users') // Realizar una solicitud GET a la ruta '/users' en el servidor
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(users => { // Procesar la lista de usuarios obtenida
            const userList = document.getElementById('user-list'); // Obtener la lista de usuarios del DOM
            userList.innerHTML = ''; // Limpiar la lista existente
            users.forEach(user => { // Iterar sobre cada usuario en la lista
                const li = document.createElement('li'); // Crear un nuevo elemento de lista
                li.textContent = `${user.firstName} ${user.lastName}, ${user.age}`; // Mostrar el nombre, apellido y edad del usuario en el elemento de lista
                
                // Agregar un evento para mostrar los detalles del usuario en un modal al hacer clic en el elemento de la lista
                li.addEventListener('click', () => {
                    displayUserModal(user); // Llamar a la función para mostrar el modal con los detalles del usuario
                });

                userList.appendChild(li); // Agregar el elemento de lista a la lista de usuarios
            });
        })
        .catch(error => console.error('Error al obtener usuarios:', error)); // Manejar cualquier error que ocurra durante la solicitud
}

// Función para agregar un nuevo usuario enviando una solicitud POST al servidor
function addUser(firstName, lastName, age) {
    fetch('/users', { // Realizar una solicitud POST a la ruta '/users' en el servidor
        method: 'POST', // Especificar el método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especificar el tipo de contenido como JSON en el encabezado de la solicitud
        },
        body: JSON.stringify({ firstName, lastName, age }) // Convertir los datos del usuario a JSON y enviarlos en el cuerpo de la solicitud
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        console.log('Usuario agregado:', data); // Mostrar en la consola la respuesta del servidor
        loadUsers(); // Actualizar la lista de usuarios después de agregar uno nuevo
    })
    .catch(error => console.error('Error al agregar usuario:', error)); // Manejar cualquier error que ocurra durante la solicitud
}

// Función para eliminar un usuario enviando una solicitud DELETE al servidor
function deleteUser(userId) {
    fetch(`/users/${userId}`, { // Realizar una solicitud DELETE a la ruta '/users/:id' en el servidor
        method: 'DELETE' // Especificar el método de la solicitud
    })
    .then(response => {
        if (response.ok) { // Verificar si la respuesta es exitosa
            console.log(`Usuario con ID ${userId} eliminado.`); // Mostrar en la consola que el usuario ha sido eliminado
            loadUsers(); // Actualizar la lista de usuarios después de eliminar uno
        } else {
            console.error(`Error al eliminar usuario con ID ${userId}.`); // Mostrar en la consola si ocurre algún error
        }
    })
    .catch(error => console.error('Error al eliminar usuario:', error)); // Manejar cualquier error que ocurra durante la solicitud
}

// Función para mostrar un modal con los detalles de un usuario y permitir su actualización o eliminación
function displayUserModal(user) {
    const modal = document.getElementById('user-modal'); // Obtener el modal del DOM
    const modalUsername = document.getElementById('update-username'); // Obtener el campo de nombre de usuario del modal
    const modalLastName = document.getElementById('update-lastName'); // Obtener el campo de apellido del modal
    const modalAge = document.getElementById('update-age'); // Obtener el campo de edad del modal
    const userIdInput = document.getElementById('update-user-id'); // Obtener el campo oculto de ID de usuario del modal
    const deleteButton = document.getElementById('delete-user-button'); // Obtener el botón de eliminación del modal

    // Establecer los valores del usuario en los campos del modal
    modalUsername.value = user.firstName; // Establecer el nombre del usuario
    modalLastName.value = user.lastName; // Establecer el apellido del usuario
    modalAge.value = user.age; // Establecer la edad del usuario
    userIdInput.value = user.id; // Establecer el ID del usuario en el campo oculto

    // Agregar un controlador de eventos para eliminar al usuario cuando se hace clic en el botón de eliminación
    deleteButton.onclick = function() {
        modal.style.display = 'none'; // Ocultar el modal
        deleteUser(user.id); // Llamar a la función para eliminar al usuario
    };

    modal.style.display = 'block'; // Mostrar el modal

    // Agregar un controlador de eventos para cerrar el modal cuando se hace clic en la 'X'
    const closeModal = document.getElementsByClassName('close')[0];
    closeModal.onclick = function() {
        modal.style.display = 'none'; // Ocultar el modal
    };

    // Agregar un controlador de eventos para cerrar el modal cuando se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none'; // Ocultar el modal
        }
    };
}
