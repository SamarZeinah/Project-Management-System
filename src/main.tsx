import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthContextProvider from './context/AuthContext.tsx'
import { ProjectsContextProvider } from './context/ProjectsContext.tsx'
import { UsersContextProvider } from './context/UsersContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider>
      <UsersContextProvider>
    <App />
      </UsersContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
