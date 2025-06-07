const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    stock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);