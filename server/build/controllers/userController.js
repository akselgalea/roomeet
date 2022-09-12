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
            const [rows, fields] = yield database_1.promisePool.query('SELECT * from user');
            res.json(rows);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [rows, fields] = yield database_1.promisePool.query('SELECT username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos from user where id = ?', [id]);
            if (rows.length > 0) {
                return res.json(rows[0]);
            }
            res.status(404).json({ text: "Este usuario no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.promisePool.query('INSERT INTO user set ?', [req.body]);
            res.json({ message: 'User created' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('UPDATE user SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'Updated user ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.promisePool.query('DELETE FROM user where id = ?', [id]);
            res.json({ text: 'Erasing user ' + req.params.id });
        });
    }
}
exports.userController = new UserController();
