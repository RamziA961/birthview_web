import {TAppState, TDispatchAction} from '../reducer/AppState'
import {Dispatch, Fragment, ReactElement} from 'react'
import {Card, CardHeader, Chip, Divider, Stack, StackProps} from '@mui/material'

import Publication from '../components/Publication'
import publicationsInfo, { TPublication } from '../../assets/publications'

import useTimeSpent from '../hooks/useTimeSpent'
import usePageHit from '../hooks/usePageHit'

const Publications = (props: {
    state: TAppState,
    dispatch: Dispatch<TDispatchAction>,
    defaultProps?: StackProps
}) : ReactElement => {
    const { state, dispatch, defaultProps } = props
    
    usePageHit(state.activePage.path, state.activePage.title)
    useTimeSpent(state.activePage.path, state.activePage.title)

    const yearGrouped =  publicationsInfo
        .reduce((accum, pub) => {
            if (pub.year in accum)
                return {...accum, [pub.year]: [...accum[pub.year], {...pub}]}

            return {...accum, [pub.year]: [{...pub}]}
        }, {} as {[k: number] : TPublication[]})

    return <Stack
        {... defaultProps }
        gap = {2}
    >
        {Object.entries(yearGrouped)
            .sort(([a, ], [b]) => Number.parseInt(b) - Number.parseInt(a))
            .map(([year, pubs]) =>
            <Fragment key={year}>
                <Divider
                    orientation='horizontal'
                    variant='middle'
                >
                    <Chip label={year}/>
                </Divider>
                <Stack gap = {1}>
                    {pubs.map((pub) => <Publication key = {pub.title} publicationData = {pub}/>)}
                </Stack>
            </Fragment>

        )}

    </Stack>
}

export default Publications
