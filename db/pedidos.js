const mongoose= require('mongoose');

const pedidoSchema = new mongoose.Schema({
    estado:{ type: String, required:true, trim:true },
    mesa:{ type: Number, required:true},
    mesero:{ type: String, required:true, trim:true},
    pedido:[{
        producto: {type: String, required: true, trim:true},
        cantidad: { type: Number, required: true},
        precio: {type: Number, required: true} 
    }]
})
module.exports = mongoose.model('Pedido',pedidoSchema)