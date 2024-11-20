import { useContext } from "react"
import { ContextsProviders } from "../components/providers/contexts"
import UsuariosProvider, { UsuariosContext, UsuariosContextState } from "../contexts/usuarios"
import DocumentosProvider, { DocumentoContextState, DocumentosContext } from "../contexts/documentos"
import { Documento, Rol, Usuario } from "../interfaces/entidades"
import { AuthContext, AuthContextState, AuthProvider } from "../contexts/auth"
import RolesProvider, { RolesContext, RolesContextState } from "../contexts/roles"

export const ContextsProvidersTree = ContextsProviders([

    [AuthProvider, {}],
    [RolesProvider, {}],
    [UsuariosProvider, {}],
    [DocumentosProvider, {}],
    
]);

export const useData = () => {

    const contextAuth = useContext<AuthContextState>(AuthContext);
    const contextRoles = useContext<RolesContextState<Rol>>(RolesContext);
    const contextUsuarios = useContext<UsuariosContextState<Usuario>>(UsuariosContext);
    const contextDocumentos = useContext<DocumentoContextState<Documento>>(DocumentosContext);

    return {
        
        contextAuth,
        contextRoles,
        contextUsuarios,
        contextDocumentos,
        
    }

}