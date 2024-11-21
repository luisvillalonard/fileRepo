import { useNavigate } from 'react-router-dom'
import { Menu, Layout, theme } from 'antd'
import type { MenuProps } from 'antd'
import { useData } from '../../hooks/useData'
import { useConstants } from '../../hooks/useConstants'
import { useIconos } from '../../hooks/useIconos'
import { useEffect, useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const MenuApp = () => {

    const { contextAuth: { state: { user, viewMenu } } } = useData()
    const { token: { colorBgContainer, colorPrimary } } = theme.useToken()
    const [items, setItems] = useState<MenuItem[] | undefined>(undefined)
    const navUrl = useNavigate()
    const { Urls } = useConstants()
    const { IconFile, IconUsers } = useIconos()
    const { Sider } = Layout
    const headerStyle: React.CSSProperties = {
        fontSize: 16,
        fontWeight: 'bolder',
    }
    const iconHeaderStyle: React.CSSProperties = {
        color: colorPrimary,
        margin: 0
    }

    const itemsMenu: MenuItem[] = [
        {
            key: Urls.Documentos.Base,
            label: <span style={headerStyle}>Documentos</span>,
            icon: <IconFile style={iconHeaderStyle} />,
        },
        {
            key: Urls.Usuarios,
            label: <span style={headerStyle}>Usuarios</span>,
            icon: <IconUsers style={iconHeaderStyle} />,
        },
    ]

    useEffect(() => {
        if (user && !items) {
            setItems(itemsMenu.filter(opt => {
                if (opt?.key === Urls.Usuarios && !user.esAdmin) {
                    return false
                }
                return true
            }))
        }
    }, [user])

    if (!user && !items) {
        return <></>
    }

    return (
        <Sider
            width={250}
            trigger={null}
            collapsible
            collapsed={!viewMenu}
            style={{ background: colorBgContainer, overflowY: 'auto' }}>
            <Menu
                mode='inline'
                items={items}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e) => navUrl(e.key, { replace: true })}
            />
        </Sider>
    )
}
export default MenuApp;
