import { BoxProps, Box} from "@mui/material"
import { ReactElement, ReactNode } from "react" 


const AlgorithmContainer = (props: { children : ReactNode } & BoxProps) : ReactElement => {
    const {children, ...boxProps} = props
    return <Box maxHeight='40vh' sx={{overflowY: 'auto', overflowX:'hidden'}} py = {0.5} {...boxProps}>
        { children }
    </Box>
} 


export default AlgorithmContainer
