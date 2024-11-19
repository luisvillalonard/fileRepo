import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { Table, Tag, Flex } from "antd";
import { useData } from "../../hooks/useData"
import { ControlProps } from "../../interfaces/globales";
import { useComponents } from "../../components";
import { Documento } from "../../interfaces/entidades";

const DocumentosListado = (props: Pick<ControlProps, "filter">) => {

    const { filter = '' } = props
    const { contextDocumentos: { state, editar, todos } } = useData()
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
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => item.nombre.toLowerCase().indexOf(filter) >= 0 ||
                            item.empleadoId.toString().toLowerCase().indexOf(filter) >= 0 ||
                            item.numeroCheque.toLowerCase().indexOf(filter) >= 0)
                        .map((item, index) => ({ ...item, key: index + 1 }))
            }
            locale={{ emptyText: <Flex>0 documento</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="C&oacute;digo Empleado" dataIndex="empleadoId" key="empleadoId" />
            <Column title="N&uacute;mero Cheque" dataIndex="numeroCheque" key="numeroCheque" />
            <Column title="Fecha" render={(record: Documento) => (record.fecha)} />
            <Column title="Estado" render={(record: Documento) => (
                <Tag color={record.eliminado ? 'red' : '#87d068'}>{record.eliminado ? 'Eliminado' : 'Activo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80}
                render={(record: Documento) => (
                    <ButtonEdit title={`Editar documento (${record.nombre})`.trim()} onClick={() => editar(record)} />
                )} />
        </Table>
    )
}
export default DocumentosListado;
