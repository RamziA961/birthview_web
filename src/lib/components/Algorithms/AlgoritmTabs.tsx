import { BoxProps, Paper, PaperProps, Tab, Tabs, TabsProps } from '@mui/material'
import { ReactElement, useState } from 'react' 
import { AlgorithmContainer, AlgorithmProps, LineOfCodeProps } from './Algorithms'


const AlgorithmTabs = (props: {
    paperProps?: PaperProps,
    tabsProps?: Omit<TabsProps, 'onChange'>,
    algoContainerProps?: BoxProps,
    children:  ReactElement<AlgorithmProps>[]
}) : ReactElement => {

    const {
        paperProps,
        tabsProps,
        algoContainerProps,
        children
    } = props 

    
    const labelChildMap = children.reduce((accum, child) => 
        ({...accum, [child.props.label]: child }),
    {}) as { [key: string] : ReactElement<AlgorithmProps> }

    const [activeTab, setActiveTab] = useState(Object.keys(labelChildMap)[0])

    return <Paper 
        variant='outlined' 
        sx={{ display: 'flex', flexDirection: 'column'}} 
        {...paperProps}
    >
            <Tabs
                variant="fullWidth"
                value = {activeTab}
                onChange = {(_, v) => setActiveTab(v)}
                {...tabsProps}
            >
            
            {Object.keys(labelChildMap).map(k => 
                <Tab key = {k} value = {k} label = {k}/>
            )}
            </Tabs> 
            
            <AlgorithmContainer px = {1} {...algoContainerProps}>
                {labelChildMap[(
                        activeTab in labelChildMap ? 
                            activeTab : Object.keys(labelChildMap)[0])
                ]}
            </AlgorithmContainer>

        </Paper>
}

export default AlgorithmTabs
