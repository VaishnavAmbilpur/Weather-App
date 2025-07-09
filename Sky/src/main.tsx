import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster} from 'sonner'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className=' min-h-screen min-w-screen'>
       <App />
       <Toaster></Toaster>
      </div>
  </StrictMode>,
)
