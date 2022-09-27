import { Router } from 'express';
import { userController } from '../controllers/userController';

class UserRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Directly to the user
        this.router.get('/', userController.list);
        this.router.get('/:id', userController.getUser);
        this.router.post('/register', userController.create);
        this.router.put('/:id', userController.update);
        this.router.delete('/:id', userController.delete);

        //User hobbies
        this.router.post('/hobbies', userController.createHobbie);
        this.router.post('/:user/hobbies/add', userController.addHobbie);
        this.router.delete('/:user/hobbies/:id', userController.removeHobbie);
        this.router.delete('/hobbies/:id', userController.deleteHobbie);

        //User favoritos
        this.router.get('/:id/favoritos', userController.getFavoritos);
        this.router.post('/:id/favoritos', userController.addFavorito);
        this.router.delete('/:id/favoritos/:fav', userController.deleteFavorito);
    }
}

const userRoutes = new UserRoutes();

export default userRoutes.router;