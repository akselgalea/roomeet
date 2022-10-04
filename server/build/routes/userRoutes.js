"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const jwt = require('jsonwebtoken');
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Directly to the user
        this.router.get('/', verifyToken, userController_1.userController.list);
        this.router.get('/perfil', verifyToken, userController_1.userController.getPerfil);
        this.router.get('/perfil/:id', verifyToken, userController_1.userController.getUser);
        this.router.post('/login', userController_1.userController.login);
        this.router.post('/register', userController_1.userController.create);
        this.router.put('/:id', verifyToken, userController_1.userController.update);
        this.router.delete('/:id', verifyToken, userController_1.userController.delete);
        //User hobbies
        this.router.post('/hobbies', verifyToken, userController_1.userController.createHobbie);
        this.router.post('/:user/hobbies/add', verifyToken, userController_1.userController.addHobbie);
        this.router.delete('/:user/hobbies/:id', verifyToken, userController_1.userController.removeHobbie);
        this.router.delete('/hobbies/:id', verifyToken, userController_1.userController.deleteHobbie);
        //User favoritos
        this.router.get('/:id/favoritos', verifyToken, userController_1.userController.getFavoritos);
        this.router.post('/:id/favoritos', verifyToken, userController_1.userController.addFavorito);
        this.router.delete('/:id/favoritos/:fav', verifyToken, userController_1.userController.deleteFavorito);
    }
}
const userRoutes = new UserRoutes();
function verifyToken(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({ message: 'Usuario no autorizado' });
    const token = req.headers.authorization.substring(7);
    if (token !== '') {
        const content = jwt.verify(token, 'stil');
        req.body.data = content;
        next();
    }
    else
        res.status(401).json({ message: 'token vacio' });
}
exports.default = userRoutes.router;
