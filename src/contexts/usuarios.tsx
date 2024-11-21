import { createContext } from "react"
import { ACTIONS, GlobalContextState } from "../reducers/global"
import { ControlProps, ResponseResult } from "../interfaces/globales"
import { useFetch } from "../hooks/useFetch"
import { useReducerHook } from "../hooks/useReducer"
import { Login, Usuario, UsuarioCambioClave } from "../interfaces/entidades"


export interface UsuariosContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
    validar: (item: Login) => Promise<ResponseResult<Usuario | undefined>>,
    cambiarClave: (item: UsuarioCambioClave) => Promise<ResponseResult<Usuario>>,
}

export const UsuariosContext = createContext<UsuariosContextState<Usuario>>({} as UsuariosContextState<Usuario>)

function UsuariosProvider({ children }: ControlProps) {

    const { state, dispatch, editar, cancelar, agregar, actualizar, todos, errorResult } = useReducerHook<Usuario>('usuarios')
    const api = useFetch()

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            codigo: undefined,
            nombres: '',
            apellidos: '',
            correo: '',
            activo: true,
            cambio: true,
            esAdmin: false,
        });
    }

    const validar = async (item: Login): Promise<ResponseResult<Usuario | undefined>> => {

        dispatch({ type: ACTIONS.FETCHING });
        let resp: ResponseResult<Usuario | undefined>;
        
        try {
            resp = await api.Post<Usuario>(`usuarios/validar`, item);
        } catch (error: any) {
            resp = errorResult<Usuario | undefined>(error);
        }
        
        dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: false });
        return resp;

    }

    const cambiarClave = async (item: UsuarioCambioClave): Promise<ResponseResult<Usuario>> => {

        dispatch({ type: ACTIONS.FETCHING });
        let resp: ResponseResult<Usuario>;

        try {
            resp = await api.Post<Usuario>(`usuarios/cambioClave`, item);
        } catch (error: any) {
            resp = errorResult<Usuario>(error);
        }
        
        dispatch({ type: ACTIONS.FETCH_COMPLETE, recargar: true });
        return resp;

    }

    return (
        <UsuariosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
            cambiarClave,
            validar,
        }}>
            {children}
        </UsuariosContext.Provider>
    )
}
export default UsuariosProvider;
