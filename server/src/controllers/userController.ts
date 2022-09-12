import { request, Request, Response } from 'express';
import { pool, promisePool } from '../database';

class UserController {
    public async list (req: Request, res: Response): Promise<any> {
        // const [rows, fields] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos from user');
        const [rows, fields] = await promisePool.query('SELECT * from user');

        res.json(rows);
    }

    public async getUser (req: Request, res: Response) : Promise<any> {
        const { id } = req.params;
        const [rows, fields] = await promisePool.query('SELECT username, nombre, descripcion, sexo, bebedor, fumador, fiestas, hijos from user where id = ?', [id]);
        if(rows.length > 0) {
            return res.json(rows[0]);
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