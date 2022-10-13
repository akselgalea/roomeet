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
            const [users,] = yield database_1.promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username != ?', [data.username]);
            return res.json(users);
        });
    }
    getPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = req.body;
            const [user,] = yield database_1.promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [data.username]);
            if (user.length > 0) {
                const [fotos,] = yield database_1.promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [user[0].id]);
                const [hobbies,] = yield database_1.promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [user[0].id]);
                return res.json(Object.assign(Object.assign(Object.assign({}, user[0]), { 'fotos': fotos }), { 'hobbies': hobbies }));
            }
            return res.status(404).json({ text: "Este usuario no existe" });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [user,] = yield database_1.promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
            if (user.length > 0) {
                const [fotos,] = yield database_1.promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [user[0].id]);
                const [hobbies,] = yield database_1.promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [user[0].id]);
                return res.status(200).json(Object.assign(Object.assign(Object.assign({}, user[0]), { 'fotos': fotos }), { 'hobbies': hobbies }));
            }
            return res.status(404).json({ text: "Este usuario no existe" });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const [rows,] = yield database_1.promisePool.query('SELECT username, role_id FROM user where username = ? AND password = ?', [username, password]);
            if (rows.length > 0) {
                const token = jwt.sign(JSON.stringify(rows[0]), 'stil');
                return res.status(200).json({ token });
            }
            return res.status(400).json({ message: "Datos de usuario incorrectos" });
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
            const { id } = req.params;
            yield database_1.promisePool.query('UPDATE user SET ? WHERE username = ?', [req.body, id]).then(() => {
                res.status(200).json({ message: 'Updated user ' + id });
            }).catch(err => {
                if (err.sqlMessage.includes('user_email_IDX'))
                    return error = "Este email ya se encuentra registrado";
                if (err.sqlMessage.includes('user_username_IDX'))
                    return error = "Este nombre de usuario ya esta en uso";
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
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userId,] = yield database_1.promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
            const file = req.file;
            if (file) {
                let data = {
                    link: file.path,
                    descripcion: req.body.descripcion,
                    user_id: userId[0].id
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
    //Hobbies
    createHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO hobbies set ?', [req.body]).then(() => {
                res.json({ message: 'Hobbie creado con exito!' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    addHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userId,] = yield database_1.promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
            const { id } = req.body.id;
            yield database_1.promisePool.query('INSERT INTO hobbies_user set hobbies_id = ?, user_id = ?', [id, userId[0].id]).then(() => {
                res.status(200).json({ message: 'Adding hobbie to user ' + userId });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    removeHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM hobbies_user where id = ?', [id]).then(() => {
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
    //Favoritos -- DONE
    getFavoritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userId,] = yield database_1.promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
            yield database_1.promisePool.query('SELECT u.id, u.username, u.nombre, u.sexo, u.profesion, u.foto_perfil, u.reputacion FROM user u LEFT JOIN favoritos_user fu ON u.id = fu.favorito where user_id = ? && u.estado = 0', [userId[0].id]).then(result => {
                res.status(200).json(result[0]);
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    addFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userId,] = yield database_1.promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
            const { favorito } = req.body;
            yield database_1.promisePool.query('INSERT INTO favoritos_user SET favorito = ?, user_id = ?', [favorito, userId[0].id]).then(() => {
                res.status(200).json({ message: 'Operacion realizada con exito' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
    deleteFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userId,] = yield database_1.promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
            const { fav } = req.params;
            yield database_1.promisePool.query('DELETE FROM favoritos_user WHERE favorito = ? && user_id = ?', [fav, userId[0].id]).then(() => {
                res.status(200).json({ message: 'Favorito removido con exito!' });
            }).catch(err => {
                res.status(400).json({ message: err.sqlMessage });
            });
            return res;
        });
    }
}
exports.userController = new UserController();
