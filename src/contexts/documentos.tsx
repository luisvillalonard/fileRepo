import { createContext } from "react"
import { Documento } from "../interfaces/entidades"
import { GlobalContextState } from "../reducers/global"
import { ControlProps, ResponseResult } from "../interfaces/globales"
import { useConstants } from "../hooks/useConstants"
import { useReducerHook } from "../hooks/useReducer"
import { useFetch } from "../hooks/useFetch"

export interface DocumentoContextState<T> extends GlobalContextState<T> {
    nuevo: () => void
    loadFile: (item: Documento) => Promise<ResponseResult<string | undefined>>
};

export const DocumentosContext = createContext<DocumentoContextState<Documento>>({} as DocumentoContextState<Documento>)

function DocumentosProvider({ children }: ControlProps) {

    const { Urls } = useConstants()
    const { state, editar, cancelar, agregar, actualizar, todos, errorResult } = useReducerHook<Documento>(Urls.Documentos.Base);
    const api = useFetch()

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

    const loadFile = async (item: Documento): Promise<ResponseResult<string | undefined>> => {

        let resp: ResponseResult<string | undefined>;

        try {
            resp = await api.Get<string>(`${Urls.Documentos.Base}/code?code=${item.codigo}`);
        } catch (error: any) {
            resp = errorResult<string | undefined>(error);
        }
        
        return resp;

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
            loadFile,
        }}>
            {children}
        </DocumentosContext.Provider>
    )
}
export default DocumentosProvider;
