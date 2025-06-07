const Product = require('../models/productModel.js');
const bcrypt = require('bcrypt');

class ProductsController {
    postProduct = async (body) => {
        let newProduct = body;     
        return new Promise(async (resolve, reject) => {
            const nuevoProducto = new Product(newProduct);
            await nuevoProducto.save()
            resolve({status: 200, message: 'Producto creado correctamente', product: nuevoProducto});
        })
    }

    getProducts = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await Product.find();
                resolve({ status: 200, message: 'Productos obtenidos correctamente', products });
            } catch (error) {
                console.error("Error en getProducts:", error);
                reject({ status: 500, error: 'Error al obtener los productos' });
            }
        });
    };

    deleteProduct = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedProduct = await Product.findByIdAndDelete(id);
                if (!deletedProduct) {
                    return resolve({ status: 404, message: 'Producto no encontrado' });
                }
                resolve({ status: 200, message: 'Producto eliminado correctamente', product: deletedProduct });
            } catch (error) {
                console.error("Error en deleteProduct:", error);
                reject({ status: 500, error: 'Error al eliminar el producto' });
            }
        });
    }

    getProductById = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findById(id);
                if (!product) {
                    return resolve({ status: 404, message: 'Producto no encontrado' });
                }
                resolve({ status: 200, message: 'Producto obtenido correctamente', product });
            } catch (error) {
                console.error("Error en getProductById:", error);
                reject({ status: 500, error: 'Error al obtener el producto' });
            }
        });
    }

    updateProduct = async (id, body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });    
                resolve({ status: 200, message: 'Producto actualizado correctamente', product: updatedProduct });
            } catch (error) {
                console.error("Error en updateProduct:", error);
                reject({ status: 500, error: 'Error al actualizar el producto' });
            }
        });
    }
}
module.exports = ProductsController;