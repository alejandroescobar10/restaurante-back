const fs = require('fs/promises');
const path = require('path');
const pedidos = require('../db/pedidos.js');


const updatePedido = async (req, res) => {
    const Pedido = require('../db/pedidos.js')
    try {
        const pedidoId = req.params.id;
        const {estado,mesa,mesero,pedido} = req.body;
        // Buscar el pedido por su ID en la base de datos
        const pedidos = await Pedido.findById(pedidoId);

        if(!pedidos){
            res.status(404).json({message:"Pedido no encontrado"})
        } 
        if(estado) pedidos.estado =estado;
        if(mesa) pedidos.mesa=mesa;        
        if(mesero) pedidos.mesero=mesero;
        if(pedido) pedidos.pedido=pedido;
        await pedidos.save();
        res.status(200).json({message:'pedido actualizado'})
    } catch (error) {
        console.log('error al actualizar pedido',error);
        res.status(500).json({message:'error al actualizar el pedido'})
    }
}
const guardarPedido = async (req, res) => {
    const Pedido = require('../db/pedidos.js');
    try {
        // Obtener los datos del nuevo pedido del cuerpo de la solicitud
        const {estado,mesa,mesero,pedido} = req.body;

        // Crear un nuevo producto utilizando el modelo de Mongoose
        const nuevoPedido = new Pedido({estado,mesa,mesero,pedido});

        //Guardar los neuvos pedidos en la base de datos
        await nuevoPedido.save();

        //Responder con un mensaje de éxito
        res.status(201).json({mensaje:'Pedido realizado'})
    }catch (error){
        console.log('error al realizar pedido', error)

        //Responder con un mensaje de error
        res.status(501).json({mensaje:'error al realizar el pedido'})

    }
}            

const listarPedidos = async (req, res) => {
    const Pedido = require('../db/pedidos.js'); // Asegúrate de importar el modelo de Pedido que has definido en tu aplicación
    try {
        // Consulta todos los pedidos en la base de datos
        const pedidos = await Pedido.find();

        // Responde con la lista de pedidos
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al listar los pedidos:', error);
        res.status(500).json({ mensaje: 'Error al listar los pedidos' });
    }
};


const cambiarEstadoPedido = async (req, res) => {
    const Pedido = require('../db/pedidos.js')
    try {
        const pedidoId = req.params.id;
        // Buscar el pedido por su ID en la base de datos
        const pedido = await Pedido.findById(pedidoId);
        
        if (!pedido){
            res.status(404).json({message:"Pedido no encontrado"});
        }
        // Actualizar el estado del pedido a "listo"
        pedido.estado="listo";

        // Guardar los cambios en la base de datos
        await pedido.save();
        
        // Devolver una respuesta exitosa
        res.json({ message: "Estado del pedido actualizado correctamente" });
    } catch (error) {
        console.error('Error al cambiar el estado del pedido:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
        
    }
    {/*try {
        const { id } = req.params; // Obtener el ID del pedido de los parámetros de la URL
        const { estado } = req.body; // Obtener el nuevo estado del cuerpo de la solicitud

        // Leer el contenido del archivo JSON de pedidos
        const pedidosJson = await fs.readFile(path.join(__dirname, '../db/pedidos.json'));
        const pedidos = JSON.parse(pedidosJson);

        // Buscar el pedido por su ID en la lista de pedidos
        const pedidoIndex = pedidos.findIndex(pedido => pedido.id === id);

        if (pedidoIndex === -1) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        // Actualizar el estado del pedido
        pedidos[pedidoIndex].estado = estado;

        // Escribir los cambios de vuelta al archivo JSON
        await fs.writeFile(path.join(__dirname, '../db/pedidos.json'), JSON.stringify(pedidos, null, 2));

        // Responder con la lista actualizada de pedidos
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al cambiar el estado del pedido:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};*/}
}
module.exports = {
    updatePedido,
    guardarPedido,
    listarPedidos,
    cambiarEstadoPedido
}
//listar pedidos
//actualizar pedido