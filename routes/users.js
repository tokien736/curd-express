import express from 'express'; // Importar el módulo 'express' para la creación de un enrutador
import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users.js'; // Importar las funciones controladoras de operaciones CRUD desde otro archivo

const router = express.Router(); // Crear un nuevo enrutador de Express

router.get('/', getUsers); // Definir la ruta y el controlador para obtener todos los usuarios

router.post('/', createUser); // Definir la ruta y el controlador para crear un nuevo usuario

router.get('/:id', getUser); // Definir la ruta y el controlador para obtener un usuario por su ID

router.delete('/:id', deleteUser); // Definir la ruta y el controlador para eliminar un usuario por su ID

router.patch('/:id', updateUser); // Definir la ruta y el controlador para actualizar un usuario por su ID

export default router; // Exportar el enrutador para su uso en otras partes de la aplicación
