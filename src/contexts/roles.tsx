import { createContext } from "react"
import { GlobalContextState } from "../reducers/global"
import { ControlProps } from "../interfaces/globales"
import { useReducerHook } from "../hooks/useReducer"
import { Rol } from "../interfaces/entidades"


export interface RolesContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
}

export const RolesContext = createContext<RolesContextState<Rol>>({} as RolesContextState<Rol>)

function RolesProvider({ children }: ControlProps) {

    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Rol>('roles')

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            esAdmin: false,
        });
    }

    return (
        <RolesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </RolesContext.Provider>
    )
}
export default RolesProvider;
