import {TAppState, TDispatchAction} from '../reducer/AppState.ts'
import {Dispatch, ReactElement} from 'react'
import {Avatar, Box, Button, ButtonGroup, Card, Stack, StackProps, Typography, styled, useTheme} from '@mui/material'
import people from '../../assets/people.ts'
import {default as Grid} from '@mui/material/Unstable_Grid2'
import { Mail, School } from '@mui/icons-material'

import { usePageHit } from '../hooks/analytics.ts'

const People = (props: {
    state: TAppState,
    dispatch: Dispatch<TDispatchAction>,
    defaultProps?: StackProps
}) : ReactElement => {

    const { state, dispatch, defaultProps } = props
    const theme = useTheme()
   

    usePageHit(state.activePage.path, state.activePage.title)

    const sortedByName = people.sort((a, b) => a.name.localeCompare(b.name))


    return <Stack {...defaultProps} alignItems='center' mt = {3} gap ={2}>
       <Grid 
            width='100%'
            columns={{xs: 2, sm: 2, md: 10}}
            rowSpacing={2}
            columnSpacing={{xs: 1, sm: 2, md: 4}}
            container 
        >

            {sortedByName.map(person =>
                <Grid
                    key = {person.name} 
                    xs={1} sm={1} md={2}
                >
                    <Card
                        key = {person.name}
                        sx = {{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 1,
                        }}
                    >
                        <Box
                            width='100%'
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            bgcolor={theme.palette.secondary.light}
                        >
                        <PersonAvatar
                            srcSet = {`/people/${person.imageName ?? ''}`}
                            alt = {person.name}
                            variant='rounded'
                            sx={{
                                bgcolor: 'rgba(0,0,0,0)'
                            }}
                        >
                            {person.name
                                .split(' ')
                                .reduce((accum, v) => accum + v.charAt(0), '')
                            }
                        </PersonAvatar>
                        <ButtonGroup
                            color='secondary'
                            variant='contained'
                            orientation='horizontal'
                            size='medium'
                            fullWidth
                        >
                            <Button 
                                href={new URL(`mailto:${person.email}`).href}
                                target='_blank'
                                rel='noreferrer noopenner'
                                disabled={person.email == undefined}
                            >
                                <Mail fontSize='inherit' />
                            </Button>
                            <Button
                                href={person.scholar ? new URL(person.scholar).href : ''}
                                rel='noreferrer noopenner'
                                target='_blank'
                                disabled={person.scholar == undefined}
                            >
                                <School fontSize='inherit'/>
                            </Button>
                        </ButtonGroup>
                        </Box>

                        <Stack alignItems='center'>
                            <Typography variant='h6' align='center'>
                                {person.name}
                            </Typography>
                            
                            <Typography variant='caption' align='center'>
                                {person.affiliations?.join(', ')}
                            </Typography>
                        </Stack>

                    </Card>
                </Grid>
            )}
        </Grid>
    </Stack>
}


const PersonAvatar = styled(Avatar)(() => ({
    height: 150,
    width: 150,
    '& .MuiAvatar-img': {
        objectFit: 'contain'        
    }
}))



export default People
