import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography, useTheme } from "@mui/material";
import { ReactElement } from "react";



const References = (props: {
    referenceList: string[]
}) : ReactElement => {
    const theme = useTheme()
    
    return <Accordion elevation={4} disableGutters>
        <AccordionSummary
            expandIcon = {<ExpandMore/>}
            sx={{bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[200]}}
        >
            <Typography variant='button'> References </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white}}>
            <Stack gap={0.5} alignItems='flex-start' my={0.2}>
                {props.referenceList
                    .sort((a, b) => a.localeCompare(b))
                    .map((ref, i) => 
                        <Stack key={i} direction='row' alignItems='flex-start' gap = {0.5}>
                            <Typography>{(i + 1).toString().padStart(2, '0')}.</Typography>
                            <Typography> {ref} </Typography>
                        </Stack>
                    ) 
                }
            </Stack>
        </AccordionDetails>
    </Accordion>
}

export default References
