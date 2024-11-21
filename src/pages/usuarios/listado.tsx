import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { Table, Tag, Flex } from "antd";
import { useData } from "../../hooks/useData"
import { ControlProps } from "../../interfaces/globales";
import { useComponents } from "../../components";
import { Usuario } from "../../interfaces/entidades";

const UsuariosListado = (props: Pick<ControlProps, "filter">) => {

    const { filter = '' } = props
    const { contextUsuarios: { state, editar, todos } } = useData()
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
                        .filter(item => item.nombres.toLowerCase().indexOf(filter) >= 0 ||
                            item.apellidos.toLowerCase().indexOf(filter) >= 0 ||
                            item.correo.toLowerCase().indexOf(filter) >= 0)
                        .map((item, index) => ({ ...item, key: index + 1 }))
            }
            locale={{ emptyText: <Flex>0 horarios</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombres" dataIndex="nombres" key="nombres" />
            <Column title="Apellidos" dataIndex="apellidos" key="apellidos" />
            <Column title="Correo Electr&oacute;nico" dataIndex="correo" key="correo" />
            <Column title="Es Administrador" align="center" render={(record: Usuario) => (
                <Tag color={record.esAdmin ? '#87d068' : 'red'}>{record.esAdmin ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Estado" align="center" render={(record: Usuario) => (
                <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: Usuario) => (
                <ButtonEdit title={`Editar usuario (${record.nombres} ${record.apellidos})`.trim()} onClick={() => editar(record)} />
            )} />
        </Table>
    )
}
export default UsuariosListado;
