import {TAppState, TDispatchAction} from '../reducer/AppState'
import {Dispatch, Fragment, ReactElement} from 'react'
import {Chip, Divider, Stack, StackProps} from '@mui/material'

import Publication from '../components/Publication'
import publicationsInfo, { TPublication, TPublicationAndAuthors } from '../../assets/publications'


import { usePageHit } from '../hooks/analytics.ts'
import people, { TPerson } from '../../assets/people.ts'

const Publications = (props: {
    state: TAppState,
    dispatch: Dispatch<TDispatchAction>,
    defaultProps?: StackProps
}) : ReactElement => {
    const { state, dispatch, defaultProps } = props
    
    usePageHit(state.activePage.path, state.activePage.title)

    const peopleMap = people.reduce((accum, person) => 
        ({[person.name]: {...person}, ...accum }),  {} as { [k: string]: TPerson }
    )

    const yearGrouped = publicationsInfo
        .map(curr => ({
                ...curr, 
                'authors': curr.authors.map((author) => peopleMap[author] ?? { name : author }) 
        }))
        .reduce((accum, pub) => {
            if (pub.year in accum)
                return {...accum, [pub.year]: [...accum[pub.year], {...pub}]}

            return {...accum, [pub.year]: [{...pub}]}
        }, {} as {[k: number] : TPublicationAndAuthors[]})
    
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
