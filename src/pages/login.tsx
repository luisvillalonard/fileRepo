import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Col, Divider, Flex, Layout } from "antd"
import { useData } from "../hooks/useData";
import { Usuario, UsuarioCambioClave } from "../interfaces/entidades"
import { useConstants } from "../hooks/useConstants";
import CambioClavePage from "./usuarios/cambio";
import AccesoForm from "./usuarios/acceso";

const LoginPage = () => {

    const { contextAuth: { LoggedIn } } = useData()
    const [user, setUser] = useState<UsuarioCambioClave | undefined>(undefined)
    const { Urls } = useConstants()
    const nav = useNavigate()

    const validaEstado = (user: Usuario) => {

        if (!user.cambio) {
            setUser({ id: user.id, passwordNew: '', passwordConfirm: '' })
            return;
        }

        LoggedIn(user)
        nav(Urls.Home, { replace: true })

    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Flex
                align="center"
                justify="center"
                style={{ height: '100%' }}>
                <Col xl={6} lg={8} md={10} sm={24} xs={24}>
                    <Card
                        style={{ position: 'relative' }}
                        styles={{
                            body: {
                                padding: 24
                            }
                        }}>
                        <p style={{ fontSize: 34, textAlign: 'center', margin: 0 }}>Gesti&oacute;n de Archivos</p>
                        <Divider style={{ marginTop: 20, marginBottom: 24 }} />
                        {
                            !user
                                ? <AccesoForm onChange={validaEstado} />
                                : <CambioClavePage item={user} />
                        }
                    </Card>
                </Col>
            </Flex>
        </Layout>
    )
}
export default LoginPage;
