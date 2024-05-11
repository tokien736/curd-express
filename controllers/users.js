import { v4 as uuid } from 'uuid'; // Importación de la función 'uuid' de la biblioteca 'uuid'

let users = []; // Variable para almacenar la lista de usuarios

// Función para obtener todos los usuarios
export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`); // Imprimir la lista de usuarios en la consola del servidor
    res.send(users); // Enviar la lista de usuarios como respuesta
}

// Función para crear un nuevo usuario
export const createUser = (req, res) => {   
    const user = req.body; // Obtener los datos del usuario de la solicitud

    // Generar un identificador único para el usuario y agregarlo a la lista de usuarios
    users.push({...user, id: uuid()});
    
    // Enviar la lista actualizada de usuarios como respuesta JSON
    res.json(users);
    
    // Imprimir un mensaje en la consola del servidor indicando que se ha añadido un usuario
    console.log(`User [${user.username}] added to the database.`);
};

// Función para obtener un usuario por su ID
export const getUser = (req, res) => {
    res.send(req.params.id) // Enviar el ID del usuario solicitado como respuesta
    res.json(users); // Enviar la lista completa de usuarios como respuesta JSON
};

// Función para eliminar un usuario por su ID
export const deleteUser = (req, res) => { 
    console.log(`user with id ${req.params.id} has been deleted`); // Imprimir un mensaje indicando que se ha eliminado un usuario
    
    // Filtrar la lista de usuarios para eliminar el usuario con el ID proporcionado
    users = users.filter((user) => user.id !== req.params.id);
};

// Función para actualizar la información de un usuario
export const updateUser =  (req,res) => {
    // Encontrar al usuario por su ID
    const user = users.find((user) => user.id === req.params.id);
    
    // Actualizar el nombre de usuario y la edad con los valores proporcionados en la solicitud
    user.username = req.body.username;
    user.age = req.body.age;

    // Imprimir un mensaje indicando que se han actualizado los datos del usuario
    console.log(`username has been updated to ${req.body.username}. age has been updated to ${req.body.age}`);
};
