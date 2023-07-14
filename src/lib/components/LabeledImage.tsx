import { Card, Stack } from "@mui/material"
import { ImgHTMLAttributes, ReactElement } from "react"


const LabeledImage = (props: {
    maxWidth: string | number, 
    children: ReactElement | string
} & ImgHTMLAttributes<HTMLImageElement>) => {
    const { maxWidth, children, ...imageProps } = props
    return <Card
        variant='outlined'
        sx={{
            maxWidth: maxWidth,
            display:'inline-block',
        }}
    >
        <Stack alignItems='center' width='100%' gap={0.5}>
            <img {...imageProps}/>
            {children}
        </Stack>
    </Card>
}

export default LabeledImage
