import { useContext } from "react"
import { ContextsProviders } from "../components/providers/contexts"
import UsuariosProvider, { UsuariosContext, UsuariosContextState } from "../contexts/usuarios"
import DocumentosProvider, { DocumentoContextState, DocumentosContext } from "../contexts/documentos"
import { Documento, Usuario } from "../interfaces/entidades"
import { AuthContext, AuthContextState, AuthProvider } from "../contexts/auth"

export const ContextsProvidersTree = ContextsProviders([

    [AuthProvider, {}],
    [UsuariosProvider, {}],
    [DocumentosProvider, {}],
    
]);

export const useData = () => {

    const contextAuth = useContext<AuthContextState>(AuthContext);
    const contextUsuarios = useContext<UsuariosContextState<Usuario>>(UsuariosContext);
    const contextDocumentos = useContext<DocumentoContextState<Documento>>(DocumentosContext);

    return {
        
        contextAuth,
        contextUsuarios,
        contextDocumentos,
        
    }

}