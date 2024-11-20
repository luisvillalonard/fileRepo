import { Avatar, Button, Flex, Layout,  theme, Tooltip } from "antd"
import { useData } from "../../hooks/useData"
import { Confirmacion } from "../../hooks/useMensaje"
import { navUrl } from "../../hooks/useUtils"
import { useIconos } from "../../hooks/useIconos"
import { useConstants } from "../../hooks/useConstants"
import { useNavigate } from "react-router-dom"

const HeaderApp = () => {

  const { contextAuth: { state: { user }, getUser, showMenu, LoggedOut } } = useData()
  const { Header } = Layout
  const { token: { colorBgContainer, colorPrimary } } = theme.useToken()
  const { IconMenu, IconUser, IconLogout } = useIconos()
  const { Urls } = useConstants()
  const nav = useNavigate()
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    background: colorBgContainer,
    borderBottom: '1px solid gray'
  }

  return (
    <Header style={headerStyle}>
      <Flex align="center" style={{ width: '100%' }} justify="space-between">
        <Flex gap={10} align="center" style={{ height: '100%' }}>
          <Button type="link" style={{ fontSize: 24, fontWeight: 600, color: colorPrimary, padding: 0 }} onClick={() => nav(Urls.Home, { replace: true })}>Gest&oacute;n de Archivos</Button>
          <Button
            type="text"
            shape="circle"
            icon={<IconMenu style={{ fontSize: 22 }} />}
            onClick={showMenu}
          />
        </Flex>
        <Flex gap={16} align="center">
          <Flex align="center" gap={10}>
            <Avatar icon={<IconUser style={{ fontSize: 18 }} />} size={26} />
            <span>{`${user?.nombres} ${user?.apellidos}`.trim()}</span>
          </Flex>
          <Tooltip title="Salir de la aplicación">
            <Button
              type="text"
              shape="circle"
              icon={<IconLogout style={{ fontSize: 18 }} />}
              onClick={async () => {
                await Confirmacion('Esta seguro(a) que desea cerrar la sesión?')
                  .then((resp) => {
                    if (resp) {
                      LoggedOut();
                      getUser();
                      navUrl(`${Urls.Login}`);
                    }
                  })
              }}>
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Header>
  )
}
export default HeaderApp;
