import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './lib/pages/App'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/index.css'

import { ColorModeController } from "./lib/theme/theme.tsx";
import { CssBaseline } from '@mui/material'

import ReactGA from 'react-ga4'
import { MathJaxProvider } from 'react-hook-mathjax'

ReactGA.initialize('G-SQR68N8MP1')


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ColorModeController>
    <React.StrictMode>
    <CssBaseline>
    <MathJaxProvider>
        <App />
    </MathJaxProvider>
    </CssBaseline>
    </React.StrictMode>
    </ColorModeController>,
)
