import { ReactElement } from "react";
import { Algorithm, AlgorithmProps, LineOfCode } from "../../Algorithms/Algorithms";
import Tex from "../../Tex";
import { StackProps } from "@mui/material";


const AlgoFour = (props?: StackProps) : ReactElement<AlgorithmProps> => {

    return <Algorithm {...props} label = 'Projection Based Contact'>
        <LineOfCode lineNumber = {1}>
            Retrieve the previous and current node positions <Tex>{'\\mathbf{p}_{t-h}'}</Tex> and <Tex>{'\\mathbf{p}_t'}</Tex> and the 
            plane equation of the master surface to derive <Tex>{'\\mathbf{n}'}</Tex> and the arbitrary point on the plane <Tex>{'\\mathbf{p}_o'}</Tex>.
        </LineOfCode>

        <LineOfCode lineNumber = {2}>
            Calculate the gap <Tex>{'d_t'}</Tex> according to equation Eq. 21.
        </LineOfCode>

        <LineOfCode lineNumber = {3}>
            Find node penetration <Tex>{'\\mathbf{p}_p'}</Tex> according to Eq. 22.
        </LineOfCode>
    </Algorithm>
}

export default AlgoFour
