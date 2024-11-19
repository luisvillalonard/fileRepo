import { createContext } from "react"
import { Documento } from "../interfaces/entidades"
import { GlobalContextState } from "../reducers/global"
import { ControlProps } from "../interfaces/globales"
import { useConstants } from "../hooks/useConstants"
import { useReducerHook } from "../hooks/useReducer"

export interface DocumentoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
};

export const DocumentosContext = createContext<DocumentoContextState<Documento>>({} as DocumentoContextState<Documento>)

function DocumentosProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Documento>(Urls.Documentos.Base);

    const nuevo = () => {
        editar({
            id: 0,
            codigo: undefined,
            nombre: '',
            extension: '',
            empleadoId: 0,
            numeroCheque: '',
            fecha: new Date().toISOString().slice(0, 10),
            eliminado: false,
            imagen: undefined,
        })
    }

    return (
        <DocumentosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </DocumentosContext.Provider>
    )
}
export default DocumentosProvider;
