import { Request, Response } from 'express';
import { promisePool } from '../database';
const jwt = require('jsonwebtoken');

class UserController {
    public async list (req: Request, res: Response): Promise<any> {
        const [users,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil from user');
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
    
        res.status(404).json({text: "Este usuario no existe"});
    }

    public async getUser (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const [user,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
        
        if((user as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(user as any)[0].id]);
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [(user as any)[0].id]);

            return res.json({...(user as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        res.status(404).json({text: "Este usuario no existe"});
    }

    public async login(req: Request, res: Response): Promise<any> {
        const {username, password} = req.body;
        const [rows,] = await promisePool.query('SELECT username, role_id FROM user where username = ? AND password = ?', [username, password]);
        
        if((rows as any).length > 0) {
            const token = jwt.sign(JSON.stringify((rows as any)[0]), 'stil') ;
            return res.json({token});
        }
        res.status(400).json({message: "Datos de usuario incorrectos"});
    }
    
    public async create(req: Request, res: Response): Promise<any> {
        let error;
        await promisePool.query('INSERT INTO user set ?', [req.body]).catch(err => {
            if(err.sqlMessage.includes('user_email_IDX')) return error = "Este email ya se encuentra registrado";
            if(err.sqlMessage.includes('user_username_IDX')) return error = "Este nombre de usuario ya esta en uso";
            error = err.sqlMessage
        });

        if(error) return res.status(400).json({message: error});
        res.status(200).json({message: 'User created'});
    }

    public async update(req: Request, res: Response): Promise<any> {
        let error;

        const { id } = req.params;
        await promisePool.query('UPDATE user SET ? WHERE username = ?', [req.body, id]).catch(err => {
            if(err.sqlMessage.includes('user_email_IDX')) return error = "Este email ya se encuentra registrado";
            if(err.sqlMessage.includes('user_username_IDX')) return error = "Este nombre de usuario ya esta en uso";
            error = err.sqlMessage
        }); 

        if(error) return res.status(400).json({message: error});
        res.status(200).json({message: 'Updated user ' + id});
    }

    public async delete(req: Request, res: Response): Promise<any> {
        let error;
        const { id } = req.params;
        
        await promisePool.query('DELETE FROM user where id = ?', [id]).catch(err => {
            error = err.sqlMessage
        });
        
        if(error) return res.status(400).json({message: error});
        res.json({message: 'Erasing user ' + id });
    }


    //Hobbies
    public async createHobbie(req: Request, res: Response): Promise<any> {
        let error;

        await promisePool.query('INSERT INTO hobbies set ?', [req.body]).catch(err => {
            error = err.sqlMessage
        });
        
        if(error) return res.status(400).json({message: error});
        res.json({message: 'Creating hobbie ' + req.body.hobbie });
    }

    public async addHobbie(req: Request, res: Response): Promise<any> {
        let error;
        await promisePool.query('INSERT INTO hobbies_user set ?', [req.body]).catch(err => {
            error = err.sqlMessage
        });
        
        if(error) return res.status(400).json({message: error});
        res.json({message: 'Adding hobbie to user ' + req.body.user_id });
    }

    public async removeHobbie(req: Request, res: Response): Promise<any> {
        let error;
        const { id } = req.params;
        await promisePool.query('DELETE FROM hobbies_user where id = ?', [id]).catch(err => {
            error = err.sqlMessage
        });
        
        if(error) return res.status(400).json({message: error});
        res.json({message: 'Removing hobbie ' + id + 'from hobbie'});
    }

    public async deleteHobbie(req: Request, res: Response): Promise<any> {
        let error;
        const { id } = req.params;
        await promisePool.query('DELETE FROM hobbies where id = ?', [id]).catch(err => {
            error = err.sqlMessage
        });
        
        if(error) return res.status(400).json({message: error});
        res.json({message: 'Erasing hobbie ' + id});
    }


    //Favoritos -- DONE
    public async getFavoritos(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const [rows, ] = await promisePool.query('SELECT u.id, u.username, u.nombre, u.descripcion, u.sexo, u.profesion, u.bebedor, u.bebedor, u.fumador, u.fiestas, u.hijos, u.foto_perfil, u.reputacion FROM user u LEFT JOIN favoritos_user fu ON u.id = fu.favorito where user_id = ? && u.estado = 0', [id]);
        
        return res.json(rows);
    }

    public async addFavorito(req: Request, res: Response): Promise<any> {
        let error;
        await promisePool.query('INSERT INTO favoritos_user set ?', [req.body]).catch(err => {
            error = err.sqlMessage
        });
        
        if(error) return res.status(400).json({message: error});
        res.json({message: 'Adding favorito to user ' + req.body.user_id});
    }

    public async deleteFavorito(req: Request, res: Response): Promise<any> {
        const { id, fav } = req.params;
        await promisePool.query('DELETE FROM favoritos_user where user_id = ? && favorito = ?', [id, fav]);
        res.json({message: 'Erasing favorito ' + fav});
    }
}

export const userController = new UserController();