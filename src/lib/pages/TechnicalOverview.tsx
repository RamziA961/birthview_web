import { Dispatch, ReactNode } from "react"
import { TAppState, TDispatchAction } from '../reducer/AppState'
import { Stack, StackProps } from "@mui/material"

import { usePageHit, useTimeSpent } from '../hooks/analytics.ts'

const TechnicalOverview = (props: {
    state: TAppState,
    dispatch: Dispatch<TDispatchAction>,
    defaultProps?: StackProps

}): ReactNode =>  {
    const { state, dispatch, defaultProps } = props 

    return <Stack {...defaultProps}>
    </Stack>

}

export default TechnicalOverview
