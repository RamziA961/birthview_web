import {Stack, StackProps} from '@mui/material'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {ReactElement, useEffect, useMemo, useReducer} from 'react'

import Header from '../components/Header'
import Overview from './Overview'
import Publications from './Publications'
import People from './People'
import TechnicalOverview from './TechnicalOverview'

import reducer from '../reducer/Reducer'
import {initialState} from '../reducer/AppState'

import useTimeSpentTotal from '../hooks/useTimeSpentTotal'
import useWebsiteHit from '../hooks/useWebsiteHit'

import '../../styles/App.css'

const defaultAppChildProps : StackProps = {
    px: 2,
    pt: 2,
    pb: 1,
    flexGrow: 1,
    overflow: 'auto'
}

function App (): ReactElement {
    const [state, dispatch] = useReducer(reducer, initialState())

    const childProps = {
        state: state,
        dispatch: dispatch,
        defaultProps: defaultAppChildProps
    }

    useWebsiteHit()
    useTimeSpentTotal()

    return <Stack
        m = {0}
        p = {0}
        width='100%'
        height='100%'
    >
    <BrowserRouter>
        <Header state = {state} dispatch = {dispatch}/>
        <Routes>
            <Route path='/' element={<Overview {...childProps}/>}/>
            <Route path='/technical' element={<TechnicalOverview {...childProps}/>}/>
            <Route path='/publications' element={<Publications {...childProps}/>}/>
            <Route path='/people' element = {<People {...childProps}/>}/>
            <Route path = '*' element={<Overview {...childProps}/>}/>
        </Routes>
    </BrowserRouter>
    </Stack>
}


export default App
