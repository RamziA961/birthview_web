import { Dispatch, ReactElement} from 'react'
import { TAppState, TDispatchAction } from '../reducer/AppState'
import {Card, CardMedia, CardProps, Stack, StackProps, Typography, TypographyProps, useTheme} from '@mui/material'

import Carousel from 'react-material-ui-carousel'
import DemoSlide from '../components/DemoSlide'
import demoSlides from '../../assets/overview_demo'

import { usePageHit } from '../hooks/analytics'

const cardProps : CardProps = {
    sx: {
        padding: 1,
        flexShrink: 0
    }
}

const titleProps : TypographyProps = {
    fontWeight: 600,
    variant: 'h4'
}

const Overview = (props: {
    state: TAppState,
    dispatch: Dispatch<TDispatchAction>,
    defaultProps?: StackProps
}) : ReactElement => {
    const { state, dispatch, defaultProps } = props
    const theme = useTheme()
    
    usePageHit(state.activePage.path, state.activePage.title)

    return <Stack
        {...defaultProps}
         gap = {3}
    >
        <Card {...cardProps}>
            <Stack gap = {1}>
                <Typography {...titleProps}>
                    Introducing BirthView
                </Typography>
                <Typography>
                    BirthView is an advanced computer-based childbirth simulator created by members of the School 
                    of Computing Science at the University of East Anglia. It specifically focuses on modeling the 
                    second stage of labor with great accuracy.
                </Typography>
                <Typography>
                    What sets BirthView apart from other software is its ability to simulate the intricate physical 
                    interactions between a baby and a mother's reproductive organs. By incorporating various adjustable
                    parameters related to the mother and baby, BirthView has the capability to simulate different
                    childbirth scenarios and offer valuable insights into their potential outcomes.
                </Typography>
                <Typography>
                    The primary objective behind the development of this simulator was to predict and assess both 
                    normal and abnormal childbirth outcomes for individual cases. By utilizing BirthView, healthcare
                    professionals and prospects can gain valuable predictive information and better understand the potential risks
                    and complications associated with specific childbirth situations. This knowledge empowers them 
                    to make informed decisions and improve the overall safety and care provided during the birthing process.
                </Typography>
            </Stack>
        </Card>

        <Carousel
            animation='fade'
            duration={1000}
            interval={10000}
            sx = {{overflowY: 'visible', flexShrink: 0, minHeight: 'max-content', height: 'unset'}}
            height={'50vh'}
            swipe={false}
        >
            {demoSlides
                .map((metadata, i) =>
                    <DemoSlide key={i} metadata={metadata} imagePosition={'right'} />
                )
            }
        </Carousel>


        <Card {...cardProps}>
            <Stack gap = {3}>
                <Typography {...titleProps}>
                    Future Work
                </Typography>
                <Typography>
                    Birthview is
                </Typography>
            </Stack>
        </Card>

        <Card {...cardProps}>
            <Stack gap = {1}>
                <Typography  {...titleProps}>
                    Video Demonstration
                </Typography>
                <CardMedia
                     component='video'
                     src='/demoVideo.mp4'
                     sx={{height: '70vh', bgcolor: theme.palette.common.black}}
                     controls
                />
            </Stack>
        </Card>
       
    </Stack>
}

export default Overview
