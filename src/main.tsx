import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ContextsProvidersTree } from './hooks/useData.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <ContextsProvidersTree>
      <App />
    </ContextsProvidersTree>
  </BrowserRouter>,
)
