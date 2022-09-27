"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Directly to the user
        this.router.get('/', userController_1.userController.list);
        this.router.get('/:id', userController_1.userController.getUser);
        this.router.post('/register', userController_1.userController.create);
        this.router.put('/:id', userController_1.userController.update);
        this.router.delete('/:id', userController_1.userController.delete);
        //User hobbies
        this.router.post('/hobbies', userController_1.userController.createHobbie);
        this.router.post('/:user/hobbies/add', userController_1.userController.addHobbie);
        this.router.delete('/:user/hobbies/:id', userController_1.userController.removeHobbie);
        this.router.delete('/hobbies/:id', userController_1.userController.deleteHobbie);
        //User favoritos
        this.router.get('/:id/favoritos', userController_1.userController.getFavoritos);
        this.router.post('/:id/favoritos', userController_1.userController.addFavorito);
        this.router.delete('/:id/favoritos/:fav', userController_1.userController.deleteFavorito);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
