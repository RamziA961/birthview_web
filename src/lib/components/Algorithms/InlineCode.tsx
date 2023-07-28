import { Typography, TypographyProps, useTheme } from '@mui/material'


const InlineCode = (props: { children: string } & TypographyProps) => { 
    const { children, ...textProps } = props
    const theme = useTheme()
    return <Typography component='span' display='inline' fontFamily='monospace' fontWeight='bold' fontSize={theme.typography.fontSize} {...textProps}>
        { props.children }
    </Typography>
}


export default InlineCode
