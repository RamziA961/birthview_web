import {AppBar, Button, Stack, Typography, useTheme} from '@mui/material'
import {Dispatch, ReactElement} from 'react'

import ColorModeSwitch from './ColorModeSwitch.tsx'
import LocalLink from './LocalLink.tsx'

import {TAppState, TDispatchAction} from '../reducer/AppState.ts'
import routeInfo from '../../assets/routes.ts'

const Header = (props: {
    state: TAppState,
    dispatch: Dispatch<TDispatchAction>
}) : ReactElement => {
    const { state, dispatch } = props
    const theme = useTheme()

    return <AppBar color='default' position = 'relative'>
        <Stack direction='row' justifyContent='space-between' my = {1} mx={0.5} alignItems='center'>
            <Stack
                ml = { 0.5 }
                direction='row'
                gap = {1.5}
                alignItems = 'center'

            >
                <LocalLink dispatch={dispatch} to='/'>
                    <Typography
                        color={theme.palette.text.primary}
                        variant='h6'
                        noWrap
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}
                    >
                       BirthView 
                    </Typography>
                </LocalLink>
                <img
                    src='/logo.png'
                    alt='Birthview logo'
                    style={{
                        height: '2rem',
                        objectFit: 'contain',
                        transform: 'rotate(30deg)',
                        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)'
                    }}
                />
            </Stack>

        <Stack
            direction="row"
            gap = {1}
        >
            {Object.values(routeInfo)
                .sort((a, b) => a.position - b.position)
                .map(v =>
                    <LocalLink key={v.path} to={v.path} dispatch={dispatch}>
                        <Button
                            variant = 'contained'
                            color = {state.activePage.path === v.path ? 'secondary' : 'primary' }
                        >
                            {v.title}
                        </Button>
                    </LocalLink>
                )
            }
            <ColorModeSwitch/>
        </Stack>
    </Stack>
    </AppBar>
}


export default Header
