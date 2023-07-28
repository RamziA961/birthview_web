import { Card, Skeleton, Stack } from "@mui/material"
import { ImgHTMLAttributes, ReactElement, useState } from "react"


const LabeledImage = (props: {
    maxWidth: string | number, 
    orientation?: 'horizontal' | 'vertical',  
    children: ReactElement | string
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'maxWidth'>) => {
    const { maxWidth, orientation, children, ...imageProps } = props
    
    const [loading, setLoading] = useState(true)

    return <Card
        variant='outlined'
        sx={{
            maxWidth: maxWidth,
            display:'inline-block',
        }}
    >
        <Stack 
            alignItems='center' 
            width='100%' 
            gap={0.5}
            direction={orientation === 'horizontal' ? 'row' : 'column'}
        >
        {loading ?
            <Skeleton width={ imageProps.width } variant='rectangular' animation='pulse'>
                <img onLoad={ () => setLoading(false) } {...imageProps}/>
            </Skeleton>
            :
            <img {...imageProps}/>
        }

            {children}
        </Stack>
    </Card>
}

export default LabeledImage
