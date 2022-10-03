import { request, Request, Response } from 'express';
import { pool, promisePool } from '../database';

class UserController {
    public async list (req: Request, res: Response): Promise<any> {
        // const [rows, fields] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos from user');
        const [rows,] = await promisePool.query('SELECT * from user');

        return res.json(rows);
    }

    public async getUser (req: Request, res: Response) : Promise<any> {
        const { id } = req.params;
        const [rows,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
        if((rows as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(rows as any)[0].id]);
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [(rows as any)[0].id]);

            return res.status(200).json({...(rows as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        res.status(404).json({text: "Este usuario no existe"});
    }
    
    public async create(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO user set ?', [req.body]).catch(err => {
            res.json({text: err.sqlMessage})
        });

        res.status(200).json({message: 'User created'});
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('UPDATE user SET ? WHERE username = ?', [req.body, id]); 
        res.json({text: 'Updated user ' + id });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        
        await promisePool.query('DELETE FROM user where id = ?', [id]).catch(err => {
            res.json({text: err});
        });

        res.json({text: 'Erasing user ' + req.params.id });
    }


    //Hobbies
    public async createHobbie(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO hobbies set ?', [req.body]);
        res.json({text: 'Creating hobbie ' + req.body.hobbie });
    }

    public async addHobbie(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO hobbies_user set ?', [req.body]);
        res.json({text: 'Adding hobbie to user ' + req.body.user_id });
    }

    public async removeHobbie(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('DELETE FROM hobbies_user where id = ?', [id]);
        res.json({text: 'Removing hobbie ' + id + 'from hobbie'});
    }

    public async deleteHobbie(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('DELETE FROM hobbies where id = ?', [id]);
        res.json({text: 'Erasing hobbie ' + id});
    }


    //Favoritos -- DONE
    public async getFavoritos(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const [rows, ] = await promisePool.query('SELECT u.id, u.username, u.nombre, u.descripcion, u.sexo, u.profesion, u.bebedor, u.bebedor, u.fumador, u.fiestas, u.hijos, u.foto_perfil, u.reputacion FROM user u LEFT JOIN favoritos_user fu ON u.id = fu.favorito where user_id = ? && u.estado = 0', [id]);
        
        return res.json(rows);
    }

    public async addFavorito(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO favoritos_user set ?', [req.body]);
        res.json({text: 'Adding favorito to user ' + req.body.user_id});
    }

    public async deleteFavorito(req: Request, res: Response): Promise<any> {
        const { id, fav } = req.params;
        await promisePool.query('DELETE FROM favoritos_user where user_id = ? && favorito = ?', [id, fav]);
        res.json({text: 'Erasing favorito ' + fav});
    }
}

export const userController = new UserController();