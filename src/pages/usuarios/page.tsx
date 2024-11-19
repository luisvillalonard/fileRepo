import { useState } from "react"
import { Space } from "antd"
import { useData } from "../../hooks/useData"
import Loading from "../../components/containers/loading"
import Listado from "./listado"
import Formulario from "./formulario"
import { useIconos } from "../../hooks/useIconos"
import Container from "../../components/containers/container"
import { useComponents } from "../../components"

const PageUsuarios = () => {

    const { contextUsuarios: { state: { procesando }, nuevo } } = useData()
    const [filter, setFilter] = useState<string>('')
    const { ButtonPrimary, Searcher, TitlePage } = useComponents()
    const { IconPlus, IconUsers } = useIconos()

    return (
        <>
            <Container
                title={
                    <>
                        <Space size="large">
                            <TitlePage title="Usuarios" icon={<IconUsers style={{ fontSize: 24 }} />} />
                            <ButtonPrimary icon={<IconPlus />} onClick={nuevo}>Nuevo</ButtonPrimary>
                        </Space>
                        <Space>
                            <Searcher onChange={setFilter} wait={false} variant="borderless" />
                        </Space>
                    </>
                }>
                <Listado filter={filter} />
            </Container>
            <Formulario />
            <Loading fullscreen active={procesando} message="procesando, espere..." />
        </>
    )
}
export default PageUsuarios;
