import { Router } from 'express';
import multer from 'multer';
import { userController } from '../controllers/userController';
import { Request, Response } from "express";

const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage: storage});

class UserRoutes {
    router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Directly to the user
        this.router.get('/', verifyToken, userController.list);
        this.router.post('/buscador', verifyToken, userController.buscador);
        this.router.get('/perfil', verifyToken, userController.getPerfil);
        this.router.get('/perfil/:id', verifyToken, userController.getUser);
        this.router.post('/login', userController.login);
        this.router.post('/register', userController.create);
        this.router.post('/comfirm-pass', verifyToken, userController.comparePass);
        this.router.put('/', verifyToken, userController.update);
        this.router.delete('/', verifyToken, userController.delete);
        
        //User hobbies
        this.router.get('/hobbies/all', verifyToken, userController.getHobbies);
        this.router.get('/hobbies', verifyToken, userController.getMyHobbies);
        this.router.post('/hobbies', verifyToken, userController.createHobbie);
        this.router.post('/hobbies/add', verifyToken, userController.addHobbie);
        this.router.delete('/hobbies/remove/:id', verifyToken, userController.removeHobbie);
        this.router.delete('/hobbies/:id', verifyToken, userController.deleteHobbie);
        
        //User fotos
        this.router.get('/images', verifyToken, userController.getImages);
        this.router.put('/images/:id', verifyToken, userController.updateImage);
        this.router.delete('/images/:id', verifyToken, userController.deleteImage);
        this.router.put('/foto-perfil', upload.single("file"), verifyToken, userController.updateFotoPerfil);
        this.router.post('/upload-image', upload.single("file"), verifyToken, userController.uploadImage);
        
        
        //User favoritos
        this.router.get('/favorito/:id', verifyToken, userController.isFavorito);
        this.router.get('/favoritos', verifyToken, userController.getFavoritos);
        this.router.post('/favoritos', verifyToken, userController.addFavorito);
        this.router.delete('/favoritos/:fav', verifyToken, userController.deleteFavorito);

        //Solicitudes
        this.router.get('/solicitudes', verifyToken, userController.getSolicitudes);
        this.router.get('/solicitudes/pendientes', verifyToken, userController.getCantPendientes);
        this.router.post('/solicitud', verifyToken, userController.createSolicitud);
        this.router.put('/solicitud/:id', verifyToken, userController.updateSolicitud);
        this.router.delete('/solicitud/:id', verifyToken, userController.deleteSolicitud);
        this.router.delete('/solicitud/user/:id', verifyToken, userController.deleteSolicitudByUserId);

        //Info contacto
        this.router.get('/contacto', verifyToken, userController.getMyInfoContacto);
        this.router.post('/contacto', verifyToken, userController.addInfoContacto);
        this.router.put('/contacto/:id', verifyToken, userController.updateInfoContacto);
        //Get another user contact info
        this.router.get('/:id/contacto', verifyToken, userController.getInfoContacto);
        //Get types of contact info
        this.router.get('/formas-contacto', verifyToken, userController.getFormasContacto);
        this.router.delete('/formas-contacto/:id', verifyToken, userController.deleteInfoContacto);

        //Configuracion
        this.router.get('/configuracion/buscador', verifyToken, userController.getBuscadorConfig);
        this.router.post('/configuracion/buscador', verifyToken, userController.createBuscadorConfig);
        this.router.put('/configuracion/buscador', verifyToken, userController.updateBuscadorConfig);
        this.router.delete('/configuracion/buscador', verifyToken, userController.deleteBuscadorConfig);
        
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