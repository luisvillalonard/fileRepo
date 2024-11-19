/* CSS */
import './App.css'

/* Imports */
import { useEffect } from 'react'
import { Layout } from 'antd'
import { useData } from './hooks/useData';
import { useComponents } from './components';
import LoginPage from './pages/login'

function App() {

  const { contextAuth: { state: { user }, getUser } } = useData()
  const { StyleProvider, HeaderApp, MenuApp, RutasApp } = useComponents()

  useEffect(() => {
    getUser();
  }, [])

  if (!user) {
    return <LoginPage />
  }

  return (
    <StyleProvider>
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <HeaderApp />
        <Layout>
          <MenuApp />
          <Layout className='body-content'>
            <RutasApp />
          </Layout>
        </Layout>
      </Layout>
    </StyleProvider>
  )
}

export default App
