const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');

class UsersController {
    getUsers(req, res) {
        return new Promise((resolve, reject) => {
            try {
                const users = User.find();
                if (users.length === 0) {
                    resolve({message: 'No se encontraron usuarios'});
                }
                resolve(users);
            } catch (error) {
                reject(error);
            }
        })
    }

    postUser = async (body) => {
        let newUser = body;
    
        return new Promise(async (resolve, reject) => {
            try {
                // Obtener todos los usuarios (esperar a que se resuelva la promesa)
                const allUsers = await User.find(); // Esto devolverá un array (puede estar vacío)
    
                // Validar que todos los campos estén completos
                if (!newUser.name || !newUser.lastName || !newUser.userName || !newUser.email || !newUser.password || !newUser.repassword) {
                    reject({ status: 400, error: 'Todos los campos son obligatorios' });
                    return;
                }
    
                // Validar que el email sea único
                const emailExists = allUsers.some(user => user.email === newUser.email);
                if (emailExists) {
                    reject({ status: 400, error: 'El email ya existe' });
                    return;
                }

                //validar que no repita el username
                const usernameExists = allUsers.some(user => user.userName === newUser.userName);
                if (usernameExists) {
                    reject({ status: 400, error: 'El username ya existe' });
                    return;
                }
                
                //se valida ahora desde el frontend para mejor UX
                // Validar que las contraseñas coincidan
                /*if (newUser.password !== newUser.repassword) {
                    reject({ status: 400, error: 'Las contraseñas no coinciden' });
                    return;
                }*/

                // Encriptar la contraseña
                newUser.password = bcrypt.hashSync(newUser.password, 10);
                delete newUser.repassword;
                // Guardar el usuario
                const user = new User(newUser); // Crear una instancia del modelo
                await user.save(); // Guardar en la base de datos
                const token = generateToken(user);
    
                resolve({ status: 201, message: 'Usuario creado correctamente', token });
            } catch (error) {
                console.error("Error en postUser:", error);
                reject({ status: 500, error: 'Error al crear el usuario', error });
            }
        });
    };

    deleteUser = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ id: id });
                if (!user) {
                    resolve({ status: 404, message: 'Usuario no encontrado' });
                }
                await User.deleteOne({ id: id });
                resolve({ status: 200, message: 'Usuario eliminado correctamente'});
            } catch (error) {
                console.error("Error en deleteUser:", error);
                reject({ status: 500, error: 'Error al eliminar el usuario' });
            }
        });
    };

    getUserById = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ id: id });
                resolve({ status: 200, message: 'Usuario encontrado correctamente', user });
            } catch (error) {
                console.error("Error en getUserById:", error);
                reject({ status: 500, error: 'Error al obtener el usuario' });
            }
        });
    };

    updateUser = async (id, body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ id: id });
                if (!user) {
                    resolve({ status: 404, message: 'Usuario no encontrado' });
                }
                await User.updateOne({ id: id }, body);
                resolve({ status: 200, message: 'Usuario actualizado correctamente', user });
            } catch (error) {
                console.error("Error en updateUser:", error);
                reject({ status: 500, error: 'Error al actualizar el usuario' });
            }
        });
    };



    loginUser = async (username, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne()
                .or([{ userName: username }, { email: username }]);
                if (!user) {
                    resolve({ status: 404, message: 'Usuario no encontrado' });
                }
                console.log("usuario encontrado", user)
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    resolve({ status: 401, message: 'Contraseña incorrecta' });
                }
                const token = generateToken(user);
                resolve({ status: 200, message: 'Login exitoso', user, token });
            } catch (error) {
                console.error("Error en loginUser:", error);
                reject({ status: 500, error: 'Error al iniciar sesión' });
            }
        });
    };
}

module.exports = UsersController;