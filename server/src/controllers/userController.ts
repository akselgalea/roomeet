import { Request, Response } from 'express';
import { promisePool } from '../database';
const jwt = require('jsonwebtoken');

class UserController {
    public async list (req: Request, res: Response): Promise<any> {
        const {data} = req.body;
        const [users,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username != ?', [data.username]);
        return res.json(users);
    }

    public async getPerfil(req: Request, res: Response): Promise<any> {
        const {data} = req.body;
        const [user,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [data.username]);
        
        if((user as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(user as any)[0].id]);
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [(user as any)[0].id]);

            return res.json({...(user as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        return res.status(404).json({text: "Este usuario no existe"});
    }

    public async getUser (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const [user,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
        
        if((user as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(user as any)[0].id]);
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [(user as any)[0].id]);

            return res.status(200).json({...(user as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        return res.status(404).json({text: "Este usuario no existe"});
    }

    public async login(req: Request, res: Response): Promise<any> {
        const {username, password} = req.body;
        const [rows,] = await promisePool.query('SELECT username, role_id FROM user where username = ? AND password = ?', [username, password]);
        
        if((rows as any).length > 0) {
            const token = jwt.sign(JSON.stringify((rows as any)[0]), 'stil') ;
            return res.status(200).json({token});
        }

        return res.status(400).json({message: "Datos de usuario incorrectos"});
    }
    
    public async create(req: Request, res: Response): Promise<any> {
        let error;
        await promisePool.query('INSERT INTO user set ?', [req.body]).then(() => {
            res.status(200).json({message: 'Usuario creado con exito'})
        }).catch(err => {
            if(err.sqlMessage.includes('user_email_IDX')) return error = "Este email ya se encuentra registrado";
            if(err.sqlMessage.includes('user_username_IDX')) return error = "Este nombre de usuario ya esta en uso";
            error = err.sqlMessage;
        }); 

        if(error) res.status(400).json({message: error});
        return res
    }

    public async update(req: Request, res: Response): Promise<any> {
        let error;

        const { id } = req.params;
        await promisePool.query('UPDATE user SET ? WHERE username = ?', [req.body, id]).then(() => {
            res.status(200).json({message: 'Updated user ' + id});
        }).catch(err => {
            if(err.sqlMessage.includes('user_email_IDX')) return error = "Este email ya se encuentra registrado";
            if(err.sqlMessage.includes('user_username_IDX')) return error = "Este nombre de usuario ya esta en uso";
            error = err.sqlMessage
            res.status(400).json({message: error})
        });
        
        return res
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        
        await promisePool.query('DELETE FROM user where id = ?', [id]).then(() => {
            res.json({message: 'Usuario eliminado con exito!'})
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res
    }


    //Hobbies
    public async createHobbie(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO hobbies set ?', [req.body]).then(() => {
            res.json({message: 'Hobbie creado con exito!'})
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res
    }

    public async addHobbie(req: Request, res: Response): Promise<any> {
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
        const {id} = req.body.id; 

        await promisePool.query('INSERT INTO hobbies_user set hobbies_id = ?, user_id = ?', [id, (userId as any)[0].id]).then(() => {
            res.status(200).json({message: 'Adding hobbie to user ' + userId});
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage});
        });

        return res
    }

    public async removeHobbie(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('DELETE FROM hobbies_user where id = ?', [id]).then(() => {
            res.status(200).json({message: 'Hobbie removido con exito!'});
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage});
        });

        return res
    }

    public async deleteHobbie(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('DELETE FROM hobbies where id = ?', [id]).then(() => {
            res.status(200).json({message: 'Hobbie eliminado con exito!'});
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage});
        });

        return res
    }


    //Favoritos -- DONE
    public async getFavoritos(req: Request, res: Response): Promise<any> {
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
        await promisePool.query('SELECT u.id, u.username, u.nombre, u.sexo, u.profesion, u.foto_perfil, u.reputacion FROM user u LEFT JOIN favoritos_user fu ON u.id = fu.favorito where user_id = ? && u.estado = 0', [(userId as any)[0].id]).then(result => {
            res.status(200).json(result[0])
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res
    }

    public async addFavorito(req: Request, res: Response): Promise<any> {
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
        const {favorito} = req.body;
        
        await promisePool.query('INSERT INTO favoritos_user SET favorito = ?, user_id = ?', [favorito, (userId as any)[0].id]).then(() => {
            res.status(200).json({message: 'Operacion realizada con exito'})
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res
    }

    public async deleteFavorito(req: Request, res: Response): Promise<any> {
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
        const { fav } = req.params;

        await promisePool.query('DELETE FROM favoritos_user WHERE favorito = ? && user_id = ?', [fav, (userId as any)[0].id]).then(() => {
            res.status(200).json({message: 'Favorito removido con exito!'})
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res
    }
}

export const userController = new UserController();