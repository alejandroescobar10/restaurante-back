const fs = require('fs/promises');
const path = require('path');
//const fs2 = require('fs')
const User = require('../db/user.js');// exportado del modelo de user

const Mesero = require('../db/user.js');
const getAllUsuarios = async (req, res) => {
    try {
        const users = await User.find()
        if (!users || users.length === 0){
            res.status(404).json({message:"usuarios no encontrados"});    
        }
        res.json(users);
    } catch (error) {
        console.log('Error al obtener los usuarios',error);
        res.status(500).json({message:'Error al obtener los usuarios'})
    }
}

const getOneUser = async (req, res) => {
    //const User = require('../db/user.js');
    try {
        const idUser = req.params.id;
        const user = await User.findById(idUser);
        if(!user || user ===0){
            res.status(404).json({message:"Usuario no encontrado"})
        }
        res.json(user)
        
    } catch (error) {
        Console.log('Error al encontrar usuario',error)
        res.status(500).json({message:'error al encontrar usuario'})
    }
    
}

const updateUser = async (req, res) => {
    //const User = require('../db/user.js');
    try {
        const idUser = req.params.id;
        const { username, password, role } = req.body;
        
        // Buscar el usuario por su ID
        const user = await User.findById(idUser);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos del usuario si se proporcionan en la solicitud
        if (username) user.username = username;
        if (password) user.password = password;
        if (role) user.role = role;

        // Guardar los cambios
        await user.save();
        res.json({ message: "Usuario actualizado exitosamente" });
        
    } catch (error) {
        // Manejar errores
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};
        
    

const login = async (req, res) => {
    //const User = require('../db/user.js')
    try {
        // Obtén el nombre de usuario y contraseña del cuerpo de la solicitud
        const { username, password } = req.body;
        //Verifico que el usuario ingresado este en la base de datos
        const user = await User.findOne({ username, password });
        // Si se encuentra un usuario con las credenciales proporcionadas, responde con los datos del usuario
        if (User) {
            res.status(201).json({ usuario: user });
        } else {
            // Si no se encuentra un usuario con las credenciales proporcionadas, responde con un mensaje de error
            res.status(401).json({ message: 'credenciales invalidas' });
        }

    } catch (error) {
        console.login('Error al realizar el login', error);
        res.status(501).json({ message: "Error al realizar el login" });
    }
}
const agregarUsuario = async (req, res) => {
    //const User = require('../db/user.js');
    try {
        // Obtener los datos del nuevo usuario del cuerpo de la solicitud
        const { username, password, role } = req.body;

        // Crear un nuevo usuario utilizando el modelo de Mongoose
        const nuevoUsuario = new User({ username, password, role });

        // Guardar el nuevo usuario en la base de datos
        await nuevoUsuario.save();

        // Responder con un mensaje de éxito
        res.status(201).json({ mensaje: 'Usuario agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        // Responder con un mensaje de error
        res.status(500).json({ mensaje: 'Error al agregar usuario' });
    }
};
const listarMesero = async (req, res) => {
    try {
        console.log("Buscando meseros...");
        const meseros = await Mesero.find({ role: 'mesero' });
        console.log("Meseros encontrados:", meseros); // Añadir esto
        if (meseros.length === 0) {
            console.log("No se encontraron meseros.");
        }
        res.status(200).json({ meseros });
    } catch (error) {
        console.error('Error al obtener meseros:', error);
        res.status(500).json({ message: 'Error al obtener meseros' });
    }
};
module.exports = {
    getAllUsuarios,
    getOneUser,
    updateUser,
    login,
    agregarUsuario,
    listarMesero
};