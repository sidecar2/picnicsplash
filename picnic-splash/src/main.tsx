import React from 'react'
import ReactDOM from 'react-dom/client'
import { SplashPage } from './SplashPage.tsx'
import './custom-fonts.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SplashPage />
  </React.StrictMode>,
)
