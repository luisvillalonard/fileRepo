import { useEffect } from "react";
import { useData } from "../../hooks/useData"
import { Alerta, Exito } from "../../hooks/useMensaje"
import { Documento } from "../../interfaces/entidades"
import { Button, Col, Flex, Form, Input, Row, Space, Upload } from "antd"
import { useForm } from "../../hooks/useForm"
import Container from "../../components/containers/container";
import { useIconos } from "../../hooks/useIconos";
import { GetFileBase64 } from "../../hooks/useUtils";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import { useConstants } from "../../hooks/useConstants";
import VisorPDF from "../../components/containers/visor";

const DocumentoFormulario = () => {

    const { contextDocumentos: { state: { modelo }, agregar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Documento | undefined>(modelo);
    const { IconUpload } = useIconos()
    const { Urls } = useConstants()
    const nav = useNavigate()

    const cargarFotos = async (file: RcFile) => {

        const isPDF = file.type === 'application/pdf';
        if (isPDF) {
            const newfile = await GetFileBase64(file);
            editar({
                ...entidad,
                nombre: file.name,
                extension: file.type.split('/')[1],
                imagen: newfile,
                fecha: new Date().toISOString().slice(0, 10),
            } as Documento);
            return false;
        }

        return true;

    }

    const guardar = async () => {

        if (!entidad) {
            return;
        }

        const res = await agregar(entidad);
        if (res.ok) {
            Exito('Documento agregado exitosamente!', () => nav(`/${Urls.Documentos.Base}`, { replace: true }));
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del usuario.');
        }

    };

    const volver = () => {
        cancelar()
        nav(`/${Urls.Documentos.Base}`, { replace: true })
    }

    useEffect(() => { editar(modelo) }, [modelo])

    return (
        <Col lg={{ span: 18, offset: 3 }} xs={24}>
            <Container title={
                <>
                    <span style={{ fontSize: 18, fontWeight: 500 }}>{`Documento ${modelo?.codigo ?? ''}`.trim()}</span>
                    <Space align="center">
                        <Button type="default" shape="round" htmlType="button" onClick={volver}>Cancelar</Button>
                        <Button type="primary" shape="round" htmlType="submit" form="formDocumento">Guardar</Button>
                    </Space>
                </>
            }>
                <Form
                    name="formDocumento"
                    autoComplete="off"
                    layout="vertical"
                    initialValues={modelo}
                    onFinish={guardar}
                    style={{ padding: 16 }}>
                    <Row gutter={16}>
                        <Col lg={12} md={12} xs={24}>
                            <Form.Item label="C&oacute;digo Empleado" name="empleadoId" rules={[{ required: true, message: 'Obligatorio' }]}>
                                <Input name="empleadoId" value={entidad?.empleadoId || ''} onChange={handleChangeInput} />
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} xs={24}>
                            <Form.Item label="N&uacute;mero Cheque" name="numeroCheque" rules={[{ required: true, message: 'Obligatorio' }]}>
                                <Input name="numeroCheque" value={entidad?.numeroCheque || ''} onChange={handleChangeInput} />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item name="imagen" rules={[{ required: true, message: 'Obligatorio' }]}>
                                <Upload
                                    multiple={false}
                                    maxCount={1}
                                    beforeUpload={cargarFotos}>
                                    <Button icon={<IconUpload />}>Cargar Documento PDF</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Flex style={{ width: '100%', height: 500 }}>
                                <VisorPDF item={entidad?.imagen} />
                            </Flex>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Col>
    )
}
export default DocumentoFormulario;
