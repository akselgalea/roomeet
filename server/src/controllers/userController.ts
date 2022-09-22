import { request, Request, Response } from 'express';
import { pool, promisePool } from '../database';

class UserController {
    public async list (req: Request, res: Response): Promise<any> {
        // const [rows, fields] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos from user');
        const [rows,] = await promisePool.query('SELECT * from user');

        res.json(rows);
    }

    public async getUser (req: Request, res: Response) : Promise<any> {
        const { id } = req.params;
        const [rows,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
        if((rows as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(rows as any)[0].id]);
            const result = {...(rows as any)[0], ...{'fotos': fotos}};
            return res.json(result);
        } 
    
        res.status(404).json({text: "Este usuario no existe"});
    }
    
    public async create(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO user set ?', [req.body]);
        res.json({message: 'User created'});
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('UPDATE user SET ? WHERE id = ?', [req.body, id]); 
        res.json({text: 'Updated user ' + id });
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('DELETE FROM user where id = ?', [id]);
        res.json({text: 'Erasing user ' + req.params.id });
    }
}

export const userController = new UserController();