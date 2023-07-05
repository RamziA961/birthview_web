import {TPublication} from '../pages/Publications.tsx'
import {ReactElement} from 'react'
import {
    Button, ButtonGroup,
    Card,
    CardContent,
    CardProps,
    Chip,
    Stack,
    Typography
} from '@mui/material'
import {Link, Mail, School} from '@mui/icons-material'

const Publication = (props: {
    publicationData: TPublication
} & CardProps): ReactElement => {
    const {publicationData, ...cardProps} = props

    return <Card
        {...cardProps}
    >
        <CardContent component={Stack} sx={{gap: 1}}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography
                    variant='overline'
                    fontSize={16}
                    letterSpacing={0.3}
                    lineHeight={1.25}
                    gutterBottom={false}
                >
                    {publicationData.title}
                </Typography>

                <Chip label = {publicationData.publicationType} variant='outlined' />
            </Stack>

            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='caption'>
                    {(publicationData.journal ? `${publicationData.journal} - `: '') + publicationData.publisher}
                </Typography>

                <Button
                    endIcon={<Link fontSize='small' />}
                    href={publicationData.url}
                    size='small'
                    target='_blank'
                    rel='noreferrer'
                    sx = {{borderRadius: 2, px: 1}}
                >
                    ACCESS
                </Button>

            </Stack>

            <Stack direction='row' gap={1} flexWrap='wrap'>
                {publicationData.authors.map((author, index) =>
                    <Stack direction='row' key={author.name} alignItems='center' gap ={0.3} flexWrap='nowrap'>
                        <Typography variant='subtitle2'>
                            {author.name}
                        </Typography>

                        {author.email || author.scholar ?
                            <ButtonGroup size='small' variant='outlined' sx={{ml: 0.5}}>
                                {author.email ?
                                    <Button
                                        href={new URL(`mailto:${author.email}`).href}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <Mail fontSize='inherit'/>
                                    </Button> : <></>
                                }
                                {author.scholar ?
                                    <Button
                                        href={author.scholar}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <School fontSize='inherit'/>
                                    </Button> : <></>
                                }
                            </ButtonGroup> : <></>
                        }

                        {index !== publicationData.authors.length - 1 ?
                            <Typography>,</Typography> : <></>
                        }
                    </Stack>
                )}
            </Stack>
        </CardContent>
    </Card>

}

export default Publication