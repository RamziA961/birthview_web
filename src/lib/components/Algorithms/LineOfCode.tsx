import { Stack, Typography, TypographyProps } from "@mui/material"
import { ReactElement, ReactNode } from "react"

export type LineOfCodeProps = {
    lineNumber: number, 
    indentLevel?: number,
    indentSize?: number
} & TypographyProps & { children: NonNullable<ReactNode> }


const LineOfCode = (props: LineOfCodeProps): ReactElement => {
    const {
        lineNumber,
        indentLevel,
        indentSize,
        children,
         ...typographyProps
    } = props
    
    let inSize = props.indentSize ?? 6
    const inLevel = props.indentLevel ?? 0
    
    inSize = lineNumber.toString().length > 1 ? inSize - 1 : inSize 

    return <Stack gap = {inSize * (inLevel + 1)} direction='row'>
        <b>{props.lineNumber}.</b>
        <Typography fontFamily='monospace' {...typographyProps}>
             { children }
        </Typography>
    </Stack>

}

export default LineOfCode
