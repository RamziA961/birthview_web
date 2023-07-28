import { ReactElement } from "react"
import Tex from "../../Tex"
import {Algorithm, AlgorithmProps, InlineCode, LineOfCode } from "../../Algorithms/Algorithms"
import { StackProps } from "@mui/material"

const AlgoOne = (props?: StackProps) : ReactElement<AlgorithmProps> => {
    return <Algorithm {...props} label = 'TLED Precomputation of Constants'>
        <LineOfCode lineNumber={1}> 
            Calculate element volumes according to <Tex>{'J = det\\left( \\frac{\\partial X}{\\partial e_c}\\right) = 6V_0'}</Tex>.
        </LineOfCode>
        <LineOfCode lineNumber={2} > 
            Calculate node masses from element volumes and material density. 
        </LineOfCode>
        <LineOfCode lineNumber={3} > 
            Calculate the matrix of shape density function derivatives <Tex>{'\\partial \\mathbf{h}'}</Tex> according to Eq. 10 and 
            store it in the global buffer <InlineCode>m_Dh</InlineCode>. 
        </LineOfCode>
        <LineOfCode lineNumber={4} >
            Calculate per element nodal indicies based on element connectivity and store it in <InlineCode>node_indicies</InlineCode>.
        </LineOfCode>
        <LineOfCode lineNumber={5} >
            Calculate the Verlet integration constants <Tex>{'A, B, C'}</Tex> (see Eq. 31) and store them in <InlineCode>m_ABC</InlineCode>.
        </LineOfCode>
    </Algorithm>
}

export default AlgoOne
