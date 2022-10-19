import { Request, Response } from 'express';
import { promisePool } from '../database';
const jwt = require('jsonwebtoken');

class UserController {
    public async list (req: Request, res: Response): Promise<any> {
        const {data} = req.body;
        const [users,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username != ?', [data.username]);
        return res.json(users);
    }

    public async buscador (req: Request, res: Response): Promise<any> {
        const {data} = req.body;
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);

        await promisePool.query(
            'SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username != ? EXCEPT SELECT u.id, u.username, u.nombre, u.descripcion, u.sexo, u.profesion, u.bebedor, u.fumador, u.fiestas, u.mascotas, u.hijos, u.foto_perfil FROM favoritos_user JOIN user as u ON favorito = u.id WHERE user_id = ?'
        , [data.username, (userId as any)[0].id]).then(([users,]) => {
            res.json(users);
        }, err => {
            res.status(400).json({message: err.sqlMessage});
        });
        
        return res;
    }

    public async getPerfil(req: Request, res: Response): Promise<any> {
        const {data} = req.body;
        const [user,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username = ?', [data.username]);
        
        if((user as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(user as any)[0].id]);
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [(user as any)[0].id]);

            return res.json({...(user as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        return res.status(404).json({text: "Este usuario no existe"});
    }

    public async getUser (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const [user,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
        
        if((user as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(user as any)[0].id]);
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ?', [(user as any)[0].id]);

            return res.status(200).json({...(user as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        return res.status(404).json({text: "Este usuario no existe"});
    }

    public async login(req: Request, res: Response): Promise<any> {
        const {username, password} = req.body;
        await promisePool.query('SELECT username, role_id FROM user where username = ? AND password = ?', [username, password]).then(([data,]: any) => {
            if(data.length === 0) res.status(400).json({message: "Datos de usuario incorrectos"});
            else {
                const token = jwt.sign(JSON.stringify(data[0]), 'stil');
                res.json({token});
            }
        }, err => {
            console.log(err.sqlMessage);
        })
        
        return res;
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

    public async uploadImage(req: Request, res: Response): Promise<any> {
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
        const file = req.file;
        if(file) {
            let data = {
                link: file.path,
                descripcion: req.body.descripcion,
                user_id: (userId as any)[0].id

            }
            
            await promisePool.query('INSERT INTO fotos_user set ?', data).then(() => {
                res.json({message: "Imagen subida con exito!"});
            }, err => {
                res.status(400).json({message: err.sqlMessage})
            })
        } else {
            res.status(400).json({message: 'Errol al subir la imagen'});
        }

        return res;
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
        
        await promisePool.query('SELECT * FROM favoritos_user WHERE favorito = ? && user_id = ?', [favorito, (userId as any)[0].id]).then(async ([rows,] : any) => {
            if(rows.length > 0) {
                res.status(400).json({message: 'Este usuario ya esta en tus favoritos!'})
            } else {
                await promisePool.query('INSERT INTO favoritos_user SET favorito = ?, user_id = ?', [favorito, (userId as any)[0].id]).then(() => {
                    res.status(200).json({message: 'Operacion realizada con exito'})
                }).catch(err => {
                    res.status(400).json({message: err.sqlMessage})
                });
            }
        }, err => {
            res.status(400).json({message: err.sqlMessage});
        })

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

    public async isFavorito(req: Request, res: Response): Promise<any> {
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
        const {id} = req.params;

        await promisePool.query('SELECT id FROM favoritos_user WHERE favorito = ? && user_id = ?', [id, (userId as any)[0].id]).then(([rows,]: any) => {
            if(rows.length > 0) res.json({result: true});
            else res.json({result: false});
        }, err => {
            console.log(err);
            res.status(400).json({message: 'Ha ocurrido un error'});
        })

        return res;
    }

    public async getCantPendientes(req: Request, res: Response): Promise<any> {
        const [userId,] = await promisePool.query('SELECT id FROM user WHERE username = ?', [req.body.data.username]);
    
        await promisePool.query('SELECT id FROM peticion_contacto WHERE contactado_id = ? && acepta = 0', [(userId as any)[0].id]).then((data) => {
            res.json((data as any)[0].length)
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res;
    }

    public async comparePass(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT password FROM user WHERE username = ?', [req.body.data.username]).then((data: any) => {
            if(data[0][0].password === req.body.password) {
                res.json({message: 'Felicidades! Las contraseñas coinciden'})
            } else {
                res.status(400).json({message: 'Las contraseñas no coinciden'});
            }
        }, err => {
            res.status(400).json({message: err.sqlMessage});
        })
         
        return res;
    }
}

export const userController = new UserController();