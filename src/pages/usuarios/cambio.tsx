import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Form, Input, Flex, Alert } from "antd"
import { useData } from "../../hooks/useData";
import { UsuarioCambioClave } from "../../interfaces/entidades"
import { ControlProps } from "../../interfaces/globales"
import { useIconos } from "../../hooks/useIconos"
import { useForm } from "../../hooks/useForm"
import { useConstants } from "../../hooks/useConstants";

const CambioClavePage = (props: Pick<ControlProps, "item">) => {

    const { item } = props
    const {
        contextUsuarios: { state: { procesando }, cambiarClave },
        contextAuth: { LoggedIn },
    } = useData()
    const { IconUser, IconLock, IconLoading } = useIconos()
    const { Urls } = useConstants()
    const { entidad: user, editar, handleChangeInput } = useForm<UsuarioCambioClave | undefined>(item)
    const [result, setResult] = useState({ ok: true, mensaje: '' })
    const nav = useNavigate()
    const url = useLocation()

    const onFinish = async () => {

        if (!user) return;

        const resp = await cambiarClave(user);

        if (!resp) {
            setResult({ ok: false, mensaje: 'No fue posible realizar el cambio de clave del usuario' });
            return;
        } else if (!resp.ok && resp.mensaje) {
            setResult({ ok: resp.ok, mensaje: resp.mensaje });
            return;
        }

        if (resp.datos) {
            LoggedIn(resp.datos)
            if (url.pathname === Urls.Home || url.pathname === Urls.Login) {
                nav(Urls.Home, { replace: true })
            } else {
                nav(url.pathname, { replace: true })
            }
        }

    };

    useEffect(() => { editar(item) }, [item])

    if (!user) {
        return <></>
    }

    return (
        <Form
            name="formCambio"
            size="large"
            layout="vertical"
            autoComplete="off"
            style={{ width: '100%' }}
            initialValues={user}
            onFinish={onFinish}
        >
            {
                !result.ok
                    ? <Alert type="warning" showIcon message={result.mensaje} style={{ marginBottom: 30 }} />
                    : <></>
            }
            <Form.Item
                name="passwordNew"
                rules={[{ required: true, message: 'Obligatorio', }]}
            >
                <Input.Password
                    name="passwordNew"
                    value={user.passwordNew}
                    readOnly={procesando}
                    prefix={<IconUser style={{ fontSize: 18 }} />}
                    placeholder="escriba la nueva clave"
                    onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item
                name="passwordConfirm"
                dependencies={['passwordNew']}
                hasFeedback
                rules={[
                    { required: true, message: 'Obligatorio', },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('passwordNew') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Esta clave debe ser igual a la nueva clave'));
                        },
                    }),
                ]}
                style={{ marginBottom: 24 }}
            >
                <Input.Password
                    name="passwordConfirm"
                    type="password"
                    value={user.passwordConfirm}
                    readOnly={procesando}
                    prefix={<IconLock style={{ fontSize: 18 }} />}
                    placeholder="repita la nueva clave"
                    onChange={handleChangeInput} />
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
                            : <span>Cambiar Clave</span>
                    }
                </Button>
            </Form.Item>
        </Form>
    )
}
export default CambioClavePage;
