//const fs = require('fs/promises');
const fs = require('fs')
const path = require('path');

const producto= async (req, res)=>{
    
    const { id } = req.params;
    let productos = await fs.readFile(path.join(__dirname,'../db/productos.json'));
    let productosJson = JSON.parse(productos)
    const producto = productosJson.find(product => product.id == id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
}

const listarProductos = async (req,res) =>{
    const Producto = require('../db/productos.js');
    try {
        const producto = await Producto.find();
        res.status(200).json({producto});
    } catch (error) {
        console.error('Error al listar los productos:',error);
        res.status(500).json({ mensaje: 'Error al listar los producto' });
    }
}

const updateProducto = async (req, res)=>{
    const idProducto = req.params.id;
    const {nombre, precio} = req.body;
    const allProductos = await fs.readFile(path.join(__dirname,'../db/productos.json'));
    const objProducto = JSON.parse(allProductos);
   
    const indice = objProducto.findIndex(producto => producto.id == idProducto);

    if (indice !=-1) {
        objProducto[indice] = {
            ...objProducto[indice],
            [nombre] : nombre,
            [precio] : precio
        }
    } else {
        console.log('El ID no fue encontrado en la base de datos.');
    }   
    
    //console.log(objUsers);
    await fs.writeFile(path.join(__dirname,'../db/user.json'), JSON.stringify(objProducto[indice], null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}
const agregarProducto = async (req, res) => {
    const Producto = require('../db/productos.js')
    try {
        // Obtener los datos del nuevo producto del cuerpo de la solicitud
        const { nombre, precio } = req.body;
        
        // Crear un nuevo producto utilizando el modelo de Mongoose
        const nuevoProducto = new Producto({ nombre, precio });

        //Guardar el nuevo producto en la base de datos
        await nuevoProducto.save();

        //Responder con un mensaje de éxito
        res.status(201).json({mensaje: 'Producto agregado'})
    }catch (error){
        console.log('Error al agregar producto',error)
        //Responder con un mensaje de error
        res.status(500).json({mensaje:'Error al agregar producto'})
    }

}   




module.exports = {
    producto,
    listarProductos,
    updateProducto,
    agregarProducto
    
}