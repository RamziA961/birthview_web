import { createTheme, ThemeProvider } from '@mui/material'
import * as colors from '@mui/material/colors'
import { createContext, useMemo, useState, ReactNode } from 'react' 


export const ColorModeControlContext = createContext({
    toggleColorMode: () => {}
})


export function ColorModeController(props: { children: ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>(
        localStorage.getItem('colorMode') === 'dark' ? 'dark' : 'light'
    )

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => {
                const mode = (prevMode === 'light' ? 'dark' : 'light')
                localStorage.setItem('colorMode', mode)
                return mode
            })
        }
    }), [])

    const theme = useMemo(
        () => createTheme({
            palette: {
                mode : mode,
                secondary: mode === 'dark' ? {
                    main: colors.grey[400],
                    light: colors.grey[300],
                    dark: colors.grey[500],
                    contrastText: colors.common.black
                } : {
                    main: colors.grey[800],
                    light: colors.grey[700],
                    dark: colors.grey[900],
                    contrastText: colors.common.white
                },
                action: {
                    disabled: mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'
                }
            },
            
        }), 
        [mode]
    )
    
    return <ColorModeControlContext.Provider value={colorMode}>
        <ThemeProvider theme = {theme}>
            {props.children}
        </ThemeProvider>
    </ColorModeControlContext.Provider>
}
