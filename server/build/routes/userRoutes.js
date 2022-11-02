"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const jwt = require('jsonwebtoken');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Directly to the user
        this.router.get('/', verifyToken, userController_1.userController.list);
        this.router.get('/buscador', verifyToken, userController_1.userController.buscador);
        this.router.get('/perfil', verifyToken, userController_1.userController.getPerfil);
        this.router.get('/perfil/:id', verifyToken, userController_1.userController.getUser);
        this.router.post('/login', userController_1.userController.login);
        this.router.post('/register', userController_1.userController.create);
        this.router.post('/upload-image', upload.single("file"), verifyToken, userController_1.userController.uploadImage);
        this.router.post('/comfirm-pass', verifyToken, userController_1.userController.comparePass);
        this.router.put('/', verifyToken, userController_1.userController.update);
        this.router.delete('/', verifyToken, userController_1.userController.delete);
        //User hobbies
        this.router.post('/hobbies', verifyToken, userController_1.userController.createHobbie);
        this.router.post('/hobbies/add', verifyToken, userController_1.userController.addHobbie);
        this.router.delete('/hobbies/:id', verifyToken, userController_1.userController.removeHobbie);
        this.router.delete('/hobbies/:id', verifyToken, userController_1.userController.deleteHobbie);
        //User favoritos
        this.router.get('/favorito/:id', verifyToken, userController_1.userController.isFavorito);
        this.router.get('/favoritos', verifyToken, userController_1.userController.getFavoritos);
        this.router.post('/favoritos', verifyToken, userController_1.userController.addFavorito);
        this.router.delete('/favoritos/:fav', verifyToken, userController_1.userController.deleteFavorito);
        //Solicitudes
        this.router.get('/solicitudes', verifyToken, userController_1.userController.getSolicitudes);
        this.router.get('/solicitudes/pendientes', verifyToken, userController_1.userController.getCantPendientes);
        this.router.post('/solicitud', verifyToken, userController_1.userController.createSolicitud);
        this.router.put('/solicitud/:id', verifyToken, userController_1.userController.updateSolicitud);
        this.router.delete('/solicitud/:id', verifyToken, userController_1.userController.deleteSolicitud);
        this.router.delete('/solicitud/user/:id', verifyToken, userController_1.userController.deleteSolicitudByUserId);
        //Info contacto
        this.router.get('/contacto', verifyToken, userController_1.userController.getMyInfoContacto);
        this.router.post('/contacto', verifyToken, userController_1.userController.addInfoContacto);
        this.router.put('/contacto', verifyToken, userController_1.userController.getMyInfoContacto);
        //Get another user contact info
        this.router.get('/:id/contacto', verifyToken, userController_1.userController.getInfoContacto);
        //Get user contact info
        this.router.get('/formas-contacto', verifyToken, userController_1.userController.getFormasContacto);
        this.router.delete('/formas-contacto/:id', verifyToken, userController_1.userController.deleteInfoContacto);
        //Configuracion
        this.router.get('/configuracion/buscador', verifyToken, userController_1.userController.getBuscadorConfig);
        this.router.post('/configuracion/buscador', verifyToken, userController_1.userController.createBuscadorConfig);
        this.router.put('/configuracion/buscador', verifyToken, userController_1.userController.updateBuscadorConfig);
        this.router.delete('/configuracion/buscador', verifyToken, userController_1.userController.deleteBuscadorConfig);
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
