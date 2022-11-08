"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const database_1 = require("../database");
const jwt = require('jsonwebtoken');
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = req.body;
            const [users,] = yield database_1.promisePool.query('SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username != ?', [data.username]);
            return res.json(users);
        });
    }
    buscador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { config } = req.body;
            let users = [];
            yield database_1.promisePool.query('CALL getUsers(?)', [req.body.data.id]).then(([data,]) => {
                users = data[0];
                users.map((item) => {
                    item.afinidad = 0;
                    for (const [key, value] of Object.entries(config)) {
                        if (value == 2)
                            item.afinidad += 1;
                        else if (value == item[key])
                            item.afinidad += 2;
                    }
                });
                res.json(users.sort((a, b) => b.afinidad - a.afinidad));
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    getPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = req.body;
            const [user,] = yield database_1.promisePool.query('SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username = ?', [data.username]);
            if (user.length > 0) {
                const [fotos,] = yield database_1.promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [user[0].id]);
                const [hobbies,] = yield database_1.promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ? ORDER BY h.categoria_id DESC', [user[0].id]);
                return res.json(Object.assign(Object.assign(Object.assign({}, user[0]), { 'fotos': fotos }), { 'hobbies': hobbies }));
            }
            return res.status(404).json({ message: "Este usuario no existe" });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [user,] = yield database_1.promisePool.query('SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
            if (user.length > 0) {
                const [fotos,] = yield database_1.promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [user[0].id]);
                const [hobbies,] = yield database_1.promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ? ORDER BY h.categoria_id DESC', [user[0].id]);
                return res.status(200).json(Object.assign(Object.assign(Object.assign({}, user[0]), { 'fotos': fotos }), { 'hobbies': hobbies }));
            }
            return res.status(404).json({ message: "Este usuario no existe" });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            yield database_1.promisePool.query('SELECT id, username, role_id FROM user where username = ? AND password = ?', [username, password]).then(([data,]) => {
                if (data.length === 0)
                    res.status(400).json({ message: "Datos de usuario incorrectos" });
                else {
                    const token = jwt.sign(JSON.stringify(data[0]), 'stil');
                    res.json({ token });
                }
            }, err => {
                console.log(err.sqlMessage);
            });
            return res;
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error;
            yield database_1.promisePool.query('INSERT INTO user set ?', [req.body]).then(() => {
                res.status(200).json({ message: 'Usuario creado con exito' });
            }).catch(err => {
                if (err.sqlMessage.includes('user_email_IDX'))
                    return error = "Este email ya se encuentra registrado";
                if (err.sqlMessage.includes('user_username_IDX'))
                    return error = "Este nombre de usuario ya esta en uso";
                error = err.sqlMessage;
            });
            if (error)
                res.status(400).json({ message: error });
            return res;
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error;
            yield database_1.promisePool.query('UPDATE user SET ? WHERE id = ?', [req.body.user, req.body.data.id]).then(() => {
                res.status(200).json({ message: 'Updated user ' + req.body.data.id });
            }).catch(err => {
                if (err.sqlMessage.includes('user_username_IDX'))
                    error = "Este nombre de usuario ya esta en uso";
                else if (err.sqlMessage.includes('user_email_IDX'))
                    error = "Este email ya se encuentra registrado";
                error = err.sqlMessage;
                res.status(400).json({ message: error });
            });
            return res;
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM user where id = ?', [id]).then(() => {
                res.json({ message: 'Usuario eliminado con exito!' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    // Hobbies -------------------------------------------------------------------------------
    getHobbies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT * FROM categorias_hobbies').then(([rows,]) => __awaiter(this, void 0, void 0, function* () {
                const data = yield Promise.all(rows.map((item) => __awaiter(this, void 0, void 0, function* () {
                    const [rows,] = yield database_1.promisePool.query('SELECT id, hobbie FROM hobbies WHERE categoria_id = ?', [item.id]);
                    item.hobbies = rows;
                    return item;
                })));
                res.json(data);
            }), err => {
                res.status(400).json({ message: err });
            });
            return res;
        });
    }
    getMyHobbies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT hu.id, h.hobbie, ch.categoria FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id JOIN categorias_hobbies ch ON ch.id = h.categoria_id WHERE hu.user_id = ? ORDER BY ch.categoria', [req.body.data.id]).then(([rows,]) => {
                res.json(rows);
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    createHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO hobbies SET hobbie = ?, categoria_id = ?', [req.body.hobbie.toLowerCase(), req.body.categoria_id]).then(() => {
                res.json({ message: 'Hobbie creado con exito!' });
            }).catch(err => {
                if (err.sqlMessage.includes('hobbie'))
                    res.status(400).json({ message: 'Este hobbie ya existe' });
                else
                    res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    addHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO hobbies_user SET hobbie_id = ?, user_id = ?', [req.body.hobbie_id, req.body.data.id]).then(() => {
                res.status(200).json({ message: 'Added hobbie to user ' + req.body.data.id });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    removeHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM hobbies_user WHERE id = ?', [id]).then(() => {
                res.status(200).json({ message: 'Hobbie removido con exito!' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    deleteHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM hobbies where id = ?', [id]).then(() => {
                res.status(200).json({ message: 'Hobbie eliminado con exito!' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    // Fotos -----------------------------------------------------------------------------------
    getImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [req.body.data.id]).then(([rows,]) => {
                res.json(rows);
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    updateImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('UPDATE fotos_user SET descripcion = ? WHERE id = ?', [req.body.description, req.params.id]).then(() => {
                res.status(200).json({ message: 'Foto actualizada con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    updateFotoPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            if (file) {
                yield database_1.promisePool.query('UPDATE user SET foto_perfil = ? WHERE id = ?', [file.path, req.body.data.id]).then(() => {
                    res.json({ message: "Foto de perfil actualizada con exito!" });
                }, err => {
                    res.status(400).json({ message: err.sqlMessage });
                });
            }
            else {
                res.status(400).json({ message: 'Errol al subir la imagen' });
            }
            return res;
        });
    }
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('DELETE FROM fotos_user WHERE id = ?', [req.params.id]).then(() => {
                res.status(200).json({ message: 'Foto removida con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            if (file) {
                let data = {
                    link: file.path,
                    descripcion: req.body.descripcion,
                    user_id: req.body.data.id
                };
                yield database_1.promisePool.query('INSERT INTO fotos_user set ?', data).then(() => {
                    res.json({ message: "Imagen subida con exito!" });
                }, err => {
                    res.status(400).json({ message: err.sqlMessage });
                });
            }
            else {
                res.status(400).json({ message: 'Errol al subir la imagen' });
            }
            return res;
        });
    }
    // Favoritos -------------------------------------------------------------------------------
    getFavoritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT u.id, u.username, u.nombre, u.sexo, u.profesion, u.foto_perfil, u.reputacion FROM user u LEFT JOIN favoritos_user fu ON u.id = fu.favorito where user_id = ? && u.estado = 0', [req.body.data.id]).then(([rows,]) => __awaiter(this, void 0, void 0, function* () {
                yield database_1.promisePool.query('SELECT u.id, pc.id AS soli_id, pc.estado FROM peticion_contacto AS pc JOIN user AS u ON u.id = pc.contactado_id WHERE pc.user_id = ?', [req.body.data.id]).then(([data,]) => {
                    res.json({ favs: rows, solis: data });
                }, err => {
                    res.status(400).json({ message: err.sqlMessage });
                });
            }), err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    addFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { favorito } = req.body;
            yield database_1.promisePool.query('SELECT * FROM favoritos_user WHERE favorito = ? && user_id = ?', [favorito, req.body.data.id]).then(([rows,]) => __awaiter(this, void 0, void 0, function* () {
                if (rows.length > 0) {
                    res.status(400).json({ message: 'Este usuario ya esta en tus favoritos!' });
                }
                else {
                    yield database_1.promisePool.query('INSERT INTO favoritos_user SET favorito = ?, user_id = ?', [favorito, req.body.data.id]).then(() => {
                        res.status(200).json({ message: 'Operacion realizada con exito' });
                    }).catch(err => {
                        res.status(400).json({ message: err.sqlMessage });
                    });
                }
            }), err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    deleteFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fav } = req.params;
            yield database_1.promisePool.query('DELETE FROM favoritos_user WHERE favorito = ? && user_id = ?', [fav, req.body.data.id]).then(() => {
                res.status(200).json({ message: 'Favorito removido con exito!' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    isFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('SELECT id FROM favoritos_user WHERE favorito = ? && user_id = ?', [id, req.body.data.id]).then(([rows,]) => {
                if (rows.length > 0)
                    res.json({ result: true });
                else
                    res.json({ result: false });
            }, err => {
                console.log(err);
                res.status(400).json({ message: 'Ha ocurrido un error' });
            });
            return res;
        });
    }
    // Solicitudes -------------------------------------------------------------------------------
    getSolicitudes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT pc.*, u.username, u.nombre, u.foto_perfil FROM peticion_contacto AS pc JOIN user AS u ON u.id = pc.user_id WHERE pc.contactado_id = ? && pc.estado != 2', [req.body.data.id]).then(([rows,]) => __awaiter(this, void 0, void 0, function* () {
                yield database_1.promisePool.query('SELECT pc.*, u.username, u.nombre, u.foto_perfil FROM peticion_contacto AS pc JOIN user AS u ON u.id = pc.contactado_id WHERE pc.user_id = ?', [req.body.data.id]).then(([data,]) => {
                    res.json({ solis: rows, mysolis: data });
                });
            }), err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    getCantPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT count(id) AS cantidad FROM peticion_contacto WHERE contactado_id = ? && estado = 0', [req.body.data.id]).then(([data,]) => {
                res.json(data[0].cantidad);
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    createSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                contactado_id: req.body.id,
                user_id: req.body.data.id
            };
            yield database_1.promisePool.query('INSERT INTO peticion_contacto SET ?', [data]).then(() => {
                res.json({ message: 'Solicitud generada con exito' });
            }, err => {
                res.status(200).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    updateSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('UPDATE peticion_contacto SET estado = ? WHERE id = ?', [req.body.estado, req.params.id]).then(() => {
                res.json({ message: 'Solicitud aceptado con exito!' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    deleteSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('DELETE FROM peticion_contacto WHERE id = ?', [req.params.id]).then(() => {
                res.status(200).json({ message: 'Solicitud removida con exito!' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    deleteSolicitudByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('DELETE FROM peticion_contacto WHERE contactado_id = ? && user_id = ?', [req.params.id, req.body.data.id]).then(() => {
                res.status(200).json({ message: 'Solicitud removida con exito!' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    comparePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT password FROM user WHERE username = ?', [req.body.data.username]).then((data) => {
                if (data[0][0].password === req.body.password) {
                    res.json({ message: 'Felicidades! Las contraseñas coinciden' });
                }
                else {
                    res.status(400).json({ message: 'Las contraseñas no coinciden' });
                }
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    // Info contacto -------------------------------------------------------------------------------
    getFormasContacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT * FROM formas_contacto').then(([data,]) => {
                res.json(data);
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    getInfoContacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('CALL getInfoContacto(?)', [req.params.id]).then(([data,]) => {
                res.json(data[0]);
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    getMyInfoContacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('CALL getInfoContacto(?)', [req.body.data.id]).then(([data,]) => {
                res.json(data[0]);
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    addInfoContacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.forma.user_id = req.body.data.id;
            yield database_1.promisePool.query('INSERT INTO formas_contacto_user SET ?', [req.body.forma]).then(() => {
                res.status(200).json({ message: 'Forma de contacto agregada con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    updateInfoContacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('UPDATE formas_contacto_user SET link = ? WHERE id = ?', [req.body.link, req.params.id]).then(() => {
                res.status(200).json({ message: 'Forma de contacto actualizada con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    deleteInfoContacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('DELETE FROM formas_contacto_user WHERE id = ?', [req.params.id]).then(() => {
                res.status(200).json({ message: 'Forma de contacto removida con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    // Buscador Config -------------------------------------------------------------------------------
    getBuscadorConfig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('SELECT sexo, bebedor, fumador, fiestas, mascotas, hijos FROM preferencias WHERE user_id = ?', [req.body.data.id]).then(([rows,]) => {
                res.json(rows[0]);
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    updateBuscadorConfig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('UPDATE preferencias SET ? WHERE user_id = ?', [req.body.config, req.body.data.id]).then(() => {
                res.status(200).json({ message: 'Configuracion actualizada con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    createBuscadorConfig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.config.user_id = req.body.data.id;
            yield database_1.promisePool.query('INSERT INTO preferencias SET ?', [req.body.config]).then(() => {
                res.status(200).json({ message: 'Configuracion creada con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    deleteBuscadorConfig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('DELETE FROM preferencias WHERE user_id = ?', [req.body.data.id]).then(() => {
                res.status(200).json({ message: 'Configuracion removida con exito' });
            }, err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
}
exports.userController = new UserController();
