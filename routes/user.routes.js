const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router
    .post('/login', userController.login)
    .get('/:id', userController.getAllUsuarios)
    .get('/getOneUser', userController.getOneUser)
    .put('/:id', userController.updateUser)
    .post('/agregarUsuario', userController.agregarUsuario)
    .get('/listarMesero', userController.listarMesero )
    

module.exports = router;