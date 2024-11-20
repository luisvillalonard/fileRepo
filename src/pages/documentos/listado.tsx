import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Table, Tag, Flex, Modal, Space } from "antd";
import { useData } from "../../hooks/useData"
import { ControlProps } from "../../interfaces/globales";
import { useComponents } from "../../components";
import { Documento } from "../../interfaces/entidades";
import { useIconos } from "../../hooks/useIconos";
import { ButtonDefault } from "../../components/buttons/default";
import VisorPDF from "../../components/containers/visor";

const DocumentosListado = (props: Pick<ControlProps, "filter">) => {

    const { filter = '' } = props
    const { contextDocumentos: { state, editar, todos, loadFile } } = useData()
    const { datos, procesando, recargar } = state
    const [documento, setDocumento] = useState<Documento | undefined>(undefined)
    const [file, setFile] = useState<string | undefined>(undefined)
    const [loadingFile, setLoadingFile] = useState<boolean>(false)
    const { ButtonEdit, ButtonText } = useComponents()
    const { IconSearchPlus } = useIconos()
    const { Column } = Table
    const url = useLocation()

    const cargar = async () => await todos();

    const viewFile = async (item: Documento) => {

        setLoadingFile(true);
        const file = await loadFile(item);
        setFile(file.datos);
        setDocumento(item);
        setLoadingFile(false);

    }

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) cargar() }, [recargar])

    return (
        <>
            <Table
                size="middle"
                bordered={false}
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
                <Column title="Acciones" align="center" width={80} render={(record: Documento) => (
                    <Space align="center" size={10}>
                        <ButtonText
                            type="text"
                            shape="circle"
                            htmlType="button"
                            title={`Ver documento (${record.nombre})`.trim()}
                            icon={<IconSearchPlus style={{ fontSize: 20 }} />}
                            onClick={() => { viewFile(record) }} />
                        <ButtonEdit
                            title={`Editar documento (${record.nombre})`.trim()}
                            onClick={() => editar(record)} />
                    </Space>
                )} />
            </Table>
            <Modal
                open={file ? true : false}
                loading={loadingFile}
                title={
                    <Flex align="start" gap={30}>
                        <Flex vertical>
                            <div style={{ fontWeight: 'lighter' }}>C&oacute;digo Empleado</div>
                            <div style={{ fontWeight: 'bolder' }}>{documento?.empleadoId}</div>
                        </Flex>
                        <Flex vertical>
                            <div style={{ fontWeight: 'lighter' }}>N&uacute;mero Cheque</div>
                            <div style={{ fontWeight: 'bolder' }}>{documento?.numeroCheque}</div>
                        </Flex>
                        <Flex vertical>
                            <div style={{ fontWeight: 'lighter' }}>Nombre Documento</div>
                            <div style={{ fontWeight: 'bolder' }}>{documento?.nombre}</div>
                        </Flex>
                    </Flex>
                }
                centered
                closable={false}
                width="100%"
                styles={{
                    body: {
                        height: 500
                    }
                }}
                footer={[
                    <ButtonDefault shape="default" onClick={() => setFile(undefined)}>Cerrar</ButtonDefault>
                ]}>
                <VisorPDF item={file} />
            </Modal>
        </>
    )
}
export default DocumentosListado;
