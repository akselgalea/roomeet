interface Foto {
    id?: number,
    link?: string
}

export interface User {
    id?: number,
    username?: string,
    email?: string,
    password?: string,
    nombre?: string,
    descripcion?: string,
    sexo?: number,
    bebedor?: number,
    fumador?: number,
    fiestas?: number,
    hijos?: number,
    foto_perfil?: string,
    fotos?: Array<Foto>
}