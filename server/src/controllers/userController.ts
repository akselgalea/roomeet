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
        const {config} = req.body;
        let users: any = [];

        await promisePool.query('CALL getUsers(?, ?)', [req.body.data.id, config.sexo]).then( ([data,]: any) => {
            users = data[0];
            users.map((item: any) => {
                item.afinidad = 0;
                
                for (const [key, value] of Object.entries(config)) {
                    if(value == 2) item.afinidad += 1;
                    else if(value == item[key]) item.afinidad += 2;
                }
            })

            res.json(users.sort((a: any, b: any) => b.afinidad - a.afinidad));
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
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ? ORDER BY h.categoria_id DESC', [(user as any)[0].id]);

            return res.json({...(user as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        return res.status(404).json({message: "Este usuario no existe"});
    }

    public async getUser (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const [user,] = await promisePool.query('SELECT id, username, nombre, descripcion, sexo, profesion, bebedor, fumador, fiestas, mascotas, hijos, foto_perfil FROM user WHERE username = ?', [id]);
        
        if((user as any).length > 0) {
            const [fotos, ] = await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [(user as any)[0].id]);
            const [hobbies, ] = await promisePool.query('SELECT hu.id, h.hobbie, h.categoria_id FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id WHERE hu.user_id = ? ORDER BY h.categoria_id DESC', [(user as any)[0].id]);

            return res.status(200).json({...(user as any)[0], ...{'fotos': fotos}, ...{'hobbies': hobbies}});
        } 
    
        return res.status(404).json({message: "Este usuario no existe"});
    }

    public async login(req: Request, res: Response): Promise<any> {
        const {username, password} = req.body;
        await promisePool.query('SELECT id, username, role_id FROM user where username = ? AND password = ?', [username, password]).then(([data,]: any) => {
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
        await promisePool.query('UPDATE user SET ? WHERE id = ?', [req.body.user, req.body.data.id]).then(() => {
            res.status(200).json({message: 'Updated user ' + req.body.data.id});
        }).catch(err => {
            if(err.sqlMessage.includes('user_username_IDX')) error = "Este nombre de usuario ya esta en uso";
            else if(err.sqlMessage.includes('user_email_IDX')) error = "Este email ya se encuentra registrado";
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

    // Hobbies -------------------------------------------------------------------------------
    public async getHobbies(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT * FROM categorias_hobbies').then(async ([rows,]: any) => {
            const data = await Promise.all(
                rows.map(async (item: any) => {
                    const [rows,] = await promisePool.query('SELECT id, hobbie FROM hobbies WHERE categoria_id = ?', [item.id]);
                    item.hobbies = rows;
                    return item
                })
            )

            res.json(data);
        }, err => {
            res.status(400).json({message: err});
        });
        return res;
    }

    public async getMyHobbies(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT hu.id, h.hobbie, ch.categoria FROM hobbies_user hu JOIN hobbies h ON hu.hobbie_id = h.id JOIN categorias_hobbies ch ON ch.id = h.categoria_id WHERE hu.user_id = ? ORDER BY ch.categoria', [req.body.data.id]).then(([rows,]: any) => {
            res.json(rows);
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })
        return res;
    }
    
    public async createHobbie(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO hobbies SET hobbie = ?, categoria_id = ?', [req.body.hobbie.toLowerCase(), req.body.categoria_id]).then(() => {
            res.json({message: 'Hobbie creado con exito!'})
        }).catch(err => {
            if(err.sqlMessage.includes('hobbie')) res.status(400).json({message: 'Este hobbie ya existe'});
            else res.status(400).json({message: err.sqlMessage});
        });

        return res
    }

    public async addHobbie(req: Request, res: Response): Promise<any> {
        await promisePool.query('INSERT INTO hobbies_user SET hobbie_id = ?, user_id = ?', [req.body.hobbie_id, req.body.data.id]).then(() => {
            res.status(200).json({message: 'Added hobbie to user ' + req.body.data.id});
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage});
        });

        return res
    }

    public async removeHobbie(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await promisePool.query('DELETE FROM hobbies_user WHERE id = ?', [id]).then(() => {
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

    // Fotos -----------------------------------------------------------------------------------
    public async getImages(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT id, link, descripcion FROM fotos_user WHERE user_id = ?', [req.body.data.id]).then(([rows,]: any) => {
            res.json(rows)
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    public async updateImage(req: Request, res: Response): Promise<any> {
        await promisePool.query('UPDATE fotos_user SET descripcion = ? WHERE id = ?', [req.body.description, req.params.id]).then(() => {
            res.status(200).json({message: 'Foto actualizada con exito'})
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    public async updateFotoPerfil(req: Request, res: Response): Promise<any> {
        const file = req.file;
        if(file) {
            await promisePool.query('UPDATE user SET foto_perfil = ? WHERE id = ?', [file.path, req.body.data.id]).then(() => {
                res.json({message: "Foto de perfil actualizada con exito!"});
            }, err => {
                res.status(400).json({message: err.sqlMessage})
            })
        } else {
            res.status(400).json({message: 'Errol al subir la imagen'});
        }

        return res;
    }

    public async deleteImage(req: Request, res: Response): Promise<any> {
        await promisePool.query('DELETE FROM fotos_user WHERE id = ?', [req.params.id]).then(() => {
            res.status(200).json({message: 'Foto removida con exito'});
        }, err => {
            res.status(400).json({message: err.sqlMessage});
        })
        return res;
    }

    public async uploadImage(req: Request, res: Response): Promise<any> {
        const file = req.file;
        if(file) {
            let data = {
                link: file.path,
                descripcion: req.body.descripcion,
                user_id: req.body.data.id
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

    // Favoritos -------------------------------------------------------------------------------
    public async getFavoritos(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT u.id, u.username, u.nombre, u.sexo, u.profesion, u.foto_perfil, u.reputacion FROM user u LEFT JOIN favoritos_user fu ON u.id = fu.favorito where user_id = ? && u.estado = 0', [req.body.data.id]).then(async ([rows,]: any) => {
            await promisePool.query('SELECT u.id, pc.id AS soli_id, pc.estado FROM peticion_contacto AS pc JOIN user AS u ON u.id = pc.contactado_id WHERE pc.user_id = ?', [req.body.data.id]).then(([data,]: any) => {
                res.json({favs: rows, solis: data})
            }, err => {
                res.status(400).json({message: err.sqlMessage});
            })
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res
    }

    public async addFavorito(req: Request, res: Response): Promise<any> {
        const {favorito} = req.body;
        await promisePool.query('SELECT * FROM favoritos_user WHERE favorito = ? && user_id = ?', [favorito, req.body.data.id]).then(async ([rows,] : any) => {
            if(rows.length > 0) {
                res.status(400).json({message: 'Este usuario ya esta en tus favoritos!'})
            } else {
                await promisePool.query('INSERT INTO favoritos_user SET favorito = ?, user_id = ?', [favorito, req.body.data.id]).then(() => {
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
        const { fav } = req.params;

        await promisePool.query('DELETE FROM favoritos_user WHERE favorito = ? && user_id = ?', [fav, req.body.data.id]).then(() => {
            res.status(200).json({message: 'Favorito removido con exito!'})
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res
    }

    public async isFavorito(req: Request, res: Response): Promise<any> {
        const {id} = req.params;

        await promisePool.query('SELECT id FROM favoritos_user WHERE favorito = ? && user_id = ?', [id, req.body.data.id]).then(([rows,]: any) => {
            if(rows.length > 0) res.json({result: true});
            else res.json({result: false});
        }, err => {
            console.log(err);
            res.status(400).json({message: 'Ha ocurrido un error'});
        })

        return res;
    }

    // Solicitudes -------------------------------------------------------------------------------
    public async getSolicitudes(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT pc.*, u.username, u.nombre, u.foto_perfil FROM peticion_contacto AS pc JOIN user AS u ON u.id = pc.user_id WHERE pc.contactado_id = ? && pc.estado != 2', [req.body.data.id]).then(async ([rows,]: any) => {
            await promisePool.query('SELECT pc.*, u.username, u.nombre, u.foto_perfil FROM peticion_contacto AS pc JOIN user AS u ON u.id = pc.contactado_id WHERE pc.user_id = ?', [req.body.data.id]).then(([data,]: any) => {
                res.json({solis: rows, mysolis: data})
            })
        }, err => {
            res.status(400).json({message: err.sqlMessage});
        })
        return res;
    }

    public async getCantPendientes(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT count(id) AS cantidad FROM peticion_contacto WHERE contactado_id = ? && estado = 0', [req.body.data.id]).then(([data,]: any) => {
            res.json(data[0].cantidad);
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res;
    }

    public async createSolicitud(req: Request, res: Response): Promise<any> {
        const data = {
            contactado_id: req.body.id,
            user_id: req.body.data.id
        }
        
        await promisePool.query('INSERT INTO peticion_contacto SET ?', [data]).then(() => {
            res.json({message: 'Solicitud generada con exito'})
        }, err => {
            res.status(200).json({message: err.sqlMessage})
        })

        return res;
    }

    public async updateSolicitud(req: Request, res: Response): Promise<any> {
        await promisePool.query('UPDATE peticion_contacto SET estado = ? WHERE id = ?', [req.body.estado, req.params.id]).then(() => {
            res.json({message: 'Solicitud aceptado con exito!'})
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    public async deleteSolicitud(req: Request, res: Response): Promise<any> {
        await promisePool.query('DELETE FROM peticion_contacto WHERE id = ?', [req.params.id]).then(() => {
            res.status(200).json({message: 'Solicitud removida con exito!'})
        }).catch(err => {
            res.status(400).json({message: err.sqlMessage})
        });

        return res;
    }

    public async deleteSolicitudByUserId(req: Request, res: Response): Promise<any> {
        await promisePool.query('DELETE FROM peticion_contacto WHERE contactado_id = ? && user_id = ?', [req.params.id, req.body.data.id]).then(() => {
            res.status(200).json({message: 'Solicitud removida con exito!'})
        }).catch(err => {
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

    // Info contacto -------------------------------------------------------------------------------
    public async getFormasContacto(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT * FROM formas_contacto').then(([data, ]: any) => {
            res.json(data)
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })
        
        return res;
    }
    
    public async getInfoContacto(req: Request, res: Response): Promise<any> {
        await promisePool.query('CALL getInfoContacto(?)', [req.params.id]).then(([data, ]: any) => {
            res.json(data[0])
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })
        
        return res;
    }

    public async getMyInfoContacto(req: Request, res: Response): Promise<any> {
        await promisePool.query('CALL getInfoContacto(?)', [req.body.data.id]).then(([data, ]: any) => {
            res.json(data[0])
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })
        
        return res;
    }

    public async addInfoContacto(req: Request, res: Response): Promise<any> {
        req.body.forma.user_id = req.body.data.id;
        await promisePool.query('INSERT INTO formas_contacto_user SET ?', [req.body.forma]).then(() => {
            res.status(200).json({message: 'Forma de contacto agregada con exito'})
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    public async updateInfoContacto(req: Request, res: Response): Promise<any> {
        await promisePool.query('UPDATE formas_contacto_user SET link = ? WHERE id = ?', [req.body.link, req.params.id]).then(() => {
            res.status(200).json({message: 'Forma de contacto actualizada con exito'})
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        }) 

        return res;
    }

    public async deleteInfoContacto(req: Request, res: Response): Promise<any> {
        await promisePool.query('DELETE FROM formas_contacto_user WHERE id = ?', [req.params.id]).then(() => {
            res.status(200).json({message: 'Forma de contacto removida con exito'})
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    // Buscador Config -------------------------------------------------------------------------------
    public async getBuscadorConfig(req: Request, res: Response): Promise<any> {
        await promisePool.query('SELECT sexo, bebedor, fumador, fiestas, mascotas, hijos FROM preferencias WHERE user_id = ?', [req.body.data.id]).then(([rows,]: any) => {
            res.json(rows[0]);
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    public async updateBuscadorConfig(req: Request, res: Response): Promise<any> {
        await promisePool.query('UPDATE preferencias SET ? WHERE user_id = ?', [req.body.config, req.body.data.id]).then(() => {
            res.status(200).json({message: 'Configuracion actualizada con exito'});
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    public async createBuscadorConfig(req: Request, res: Response): Promise<any> {
        req.body.config.user_id = req.body.data.id;
        await promisePool.query('INSERT INTO preferencias SET ?', [req.body.config]).then(() => {
            res.status(200).json({message: 'Configuracion creada con exito'});
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }

    public async deleteBuscadorConfig(req: Request, res: Response): Promise<any> {
        await promisePool.query('DELETE FROM preferencias WHERE user_id = ?', [req.body.data.id]).then(() => {
            res.status(200).json({message: 'Configuracion removida con exito'});
        }, err => {
            res.status(400).json({message: err.sqlMessage})
        })

        return res;
    }
}

export const userController = new UserController();