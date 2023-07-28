import { Stack, StackProps, TypographyProps } from "@mui/material"
import { ReactElement } from "react"
import { LineOfCodeProps } from "./LineOfCode"

export type AlgorithmProps = {
    label: string
    stackProps?: StackProps
} & { children: ReactElement<LineOfCodeProps>[] }

const Algorithm = (props: AlgorithmProps) : ReactElement => {
    
    const { stackProps, children } = props

    return <Stack {...stackProps}>
        {...children}
    </Stack>
}

export default Algorithm
