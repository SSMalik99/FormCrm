import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthUserContextProvider from './Provider/AuthUserContext.tsx'
import { Provider } from 'react-redux'
import store from './store/Store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <AuthUserContextProvider>
      <App />
    </AuthUserContextProvider>
    </Provider>
  </StrictMode>,
)
