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
    preferencias?: Preferencias,
    fotos?: Array<Foto>
}