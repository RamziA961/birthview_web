import { Dispatch, ReactNode } from "react"
import { TAppState, TDispatchAction } from '../reducer/AppState'
import { Button, Card, CardProps, Stack, StackProps, Typography, TypographyProps } from "@mui/material"

import { usePageHit } from '../hooks/analytics.ts'
import LocalLink from "../components/LocalLink.tsx"
import { KeyboardArrowRight } from "@mui/icons-material"
import FiniteElementMeshes from "../components/techincalOverviewSections/FiniteElementMeshes.tsx"
import TLED from "../components/techincalOverviewSections/TLED.tsx"
import ContactMethod from "../components/techincalOverviewSections/ContactMethod.tsx"
import NeckModel from "../components/techincalOverviewSections/NeckModel.tsx"
import Implementation from "../components/techincalOverviewSections/Implementation.tsx"

const cardProps : CardProps = {
    sx: {
        p: 1,
        flexShrink: 0
    }
}

const titleProps : TypographyProps = {
    fontWeight: 600,
    variant: 'h4'
}

const subHeaderProps : TypographyProps = {
    fontWeight: 400,
    variant: 'h5'
}

const TechnicalOverview = (props: {
    state: TAppState,
    dispatch: Dispatch<TDispatchAction>,
    defaultProps?: StackProps

}): ReactNode =>  {
    const { state, dispatch, defaultProps } = props 

    usePageHit(state.activePage.path, state.activePage.title)

    return <Stack {...defaultProps} gap={3} >

        <Card {...cardProps}>
            <Stack gap = {1}>
                <Typography {...titleProps}>
                    A Technical Introduction to BirthView
                </Typography>
                <Typography>
                    BirthView is an advanced computer-based childbirth simulator developed with the aim of 
                    providing a realistic and immersive virtual experience of the physiological process of childbirth.
                    Designed by a team of experts in the field of computer science and obstetrics,
                    BirthView offers a comprehensive and state-of-the-art representation of the intricate 
                    interactions between the fetus, maternal anatomy, and the birthing process.
                    This technical overview aims to provide a comprehensive understanding of the BirthView simulator, 
                    its underlying technologies, and the methodologies employed for modeling and simulating childbirth 
                    scenarios. It will delve into the key features, algorithms, and simulation techniques utilized 
                    in BirthView.
                </Typography>
                <Typography>
                    Through a combination of mathematical models, 3D graphics, and interactive user 
                    interfaces, BirthView allows users to visualize and analyze the dynamic processes occurring during 
                    childbirth. From the start of second stage of labor to the delivery of the baby, the simulator 
                    provides a unique opportunity to explore different scenarios, understand the mechanics of the 
                    birthing process, and gain insights into potential complications or challenges that may arise.
                </Typography>
                <Typography>
                    Details of the underlying mathematical models and algorithms employed in BirthView, including 
                    the Total Lagrangian Explicit Dynamics (TLED) variation of the finite element (FE) method for 
                    soft tissue deformation, the Partial Dirichlet-Neumann (pDN) contact method for modeling mechanical 
                    interactions, and other relevant computational techniques are discussed here.
                </Typography>
                <Stack direction='row' alignItems='center' gap={1} mt={2}>
                    <Typography>
                        For a more in depth explanation, refer to: 
                    </Typography>
                    <LocalLink to = '/publications' dispatch={dispatch}>
                        <Button 
                            sx = {{ px: 1, py: 0.1}}
                            variant='outlined' 
                            size='small' 
                            startIcon={ <KeyboardArrowRight fontSize='inherit' />}
                        > 
                            publications 
                        </Button>
                    </LocalLink>
                </Stack>
            </Stack>
        </Card>
        
        <Card {...cardProps}>
            <FiniteElementMeshes titleProps={titleProps} subHeaderProps={subHeaderProps}/>
        </Card>

        <Card {...cardProps}>
            <TLED titleProps={titleProps} subHeaderProps={subHeaderProps}/>
        </Card>

        <Card {...cardProps}> 
            <NeckModel titleProps={titleProps} subHeaderProps={subHeaderProps}/>
        </Card>

        <Card {...cardProps}>
            <ContactMethod titleProps={titleProps} subHeaderProps={subHeaderProps}/>
        </Card>

        <Card {...cardProps}>
            <Implementation titleProps={titleProps} subHeaderProps={subHeaderProps}/>
        </Card>
    </Stack>

}

export default TechnicalOverview
