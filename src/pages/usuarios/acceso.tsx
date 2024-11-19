import { Button, Card, Checkbox, Flex, Form, Input } from "antd"
import { ControlProps } from "../../interfaces/globales"
import { useEffect, useState } from "react"
import { Login, Usuario } from "../../interfaces/entidades"
import { useForm } from "../../hooks/useForm"
import { useData } from "../../hooks/useData"
import { useIconos } from "../../hooks/useIconos"
import { useLocation, useNavigate } from "react-router-dom"

const AccesoForm = (props: Pick<ControlProps, "onChange">) => {

    const { onChange } = props
    const { contextUsuarios: { state: { procesando }, validar } } = useData()
    const { IconMail, IconLock, IconLoading } = useIconos()
    const { entidad: user } = useForm<Login>({ correo: '', clave: '', recuerdame: true })
    const [result, setResult] = useState({ ok: false, mensaje: '' })

    const onFinish = async (values: Login) => {

        const resp = await validar(values);

        if (!resp) {
            setResult({ ok: false, mensaje: 'No fue posible validar los datos del usuario' });
            return;
        } else if (!resp.ok && resp.mensaje) {
            setResult({ ok: resp.ok, mensaje: resp.mensaje });
            return;
        }

        onChange && onChange(resp.datos);

    };

    return (
        <Form
            name="formLogin"
            size="large"
            layout="vertical"
            autoComplete="off"
            style={{ width: '100%' }}
            initialValues={user}
            onFinish={onFinish}
        >
            <Form.Item
                name="correo"
                rules={[{ required: true, message: 'Obligatorio', }]}
                style={{ marginBottom: 36 }}
            >
                <Input
                    name="correo"
                    value={user.correo}
                    readOnly={procesando}
                    prefix={<IconMail style={{ fontSize: 18 }} />}
                    placeholder="coloque aqui el correo" />
            </Form.Item>
            <Form.Item
                name="clave"
                rules={[{ required: true, message: 'Obligatorio' }]}
                style={{ marginBottom: 8 }}
            >
                <Input
                    name="clave"
                    type="password"
                    value={user.clave}
                    readOnly={procesando}
                    prefix={<IconLock style={{ fontSize: 18 }} />}
                    placeholder="coloque aqui la clave" />
            </Form.Item>
            <Form.Item>
                <Flex justify="space-between" align="center">
                    <Form.Item name="recuerdame" valuePropName="checked" noStyle>
                        <Checkbox value={user.recuerdame}>Recuerdame</Checkbox>
                    </Form.Item>
                    <a href="">Recuperar Clave</a>
                </Flex>
            </Form.Item>
            <Form.Item>
                <Button block type="primary" shape="round" htmlType="submit" disabled={procesando}>
                    {
                        procesando
                            ?
                            <Flex gap={10}>
                                <IconLoading style={{ fontSize: 22 }} />
                                <span>Validando, espere...</span>
                            </Flex>
                            : <span>Iniciar Sesi&oacute;n</span>
                    }
                </Button>
            </Form.Item>
        </Form>
    )
}
export default AccesoForm