import { useState } from "react"
import { Space } from "antd"
import { useData } from "../../hooks/useData"
import Loading from "../../components/containers/loading"
import Listado from "./listado"
import { useIconos } from "../../hooks/useIconos"
import Container from "../../components/containers/container"
import { useComponents } from "../../components"
import { useNavigate } from "react-router-dom"
import { useConstants } from "../../hooks/useConstants"

const PageDocumentos = () => {

    const { contextUsuarios: { state: { procesando }, nuevo } } = useData()
    const [filter, setFilter] = useState<string>('')
    const { ButtonPrimary, Searcher, TitlePage } = useComponents()
    const { IconPlus, IconFile } = useIconos()
    const { Urls } = useConstants()
    const nav = useNavigate()

    const nuevoDocumento = () => {
        nuevo()
        nav(Urls.Documentos.Formulario, { replace: true })
    }

    return (
        <>
            <Container
                title={
                    <>
                        <Space size="large">
                            <TitlePage title="Documentos" icon={<IconFile style={{ fontSize: 24 }} />} />
                            <ButtonPrimary icon={<IconPlus />} onClick={nuevoDocumento}>Nuevo</ButtonPrimary>
                        </Space>
                        <Space>
                            <Searcher onChange={setFilter} wait={false} variant="borderless" />
                        </Space>
                    </>
                }>
                <Listado filter={filter} />
            </Container>
            <Loading fullscreen active={procesando} message="procesando, espere..." />
        </>
    )
}
export default PageDocumentos;
