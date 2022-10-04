import { Router } from 'express';
import { userController } from '../controllers/userController';
import { Request, Response } from "express";

const jwt = require('jsonwebtoken');

class UserRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Directly to the user
        this.router.get('/', verifyToken, userController.list);
        this.router.get('/perfil', verifyToken, userController.getPerfil);
        this.router.get('/perfil/:id', verifyToken, userController.getUser);
        this.router.post('/login', userController.login);
        this.router.post('/register', userController.create);
        this.router.put('/:id', verifyToken, userController.update);
        this.router.delete('/:id', verifyToken, userController.delete);

        //User hobbies
        this.router.post('/hobbies', verifyToken, userController.createHobbie);
        this.router.post('/:user/hobbies/add', verifyToken, userController.addHobbie);
        this.router.delete('/:user/hobbies/:id', verifyToken, userController.removeHobbie);
        this.router.delete('/hobbies/:id', verifyToken, userController.deleteHobbie);

        //User favoritos
        this.router.get('/:id/favoritos', verifyToken, userController.getFavoritos);
        this.router.post('/:id/favoritos', verifyToken, userController.addFavorito);
        this.router.delete('/:id/favoritos/:fav', verifyToken, userController.deleteFavorito);
    }
}

const userRoutes = new UserRoutes();

function verifyToken(req: Request, res: Response, next: () => void) {
    if(!req.headers.authorization) return res.status(401).json({message: 'Usuario no autorizado'});
    const token = req.headers.authorization.substring(7);
    if(token !== '') {
        const content = jwt.verify(token, 'stil');
        req.body.data = content;
        next();
    } else res.status(401).json({message: 'token vacio'});
}

export default userRoutes.router;