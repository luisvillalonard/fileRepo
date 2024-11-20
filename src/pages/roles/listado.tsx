import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Table, Tag, Flex } from "antd"
import { useData } from "../../hooks/useData"
import { useComponents } from "../../components"
import { Rol } from "../../interfaces/entidades"
import { ControlProps } from "../../interfaces/globales"

const RolesListado = (props: Pick<ControlProps, "filter">) => {

    const { filter = '' } = props
    const { contextRoles: { state, editar, todos } } = useData()
    const { datos, procesando, recargar } = state
    const { ButtonEdit } = useComponents()
    const { Column } = Table
    const url = useLocation()

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) cargar() }, [recargar])

    return (
        <Table
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                    .filter(item => item.nombre.toLowerCase().indexOf(filter) >= 0)
                        .map((item, index) => ({ ...item, key: index + 1 }))
            }
            locale={{ emptyText: <Flex>0 documento</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Es Administrador" render={(record: Rol) => (
                <Tag color={record.esAdmin ? '#87d068' : 'red'}>{record.esAdmin ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80}
                render={(record: Rol) => (
                    <ButtonEdit title={`Editar rol (${record.nombre})`.trim()} onClick={() => editar(record)} />
                )} />
        </Table>
    )
}
export default RolesListado;
