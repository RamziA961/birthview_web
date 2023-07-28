import { Stack, StackProps } from "@mui/material";
import { ReactElement } from "react";
import { Algorithm, AlgorithmProps, InlineCode, LineOfCode } from "../../Algorithms/Algorithms";



const AlgoThree = (props?: StackProps) : ReactElement<AlgorithmProps> => {

    return <Algorithm {...props} label = 'Nodal Processing'>
        <LineOfCode lineNumber={1}>
            <b>for each</b> node in assembly <b>do</b>
        </LineOfCode>
        
        <LineOfCode lineNumber={2} indentLevel={1}>
           Sum the total internal nodal forces from individual element contributions. 
        </LineOfCode>
        
        <LineOfCode lineNumber={3} indentLevel={1}>
            Calculate the next displacement of the node, using the precomputed values stored in <InlineCode>m_ABC</InlineCode> and it in a buffer <InlineCode>m_U_new</InlineCode> (Eq. 30).
        </LineOfCode>
        
        <LineOfCode lineNumber={4} indentLevel={1}>
            Apply the boundary conditions (see Projection Based Contact Algorithm) for nodal displacements and add current external contact loads into the 
            external force vector <InlineCode>R</InlineCode>.
        </LineOfCode>

        <LineOfCode lineNumber={5} indentLevel={0}>
            <b>end for each</b>
        </LineOfCode>

    </Algorithm>
}

export default AlgoThree
