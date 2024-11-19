export interface Login {
    correo: string,
    clave: string,
    recuerdame: boolean
}

export interface Usuario {
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    activo: boolean,
    cambio: boolean,
    token: string | undefined,
}

export interface UsuarioCambioClave {
    id: number,
    passwordNew: string,
    passwordConfirm: string,
}

export interface Documento {
    id: number,
    codigo: string | undefined,
    nombre: string,
    extension: string,
    empleadoId: number,
    numeroCheque: string,
    fecha: string,
    eliminado: boolean,
    imagen: string | undefined,
}