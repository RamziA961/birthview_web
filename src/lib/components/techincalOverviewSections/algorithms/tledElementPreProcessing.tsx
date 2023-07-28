import { ReactElement } from 'react'
import { InlineCode, LineOfCode, Algorithm, AlgorithmProps } from '../../Algorithms/Algorithms'
import Tex from '../../Tex'
import { StackProps } from '@mui/material'


const AlgoTwo = (props?: StackProps): ReactElement<AlgorithmProps> => { 
    return <Algorithm {...props} label='TLED Element Processing'>
        <LineOfCode lineNumber={1}> 
            <b>for each</b> element in assembly <b>do</b>
        </LineOfCode>

        <LineOfCode  lineNumber={2} indentLevel={1}>
            Collect nodal displacements into <InlineCode>float[4][3]</InlineCode> using the per element nodal indicies list from <InlineCode>node_indicies</InlineCode>.
        </LineOfCode>

        <LineOfCode lineNumber={3} indentLevel={1}>
            Extract the shape function derivative matrix <Tex>{'\\partial \\mathbf{h}'}</Tex> from the global buffer <InlineCode>m_Dh</InlineCode>.
        </LineOfCode>

        <LineOfCode lineNumber={4} indentLevel={1}>
            Calculate <Tex>{'\\mathbf{F} = \\partial\\mathbf{h}u + \\mathbf{I}'}</Tex> using <Tex>{'u'}</Tex> and <Tex>{'\\partial\\mathbf{h}'}</Tex>. 
        </LineOfCode>

        <LineOfCode lineNumber={5} indentLevel={1}>
            Calculate the Right Cauchy-Green deformation tensor <Tex>{'\\mathbf{C}'}</Tex> from <Tex>
                {'\\mathbf{F}'}
            </Tex> <Tex>
                {'(\\mathbf{C} = \\mathbf{F}^\\mathrm{T} \\mathbf{F})'}
            </Tex>.
        </LineOfCode>
        
        <LineOfCode lineNumber={6} indentLevel={1}>
            Calculate the <Tex>{'S_{PK}'}</Tex> stree from <Tex>{'C, F'}</Tex> and the Lamè constants <Tex>{'(\\mu , \\lambda)'}</Tex>.
        </LineOfCode>
    
        <LineOfCode lineNumber={7} indentLevel={1}>
            Calculate the nodal force contribution matrix <Tex>{'f^e_{\\mathrm{FVM}}'}</Tex> using <Tex>{'S_{PK}'}</Tex> stress (Eq. 26 and Eq. 27). 
        </LineOfCode>

        <LineOfCode lineNumber={8} indentLevel={1}>
            Spread the values from <Tex>{'f^e_{\\mathrm{FVM}}'}</Tex> to the global buffer <InlineCode>Fx</InlineCode> using the nodal indicies <InlineCode>node_indicies</InlineCode>.
        </LineOfCode>
            
        <LineOfCode lineNumber={9} indentLevel={1}>
           Calculate the Von-Mises stress from the components of <Tex>{'S_{PK}'}</Tex> and store the value into the <InlineCode>m_VMS</InlineCode> buffer.
        </LineOfCode>
        
        <LineOfCode lineNumber={10}>
            <b>end for each</b>
        </LineOfCode>
    </Algorithm>
}

export default AlgoTwo
