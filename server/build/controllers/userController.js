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
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const [rows, fields] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos from user');
            const [rows,] = yield database_1.promisePool.query('SELECT * from user');
            return res.json(rows);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [rows,] = yield database_1.promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
            if (rows.length > 0) {
                const [fotos,] = yield database_1.promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [rows[0].id]);
                const [hobbies,] = yield database_1.promisePool.query('SELECT hu.id, h.hobbie FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [rows[0].id]);
                return res.status(200).json(Object.assign(Object.assign(Object.assign({}, rows[0]), { 'fotos': fotos }), { 'hobbies': hobbies }));
            }
            res.status(404).json({ text: "Este usuario no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO user set ?', [req.body]).catch(err => {
                res.json({ text: err.sqlMessage });
            });
            res.status(200).json({ message: 'User created' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('UPDATE user SET ? WHERE username = ?', [req.body, id]);
            res.json({ text: 'Updated user ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM user where id = ?', [id]).catch(err => {
                res.json({ text: err });
            });
            res.json({ text: 'Erasing user ' + req.params.id });
        });
    }
    //Hobbies
    createHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO hobbies set = ?', [req.body]);
            res.json({ text: 'Creating hobbie ' + req.params.id });
        });
    }
    addHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO hobbies_user set = ?', [req.body]);
            res.json({ text: 'Adding hobbie to user ' + req.params.user_id });
        });
    }
    removeHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM hobbies_user where id = ?', [id]);
            res.json({ text: 'Erasing user ' + req.params.id });
        });
    }
    deleteHobbie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM hobbies where id = ?', [id]);
            res.json({ text: 'Erasing user ' + req.params.id });
        });
    }
    //Favoritos
    getFavoritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [rows,] = yield database_1.promisePool.query('SELECT * FROM favoritos_user where user_id = ?', [id]);
            return res.json(rows);
        });
    }
    addFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO favoritos_user set ?', [req.body]);
            res.json({ text: 'Erasing user ' + req.params.id });
        });
    }
    deleteFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fav } = req.params;
            yield database_1.promisePool.query('DELETE FROM favoritos_user where id = ?', [fav]);
            res.json({ text: 'Erasing favorito ' + req.params.fav });
        });
    }
}
exports.userController = new UserController();
