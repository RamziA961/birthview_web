import {AppBar, Button, Stack, Typography, useTheme} from '@mui/material'
import {Link} from 'react-router-dom'
import {Dispatch, ReactElement} from 'react'

import ColorModeSwitch from './ColorModeSwitch.tsx'

import {TAppState, TDispatchAction} from '../reducer/AppState.ts'
import {DispatchAction} from '../reducer/Reducer.ts'

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
                <Typography
                    variant='h6'
                    noWrap
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <Link to ='/'> BirthView </Link>
                </Typography>
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
                    <Link key={v.path} to={v.path}>
                        <Button
                            variant = 'contained'
                            color = {state.activePage.path === v.path ? 'secondary' : 'primary' }
                            onClick = {
                                () => dispatch(DispatchAction('setActivePage', {
                                    'activePage': v
                                }))
                            }
                        >
                            {v.title}
                        </Button>
                    </Link>
                )
            }
            <ColorModeSwitch/>
        </Stack>
    </Stack>
    </AppBar>
}

export default Header
