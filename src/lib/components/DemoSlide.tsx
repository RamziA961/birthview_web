import {ReactElement} from 'react'
import {Card, CardContent, CardMedia, Stack, Typography} from '@mui/material'

type DemoSlideMetadata = {
    title: string,
    description: string,
    src: string
}

const DemoSlide = (props: {
    metadata : DemoSlideMetadata,
    imagePosition: 'left' | 'right'
}) : ReactElement => {
    const {metadata, imagePosition} = props

    return <Card sx={{ height:'100%' }} variant='outlined'>
        <Stack
            direction={imagePosition === 'right' ? 'row' :'row-reverse'}
            justifyContent='space-between'
            pb={1}
            pr={1}
            height={'100%'}
        >
            <CardContent
                component={Stack}
                gap = {2}
                flexGrow={1}
            >
                <Typography variant = 'h4' fontWeight={600} width='100%' height='20%'>
                    {metadata.title}
                </Typography>
                <Typography variant='subtitle1'>
                    {metadata.description}
                </Typography>
            </CardContent>

            <CardMedia
                component='img'
                image={metadata.src}
                alt={`${metadata.title}`}
                sx={{
                    maxHeight:'90%', 
                    width: '25%',
                    borderRadius: 1,
                    objectFit:'scale-down',
                    flexShrink:0,
                    my: 'auto'
                }}
            />
        </Stack>
    </Card>

}

export default DemoSlide
