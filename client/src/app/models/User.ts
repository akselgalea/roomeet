export interface Hobbie {
    id?: number,
    hobbie?: string,
    categoria?: string
}

export interface Favorito {
    id?: number,
    favorito: number,
    user_id: number
}

export interface Foto {
    id?: number,
    link?: string,
    descripcion?: string
}

export interface Preferencias {
    sexo: number,
    bebedor: number,
    fumador: number,
    fiestas: number,
    mascota: number,
    hijos: number
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
    estado?: number,
    reputacion?: number,
    role_id?: string,
    preferencias?: Preferencias,
    fotos?: Array<Foto>,
    hobbies?: Array<Hobbie>
}