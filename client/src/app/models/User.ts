export interface Hobbie {
    id?: number,
    hobbie?: string,
    categoria_id?: number
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
    sexo?: string,
    profesion?: string,
    bebedor?: string,
    fumador?: string,
    fiestas?: string,
    mascotas?: string,
    hijos?: string,
    foto_perfil?: string,
    estado?: number,
    reputacion?: number,
    role_id?: string,
    preferencias?: Preferencias,
    fotos?: Array<Foto>,
    hobbies?: Array<Hobbie>
}