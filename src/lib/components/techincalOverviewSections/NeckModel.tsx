import { Divider, Stack, Typography, TypographyProps } from "@mui/material";
import { ReactElement } from "react";
import Tex from "../Tex";
import References from "../References";
import { DataGrid, GridColDef, GridToolbar, GridValueFormatterParams } from "@mui/x-data-grid";
import LabeledImage from "../LabeledImage";



const NeckModel = (props: {
    titleProps: TypographyProps,
    subHeaderProps: TypographyProps
}): ReactElement => {
    const  {titleProps, subHeaderProps} = props
    
    const referenceList = [
        'Duncan, J.M., 1874. Laboratory note: on the tensile strength of the fresh adult foetus. British medical journal, 2(729), p.763.',
        'Sadulaev, S.M. (2019). Towards increase realism of a computer simulation of human childbirth. Ph. D. Thesis. University of East Anglia.',
        'Autodesk Maya (2023). Six Degrees-of-Freedom. [Online image] https://autodesk.com. Available at: https://help.autodesk.com/view/MAYAUL/2023/ENU/?guid=GUID-CDB3638D-23AF-49EF-8EF6-53081EE4D39D.',
        'Hoag, D., 1963. Apollo guidance and navigation: Considerations of apollo imu gimbal lock. Canbridge: MIT Instrumentation Laboratory, pp.1-64.'
    ]

    return <Stack gap={1}>  
        <Typography {...titleProps}> 
            Fetal Neck Model
        </Typography>
        <Typography>
            Due to the complexity involved in creating a FEM for the fetal neck and spine, BirthView
            utilizes a simplified approach by incorporating a linear and torsional spring model to 
            simulate the behavior of the neck during the second stage of labor.
        </Typography>

        <Typography>
            Bushing elements are commonly employed to simulate the behavior of intervertebral discs. 
            They restrict both translation and rotation of two rigid bodies along the x, y, and z
            axes by applying restraining forces and torques, respectively.
            The implemented bushing element incorporates four 
            spring-damper systems: one for translation and three for rotation.
            Translational forces are calculated by specifying the translational stiffness and 
            the initial (resting) length between the rigid bodies. When the first rigid body undergoes
            translation relative to the second body in any direction, a force is computed to restrict 
            the motion and maintain their connection, following the translational form of Hooke's law.
        </Typography>
        
        <Stack alignItems='center'>
            <LabeledImage
                orientation="horizontal"
                src='/neck_model/bushing_element.png'
                maxWidth='70%'
                width='100%'
                style={{objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Bushing element representing six degrees-of-freedom springs (Autodesk Maya, 2023). 
                    The straight green, red, and blue arrows represent translations along the 
                    y axis, x axis, and z axis, respectively. The curved arrows depict rotations around the 
                    respective axes. The linear and torsional springs are implemented to provide resistance 
                    against motion along and around each axis.  
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
            Similarly, three rotational stiffness values and maximum angles for each axis are utilized to 
            determine the torques exerted by the rotational springs around each axis (x, y, and z). 
            These rotational springs start resisting motion only when the angle between the rigid bodies
            exceeds the specified maximum angle, below which the spring remains inactive. 
            The torque is computed according to the angular form of Hooke's law.
        </Typography>
        
        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />
        
        <Typography {...subHeaderProps}>
            Tensile Compressive Spring
        </Typography>
        
        
        <Stack alignItems='center'>
            <LabeledImage
                src='/neck_model/tensile_spring.png'
                maxWidth='30%'
                width='100%'
                style={{objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Detailed depiction of a single tensile/compressive spring attachment 
                    within the bushing element (Sadulaev 2019).
                </Typography>
            </LabeledImage>
        </Stack>


        <Typography>
            In the provided figure, the calculation of spring displacements in the simulation software 
            is illustrated when objects are connected by either a tensile or a compressive spring.
            The attachment points, denoted 
            as <Tex>{'\\overrightarrow{A^\\prime_1}'}</Tex> and <Tex>{'\\overrightarrow{A^\\prime_2}'}</Tex>,
            are defined in the local coordinates of the connected objects, with a resting length 
            of <Tex>{'L_r'}</Tex>. To determine the current length of the spring <Tex>{'L_s'}</Tex>,
            the attachment points are transformed into world 
            coordinates <Tex>{'\\overrightarrow{A_1}'}</Tex> and <Tex>{'\\overrightarrow{A_2}'}</Tex> using
            the corresponding objects' transformation matrices. <Tex>{'L_s'}</Tex> is then obtained as 
            the difference between <Tex>{'\\overrightarrow{A_2} - \\overrightarrow{A_1}'}</Tex>.
            Finally, the spring displacement <Tex>{'x = L_s - L_r'}</Tex>. 
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />
        
        <Typography {...subHeaderProps}>
            Torsional Spring
        </Typography>

        <Typography>
            Torsion springs have been implemented to approximate the overall resistance of the 
            vertebral column to side rotations. The torque exerted by these torsion springs 
            on the bodies is calculated based on the angular form of Hooke's law:
        </Typography>

        <Stack alignItems='center'>
            <Typography textAlign='center'>
                [18]: <Tex>{'\\tau = -k\\theta'}</Tex>
            </Typography>
            <Typography>
                where <Tex>{'\\tau'}</Tex> - torque, <Tex>{'k'}</Tex> torsion 
                coefficient, <Tex>{'\\theta'}</Tex> - angle of twist from an object's equilibrium position.
            </Typography>
        </Stack>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />
        
        <Typography {...subHeaderProps}>
            Restricting Rotaional Motion Around an Axis
        </Typography>

        <Typography>
            By constraining the other rotational degrees of freedom and allowing only one rotational degree of freedom,
            it becomes easier to calculate the angle between two rigid bodies. 
            The figures below illustrate the calculation of the angle for lateral bending of a skull,
            specifically around the 
            Z axis. <Tex>{'\\overrightarrow{X^\\prime_1}'}</Tex> and <Tex>{'\\overrightarrow{X^\\prime_2}'}</Tex> represent
            the local <Tex>{'X'}</Tex> unit vectors along the X axis of the head and body, respectively.
            The angle between these local unit vectors is computed using both the algebraic and geometric definitions 
            of the dot product.
        </Typography>

        <Stack direction={'row'} justifyContent='space-evenly'>
            <LabeledImage
                src='/neck_model/normal_pos.png'
                maxWidth='25%'
                width='100%'
                style={{objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Front view of the head in its normal position, with rotation occurring around the Z axis (Sadulaev 2019).
                </Typography>
            </LabeledImage>
            <LabeledImage
                src='/neck_model/flexed_pos.png'
                maxWidth='25%'
                width='100%'
                style={{objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Front view of the head with lateral flexion, where the rotation is around the Z axis (Sadulaev 2019).
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
            In cases where all three rotational degrees of freedom are available, it is possible for 
            the object to rotate around the Y axis before rotating around the Z axis.
            The following figures depict the top and front views of a head and torso.
            In these figures
            , <Tex>{'\\overrightarrow{X^\\prime_1}'}</Tex> and <Tex>{'\\overrightarrow{X^\\prime_2}'}</Tex> represent 
            unit vectors along the local X axis, 
            while <Tex>{'\\overrightarrow{Z^\\prime_1}'}</Tex> and <Tex>{'\\overrightarrow{Z^\\prime_2}'}</Tex> represent 
            unit vectors along the local Z axis of the head and body, respectively.
        </Typography>
        
        <Stack direction={'row'} justifyContent='space-evenly'>
            <LabeledImage
                src='/neck_model/head_normal.png'
                maxWidth='25%'
                width='100%'
                style={{objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Front view of the head in its normal position. Rotation occurs around the Z axis (Sadulaev 2019).
                </Typography>
            </LabeledImage>
            <LabeledImage
                src='/neck_model/head_rotated.png'
                maxWidth='25%'
                width='100%'
                style={{objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Top view of the head showing rotation around the Y axis (Sadulaev 2019).
                </Typography>
            </LabeledImage>
        </Stack>
        
        <Typography>
            In the first figure, the head is rotated by 45 degrees.
            Although the second figure does not show side bending, the 45-degree angle of rotation is 
            used to calculate torques between the head and torso in both the axial and coronal planes
            (rotation and side bending). To isolate side bending from rotation, an additional step is required.
            In this case, the head's local <Tex>{'\\overrightarrow{X_1}'}</Tex> vector 
            is projected onto the torso's local <Tex>{'\\overrightarrow{X_2}'}</Tex> vector 
            before calculating the angle between these vectors. This projection effectively eliminates the 
            contribution of angles around other axes to the torque calculation in side bending. 
            The projection is calculated using a dot product.
        </Typography>

        <Typography>
            While the projection technique is effective in isolating motion around a specific axis,
            it is important to note the possibility of encountering a Gimbal lock (Hoag, 1963).
            This occurs when the head is rotated by 90 degrees while the torso remains at 0 degrees,
            resulting in the loss of one degree of freedom. As a result, the projection may yield a zero value,
            leading to potential limitations or inaccuracies in the calculations.
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            Stiffness Values
        </Typography>

        <Typography>
            This model employs a spring constraint with six degrees of freedom and utilizes stiffness values 
            obtained 
            from various datasets, as documented in Sadulaev (2019). To combine the stiffness values 
            from these datasets, the mean stiffness is calculated. The following equation illustrates 
            the computation of the combined equivalent stiffness for the six cervical spine segments 
            (represented as springs in series):
        </Typography>
        
        <Typography textAlign='center'>
            [19]: <Tex>{
                '\\frac{1}{k_{eq}} = \\frac{1}{k_{1}} + \\frac{1}{k_{2}} + \\frac{1}{k_{3}} +' + 
                '\\frac{1}{k_{4}} + \\frac{1}{k_{5}} +\\frac{1}{k_{6}}'
            }</Tex>
        </Typography>

        <Typography>
            The acquired stiffness values are approximations and may require adjustment during the simulation.
            Based on the findings of Duncan (1874), it is noted that the tensile stiffness of newborns'
            necks, including muscles, is approximately twice as great as the stiffness of ligaments and 
            intervertebral discs. Therefore, it is assumed that the initially approximated stiffness values 
            may need to be increased based on the observed behavior of the neck during the simulation.
            This adjustment allows for a more realistic representation of the neck's mechanical properties.
        </Typography>

        
        <StiffnessTable/>

        <References referenceList={referenceList}/>
    </Stack>
}


export default NeckModel


const StiffnessTable = () => {

    const numRenderer = (params: GridValueFormatterParams) : string => params.value.toFixed(2)
    
    const columns : GridColDef[] = [
        {field: 'segments', headerName: 'Segments', sortable: false, flex: 1},
        {field: 'flexion', headerName: 'Flexion', type: 'number', flex: 1, valueFormatter: numRenderer},
        {field: 'extension', headerName: 'Extension', type: 'number', flex: 1, valueFormatter: numRenderer},
        {field: 'compression', headerName: 'Compression', type: 'number', flex: 1, valueFormatter: numRenderer},
        {field: 'tension', headerName: 'Tension', type: 'number', flex: 1, valueFormatter: numRenderer},
        {field: 'lateralBending', headerName: 'Lateral Bending', type: 'number', flex: 1, valueFormatter: numRenderer},
        {field: 'axialRotation', headerName: 'Axial Rotation', type: 'number', flex: 1, valueFormatter: numRenderer},
    ]

    const rows = [
        {id: 1, segments: 'O-C2', flexion: 0.31, extension: 0.37, compression: 2540, tension: 9580, lateralBending: 0.08, axialRotation: 0.23},
        {id: 2, segments: 'C2-C3', flexion: 0.31, extension: 0.37, compression: 2540, tension: 9580, lateralBending: 0.08, axialRotation: 0.23},
        {id: 3, segments: 'C3-C4', flexion: 0.03, extension: 0.14, compression: 24650, tension: 46637.50, lateralBending: 0.29, axialRotation: 0.2},
        {id: 4, segments: 'C4-C5', flexion: 0.03, extension: 0.14, compression: 24650, tension: 46637.50, lateralBending: 0.29, axialRotation: 0.2},
        {id: 5, segments: 'C5-C6', flexion: 0.31, extension: 0.40, compression: 28225, tension: 43662.50, lateralBending: 0.14, axialRotation: 0.13},
        {id: 6, segments: 'C6-C7', flexion: 0.31, extension: 0.40, compression: 28225, tension: 43662.50, lateralBending: 0.14, axialRotation: 0.13},
        {id: 7, segments: 'Combined', flexion: 0.01, extension: 0.04, compression: 1064.51, tension: 3361.82, lateralBending: 0.02, axialRotation: 0.01},
    ]
    
    return <DataGrid
        columns={columns}
        rows={rows}
        density="compact"
        slots={{
            toolbar: GridToolbar,
            footer: StifnessTableFooter 
        }}
        hideFooterPagination
        hideFooterSelectedRowCount
    />
}


const StifnessTableFooter = () => 
    <Typography  variant="caption" p={0.5}>
        This table presents the mean stiffness values for each segment of the cervical spine,
        as well as the combined equivalent stiffness of all segments.
        Stiffness values for compression and tension are given in N/m, while values 
        for flexion, extension, lateral bending, and axial rotation are given in Nm/deg.
    </Typography>
