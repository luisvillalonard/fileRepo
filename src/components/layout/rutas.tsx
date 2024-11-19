import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/home'
import LoginPage from '../../pages/login'
import PageNotFound from '../../pages/notFound'
import PageUsuarios from '../../pages/usuarios/page'
import { useConstants } from '../../hooks/useConstants'
import PageDocumentos from '../../pages/documentos/page'
import DocumentoFormulario from '../../pages/documentos/formulario'

const RutasApp = () => {

    const { Urls } = useConstants()

    return (
        <Routes>
            <Route path={Urls.Home} element={<HomePage />} />
            <Route path={Urls.Login} element={<LoginPage />} />
            <Route path={Urls.Usuarios} element={<PageUsuarios />} />
            <Route path={Urls.Documentos.Base} element={<PageDocumentos />} />
            <Route path={`${Urls.Documentos.Base}/${Urls.Documentos.Formulario}`} element={<DocumentoFormulario />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )

}
export default RutasApp