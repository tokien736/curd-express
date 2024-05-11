import express from "express"; // Importar el módulo 'express' para la creación del servidor
import bodyParser from "body-parser"; // Importar el módulo 'body-parser' para analizar el cuerpo de las solicitudes HTTP
import { fileURLToPath } from 'url'; // Importar la función 'fileURLToPath' para convertir una URL a una ruta de archivo
import path from "path"; // Importar el módulo 'path' para trabajar con rutas de archivos

import usersRoutes from "./routes/users.js"; // Importar las rutas relacionadas con los usuarios desde otro archivo

// Obtener la ruta y el directorio actual del archivo en ejecución
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Crear una instancia de Express
const PORT = 5000; // Definir el puerto en el que se ejecutará el servidor

app.use(bodyParser.json()); // Utilizar el middleware 'body-parser' para analizar el cuerpo de las solicitudes como JSON

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Asociar las rutas relacionadas con los usuarios al prefijo '/users'
app.use("/users", usersRoutes);

// Ruta de inicio que devuelve un mensaje de bienvenida
app.get("/", (req, res) => res.send("Welcome to the Users API!"));

// Manejador de ruta para cualquier otra ruta no definida, devuelve un mensaje de ruta no encontrada
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
