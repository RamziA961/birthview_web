import { Divider, Paper, Stack, Typography, TypographyProps } from '@mui/material'
import { ReactElement } from 'react'
import LabeledImage from '../LabeledImage'
import Tex from '../Tex'
import References from '../References'

import { useTheme } from '@mui/material'

const ContactMethod = (props: {
    titleProps: TypographyProps,
    subHeaderProps: TypographyProps
}): ReactElement => {
    
    const { titleProps, subHeaderProps } = props
    const referenceList = [
        'Möller, T., 1997. A fast triangle-triangle intersection test. Journal of graphics tools, 2(2), pp.25-30.',
        'Lapeer, R., Gerikhanov, Z., Sadulaev, S.M., Audinis, V., Rowland, R., Crozier, K. and Morris, E., 2019. A computer-based simulation of childbirth using the partial Dirichlet–Neumann contact method with total Lagrangian explicit dynamics on the GPU. Biomechanics and modeling in mechanobiology, 18, pp.681-700.',
        'Gerikhanov, Z., 2017. Simulating the cardinal movements of childbirth using finite element analysis on the graphics processing unit (Doctoral dissertation, University of East Anglia).', 
        'Yastrebov, V.A., 2013. Numerical methods in contact mechanics. John Wiley & Sons.',
        'Cirak, F. and West, M., 2005. Decomposition contact response (DCR) for explicit finite element dynamics. International Journal for Numerical Methods in Engineering, 64(8), pp.1078-1110.',
        'Ashton-Miller, J.A. and DeLancey, J.O., 2009. On the biomechanics of vaginal birth and common sequelae. Annual review of biomedical engineering, 11, pp.163-176.',
        'Holzapfel, G.A., 2002. Nonlinear solid mechanics: a continuum approach for engineering science.'
    ]
    
    return <Stack gap={1}>
        <Typography {...titleProps}>
            Mechanical Contact Method
        </Typography>
        
        <Typography>
            The motion of the baby's head during the expulsion stage of labor is influenced by various forces 
            resulting from contact interactions with the maternal pelvic anatomy, including the bony pelvis, 
            pelvic floor muscles, ligaments, and the fully dilated uterine cervix. During the first 
            stage of labor, the baby's head gradually comes into contact with the uterine cervix as it 
            dilates. This contact leads to the phenomenon known as fetal head moulding. However, for 
            the purposes of the simulation, we consider the fetal head to be rigid and ignore the 
            effects of fetal head moulding at this stage.
        </Typography>
        
        <Typography>
            The simulation begins at the end of the first stage or the start of the second stage of labor when
            the fetus starts descending but has not yet made contact with the pelvic anatomy. In order to 
            detect contact between the baby's head and the maternal anatomy, a contact detection procedure, 
            commonly referred to as collision detection in computer graphics and games, is performed. 
            Once contact or collision is detected, contact pairs are established between the surfaces of 
            the baby's head and the maternal anatomy using a contact discretization method.
        </Typography>
        
        <Typography>
            After the contact pairs have been established, the contact needs to be "resolved" using a contact 
            resolution method. This involves determining how the forces and interactions between the contacting 
            surfaces are handled to simulate realistic contact behavior.
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            Contact Detection
        </Typography>

        <Typography>
            In order to minimize processing overhead, a hierarchical collision detection (CD) approach is employed, 
            utilizing a two-step process consisting of a broad phase and a narrow phase. The broad phase focuses 
            on efficiently partitioning the FE mesh models into distinct rectangular regions using a technique 
            known as Bounding Volume Hierarchy (BVH). In our implementation, we utilize an octree subdivision as the BVH.
        </Typography>
        <Typography>
            The BVH structure organizes the FE mesh models into a hierarchical tree-like representation, where 
            each level of the tree contains rectangular bounding volumes that encapsulate specific regions of space. 
            This subdivision process enables efficient spatial partitioning and culling, reducing the number of 
            potential collisions that need to be checked in subsequent phases. By dividing the mesh into smaller 
            regions using the octree BVH, the broad phase can quickly identify candidate regions that may 
            potentially collide.
        </Typography>
        <Typography>
            The broad phase serves as an initial filtering step, narrowing down the search space for potential 
            collisions. The octree BVH subdivision technique allows for effective spatial organization and subdivision, 
            enabling the subsequent narrow phase to focus on the specific regions of interest. This two-step 
            process optimizes the collision detection process by minimizing the computational overhead associated with 
            checking collisions between every pair of objects in the simulation.
        </Typography>

        <Stack alignItems='center' justifyContent='space-evenly' direction='row'>
            <LabeledImage
                maxWidth='40%'
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/contact_method/octree_bony_pelvis.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The bony pelvis model showcasing the utilization of octree-based Axis-Aligned Bounding Boxes (AABBs) 
                    (Lapeer et al. 2019, Gerikhanov 2017).
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='40%'
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/contact_method/octree_bvh.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Octree BVH representation. Root node depicted as a 3D AABB with subdivisions for child nodes. 
                    Leaf nodes at the lowest level contain surface triangles (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
        </Stack>
        
        <Typography>
            The octree construction followed a top-down approach, begining with the entire mesh and progressively subdiving 
            into smaller boxes until the smallest box contained a maximum preset number of faces. This is preferable to a
            bottom-up approach that starts at the level of a single face. Although both approaches have a complexity 
            of <Tex>{'O(N)'}</Tex> for <Tex>{'N'}</Tex> faces, the bottom-up approach requires performing a nearest neighbor 
            test at each new level up the tree, resulting in significant overhead for complex FE meshes.
        </Typography>

        <Typography>
            During runtime, the broad phase of collision detection employs a tree traversal algorithm. In cases where deformable 
            meshes, such as the pelvic floor muscle mesh, are present, the orientation of the AABBs relative to each other can change.
            This transformation effectively converts the AABBs into Oriented Bounding Boxes (OBBs). Even rigid bodies, such as the fetal 
            head, can experience changes in their global directions, necessitating the conversion of AABBs into OBBs. To address this, 
            the local coordinate system of one of the bodies (typically the rigid body) can serve as the master coordinate system,
            with the OBBs of the other body being referenced to it.
        </Typography>

        <Typography>
            After the detection of potential collisions between parts of potentially colliding bodies using the nearest OBBs, 
            the narrow phase of collision detection comes into play. In this phase, the focus is on identifying face-to-face
            collisions among the relatively small number of faces contained within each OBB. To accomplish this, the 
            well-established Separating Axis Theorem (SAT) technique is employed (Möller 1977).

            The SAT algorithm is a powerful method for determining whether two convex objects intersect by examining the 
            separation of their projection onto various axes. By iterating through the axes defined by the face normals 
            of the faces within the OBBs, we can determine if there is any axis along which the projections of the two 
            objects do not overlap. If such an axis is found, it indicates that the objects do not intersect and no 
            further computations are needed. However, if all axes show overlapping projections, a collision is detected 
            between the faces of the objects.
        </Typography>
        
        <Stack justifyContent='space-evenly' direction='row'>
            <LabeledImage
                maxWidth='28%'
                src = '/contact_method/oob_global.png'
                width='100%'
                style={{ objectFit: 'scale-down'}}
            > 
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    OBBs of object 1 and object 2 represented in the global coordinate system (Lapeer et al. 2019).
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='35%'
                src = '/contact_method/oob_local.png'
                width='100%'
                style={{ objectFit: 'scale-down'}}
            > 
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Object 1 becomes the master object, and the position and orientation of 
                    object 2 are referred to the local coordinate system of the master object (Lapeer et al. 2019).
                </Typography>
            </LabeledImage>
        </Stack>
        
        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            Contact Discretization
        </Typography>
        
        <Typography>
            Ignoring multiple body contact and self-contact, we assume that two bodies come into contact at 
            certain sections of their respective boundaries during a specific time instance. In our application,
            where the bodies are discretized FE mesh models, we designate one body's contact surface as the 
            "master" surface and the other as the "slave" surface. Typically, the slave surface has a higher 
            mesh resolution than the master surface. To establish contact pairs between the master and 
            slave surfaces, three different scenarios are considered.
        </Typography>

        <Typography>
            In the node-to-node (NTN) approach, contact pairs are formed by connecting corresponding nodes on both 
            surfaces based on their minimal distance. While this approach works well for contact in the normal 
            direction, it may result in node correspondence loss for some nodes when slip occurs in the tangential direction.
        </Typography>

        <Typography>
            The node-to-segment (NTS) discretization approach pairs a node from the slave surface with a segment of the 
            master surface. This method is better suited for handling large deformations and significant tangential 
            sliding compared to the NTN approach. However, it may lead to undetected or "spurious" penetrations if 
            the slave surface has a lower resolution than the master surface.
        </Typography>

        <Stack justifyContent='space-evenly' alignItems='center' direction='row'>
            <LabeledImage
                maxWidth='30%'
                src='/contact_method/ntn.png'
                width='100%'
                style={{ objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    NTN discretized contact. Each node from one surface is paired with a corresponding node on 
                    the other surface, ensuring inter-surface conformance (Gerikhanov 2017).
                </Typography>
            </LabeledImage>

            <LabeledImage
                maxWidth='30%'
                src='/contact_method/nts.png'
                width='100%'
                style={{ objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    NTS discretized contact. Contact pairs (green) indicating a node from the slave surface (blue)
                    paired with a corresponding segment from the master surface (red) (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
            The segment-to-segment (STS) approach relates segments of each surface to segments of the other surface.
            Although theoretically attractive, implementing this method in practical problems can be complex.
            NTS discretization is utilized due to the significant displacements between the 
            slave surface (representing the fetal head) and the master surfaces (representing the maternal anatomy 
            including the bony pelvis, pelvic floor muscles, and uterine cervix).
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            Contact Resolution
        </Typography>

        <Typography>
            In BirthView, the interaction occurs between the rigid fetal head and either the deformable 
            pelvic floor muscles or the rigid bony pelvis. Both rigid body parts have complex shapes. At this stage,
            friction is not accounted for, as it is challenging to determine realistic friction coefficients 
            for this specific scenario. Therefore, the frictionless contact conditions are considered based on the 
            Hertz-Signorini-Moreau (HSM) formulation (Yastrebov, 2013). These conditions apply to the contact 
            zone <Tex>{'\\Gamma'}</Tex>, where the active contact zone <Tex>{'\\bar{\\Gamma}_{c}'}</Tex>
            represents the subset of contact pairs in actual contact:
        </Typography>
        
        <Stack alignItems='center'>
            <Typography>
                [20]: <Tex>{'g \\ge 0, \\sigma _n \\le 0, g\\sigma _n = 0, \\sigma _t = {\\mathbf {0}}'}</Tex>
            </Typography>
            <Typography>
                where <Tex>{'g'}</Tex> is the gap between corresponding elements of a contact pair.
            </Typography>
        </Stack>

        <Typography>
            The non-negativity of the gap is a fundamental requirement in the numerical contact methods 
            discussed in subsequent sections. In non-adhesive contact, the contact pressure <Tex>{'\\sigma_n'}</Tex> is non-positive.
            The third condition states that a positive gap corresponds to zero contact pressure, and conversely,
            a positive contact pressure corresponds to zero gap. Additionally, in the case of
            frictionless contact, the tangential stress vector <Tex>{'\\sigma_t'}</Tex> is always zero.
        </Typography>

        <Typography>
            The SAT collision detection method operates at the level of the object's outer faces, which are typically considered as primitives.
            However, due to the nature of SAT being a posteriori and using finite time steps, it is possible for collisions to be missed,
            resulting in interpenetration of the objects. In applications such as game physics, this issue can be addressed by 
            using a priori collision detection methods that anticipate and prevent interpenetration, or by calculating the exact point of 
            collision to rectify interpenetration.
        </Typography>

        <Typography>
            The concept of interpenetration, represented by the negative gap <Tex>{'(g)'}</Tex>, and its rectification to ensure 
            a non-negative gap <Tex>{'(g)'}</Tex> as required by the HSM condition (Eq. 20), form the foundation of various numerical
            contact methods. 
        </Typography>

        <Typography>
            Several contact methods commonly used with the pDN method were investigated,
            including the Penalty Method (PM), the Lagrange Multiplier method (LLM), and a Projection-based method (PBM).
            Each of these methods offers distinct approaches and techniques for handling contact interactions within 
            the pDN framework.
        </Typography>

        <Typography>
            The PM, while widely used, struggles to satisfy the conditions outlined in Eq. 20.
            On the other hand, LLM-based methods do meet these conditions, but their solution in an FEM depends 
            on the chosen time step for explicit time integration. To address these limitations, 
            projection-based methods handle contact conditions kinematically by resolving contact through the movement or 
            "projection" of violating or interpenetrating nodes. 
            This approach ensures satisfaction of the contact conditions outlined in Eq. 20, while also reducing the computational 
            cost compared to LLM-based approaches.
        </Typography>

        <Typography>
            Projection-based methods, such as the one described by Cirak and West (2005), are strictly kinematic and do not 
            directly provide information about the contact force. Instead, they use a momentum-based approach to calculate 
            the contact force based on the momentum exchange between interacting nodes. Interpolation techniques are employed 
            when nodes come into contact with faces instead of other nodes. While this method is useful for impact modeling,
            its applicability to quasi-static approaches is limited due to the absence of significant momentum exchange.
        </Typography>


        <Typography>
            The pDN contact method, as described by Yastrebov (2013), is also projection-based. 
            It enforces the non-penetration conditions (Eq. 20) by projecting slave nodes onto the master surface using 
            Dirichlet boundary conditions. Tangential contributions, including friction, are treated as Neumann boundary
            conditions. Although the pDN method was not originally designed for explicit FE, the use of 
            Dirichlet boundary conditions along the normal direction of the contact surface leads to a more robust contact resolution 
            that is independent of the reaction force and time step in explicit FE simulations.
        </Typography>

        <Typography>
            Given that childbirth is a slow quasi-static process without significant impacts or friction at this stage, 
            the adaptation of the pDN method for our specific purpose has resulted in the development of a projection-based 
            contact method algorithm, as illustrated in the following figure. In this algorithm, the slave surface nodes are represented 
            in blue color, while the master surface is depicted in pink.
        </Typography>

        <Stack alignItems='center'>
            <LabeledImage
                maxWidth='80%'
                src='/contact_method/pbm.png'
                width='100%'
                style={{ objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                   The implemented pDN method: Illustration of the contact resolution process.
                   Blue nodes represent the slave surface, while the pink surface represents the master surface.
                   At time <Tex>{'t-h(\\mathbf{p}_{t-h})'}</Tex>, node <Tex>{'\\mathbf{p}'}</Tex> interpenetrates the 
                   master surface and ends up at position <Tex>{'\\mathbf{p}_t'}</Tex> at the next time 
                   step <Tex>{'(h = \\partial t)'}</Tex> To satisfy HSM conditions, <Tex>{'\\mathbf{p}_t'}</Tex> is
                   projected back on to the surface, resulting in the 
                   position <Tex>{'\\mathbf{p}_p = \\mathbf{p}_i +s = \\mathbf{p}_t + \\mathbf{d}_t'}</Tex>,
                   where <Tex>{'\\mathbf{p}_i'}</Tex> is the intersection point and <Tex>{'s'}</Tex> is the 
                   tangential slip vector. 
                   This projection ensures compliance with the non-penetration conditions (Lapeer et al. 2019).
                </Typography>
            </LabeledImage>
        </Stack>
        <Typography>
            One issue that arises in this process is that within a single time 
            step <Tex>{'\\partial t = h'}</Tex>, a free node <Tex>{'\\mathbf{p}'}</Tex> at position <Tex>{'\\mathbf{p}_{t - h}'}</Tex>
            may have penetrated the surface, ending up at position <Tex>{'\\mathbf{p}_t'}</Tex> while violating the previously 
            mentioned HSM conditions. To address this issue, we aim to move the node to the 
            position <Tex>{'\\mathbf{p}_p = \\mathbf{p}_i + \\mathbf{s}'}</Tex>, where <Tex>{'\\mathbf{p}_i'}</Tex> is 
            the intersection point of node <Tex>{'\\mathbf{p}'}</Tex> with the master surface, 
            and <Tex>{'\\mathbf{s}'}</Tex> is the tangential slip that would have occurred within the time step.
            Rather than calculating the exact position of <Tex>{'\\mathbf{p}_i'}</Tex>, it is more 
            straightforward to project <Tex>{'\\mathbf{p}_t'}</Tex> in the direction of the master surface's
            normal <Tex>{'\\mathbf{n}'}</Tex> over a distance <Tex>{'d_t'}</Tex> (gap), which can be obtained from:
        </Typography>

        <Typography textAlign='center'>
            [21]: <Tex>{'d_t = \\mathbf{p}_t - \\mathbf{p}_o \\cdot \\mathbf{n}'}</Tex>
        </Typography>

        <Typography>
            The projected position <Tex>{'\\mathbf{p}_p'}</Tex> is determined based on an arbitrary node <Tex>{'\\mathbf{p}_o'}</Tex>
            on the master's intersection plane (plane origin) and is calculated as follows:
        </Typography>

        <Typography textAlign='center'>
           [22]: <Tex>{'{\\mathbf {p}}_p = {\\mathbf {p}}_t + d_t{\\mathbf {n}}'}</Tex>
        </Typography>
        

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            Calculating Contact Force 
        </Typography>
        
        <Typography>
            Since the pDN method employed in this study focuses solely on satisfying the non-penetration conditions, the 
            calculation of contact forces needs to be addressed separately within the explicit FE formulation.
            In standard FE, nodal forces are evaluated by integrating stress over the element volume. However, in the
            context of contact forces, nodal forces are evaluated across the element surface. To address this,
            the finite volume method (FVM) is adopted, as described by Teran et al. (2003), to evaluate the 
            stress-based contact forces.
        </Typography>
     

        <Stack direction='row-reverse' gap = {2}>
            <LabeledImage
                src='/contact_method/nodal_force.png'
                maxWidth='50%'
                width='100%'
                style={{ objectFit: 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    FVM integration for a 3D region showing a node <Tex>{'i'}</Tex> and the elements of its surrounding 
                    polygon in the reference (left) and current (right) configurations. The colored region represents the neighborhood 
                    where stress is integrated. <Tex>{'A_j(a_j)'}</Tex> and <Tex>{'\\mathbf{N}_j(\\mathbf{n}_j)'}</Tex> denote 
                    the area and normal, respectively, for the reference (current) configuration of face <Tex>{'j'}</Tex> (Lapeer et al. 2019)
                </Typography>
            </LabeledImage>

            <Stack gap = {1} justifyContent='center'>
               <Typography>
                    The nodal force for a node <Tex>{'i'}</Tex> in a 3D tetrahedron is calculated as follows:
                </Typography>            
                <Typography>
                    [23]: <Tex>{
                        'f_i = - \\sum _{j=1}^n \\frac{1}{3} \\sigma _j(a_{j,1} {\\mathbf {n}}_{j,1} +'+ 
                        'a_{j,2} {\\mathbf {n}}_{j,2} + a_{j,3} {\\mathbf {n}}_{j,3})'
                    }</Tex>
                </Typography>

                <Typography>
                    <Tex>{'\\sigma_j'}</Tex> represents the Cauchy stress in element <Tex>{'j'}</Tex>, 
                    while <Tex>{'a_{j,k}'}</Tex>, <Tex>{'\\mathbf{n}_{j,k}'}</Tex>, <Tex>{'k = 1 \\ldots 3'}</Tex> refer
                    to the areas and normals, respectively, of the faces of element <Tex>{'j'}</Tex> that comprise
                    node <Tex>{'i'}</Tex> in the current spatial configuration. The parameter <Tex>{'n'}</Tex> denotes
                    the number of elements in the surrounding volume around node <Tex>{'i'}</Tex>. By substituting the
                    Cauchy stress with the nominal stress and applying Nason's formula to the areas and normals in the
                    reference material configuration (Holfzapel 2000), the following express is obtained:
                </Typography>

                <Typography>
                    [24]: <Tex>{
                        'f_i = - \\sum _{j=1}^n \\frac{1}{3} {\\mathbf {P}}_j(A_{j,1} {\\mathbf {N}}_{j,1} +' + 
                        'A_{j,2} {\\mathbf {N}}_{j,2} + A_{j,3} {\\mathbf {N}}_{j,3})'
                    }</Tex>
                </Typography>

                <Typography>
                    The symbol <Tex>{'\\mathbf{P}_j'}</Tex> represents the nominal stress tensor for element <Tex>{'j'}</Tex>, 
                    while <Tex>{'\\mathbf{N}_{j,l}'}</Tex> and <Tex>{'A_{j,l}'}</Tex> represent the normal and area, respectively, 
                    of the node <Tex>{'i'}</Tex> that is adjacent to face <Tex>{'l'}</Tex> of 
                    element <Tex>{'j'}</Tex> in the reference configuration.
               </Typography> 
            </Stack>
        </Stack>
        
        <Typography>
            The sum of the product of normals and areas can be pre-computed per 
            element <Tex>{'j'}</Tex> as <Tex>{'b_j = \\frac{1}{3} \\sum _{l\\ne j} A_l {\\mathbf {N}}_l'}</Tex>.
            In the case of a tetrahedron, the relation <Tex>{'\\sum _{k=1}^4 A_k {\\mathbf {N}}_k = 0'}</Tex> holds.
            By combining these findings, the matrix <Tex>{'\\mathbf{B}_m'}</Tex> is obtained:
        </Typography>

        <Typography textAlign='center'>
            [25]: <Tex>{
                '{\\mathbf {B}}_m =' + 
                '-\\frac{1}{3} [ A_1 {\\mathbf {N}}_1 \\ A_2 {\\mathbf {N}}_2 \\ A_3 {\\mathbf {N}}_3 \\ A_4 {\\mathbf {N}}_4 ] =' + 
                '\\left[ b_1 \\ b_2 \\ b_3 \\ b_4 \\right]'
            }</Tex> 
        </Typography>

        <Typography>
            Thus, the force contributions of one element <Tex>{'e'}</Tex> to each of its nodes,
            as derived from the FVM, can be expressed in the nodal force contribution matrix:
        </Typography>

        <Typography textAlign='center'>
            [26]: <Tex>{'f^e_{FVM} = \\mathbf{PB}_m = [g_1 \\ g_2 \\ g_3 \\ g_4]^\\mathrm{T}'}</Tex>
        </Typography>

        <Typography>
            With <Tex>{'g_k'}</Tex> representing the nodal force contribution of 
            element <Tex>{'e'}</Tex> to node <Tex>{'k'}</Tex>. Eq. 9 also denotes the individual element 
            contribution to the nodal forces. It is important to note that this equation must be equal 
            in absolute value, but opposite in sign, to the force derived in Eq. 26.
        </Typography>

        <Typography textAlign='center'>
            [27]: <Tex>{
               '{\\mathbf {P}} {\\mathbf {B}}_m =' +
               '- V_0 {\\mathbf {F}}{\\mathbf {S}}^{{\\mathrm{T}}} \\partial {\\mathbf {h}}^{{\\mathrm{T}}}'
            }</Tex> 
        </Typography>

        <Typography>
            Since <Tex>{'\\mathbf{P} = \\mathbf{FS}'}</Tex> and <Tex>{'\\mathbf{S} = \\mathbf{S}^\\mathrm{T}'}</Tex> (Holzapfel
            2002), the term <Tex>{'\\mathbf{FS}^\\mathrm{T}'}</Tex> in 
            Eq. 27 can be substituted 
            by <Tex>{'\\mathbf{P}'}</Tex>, which eliminates its left-hand side equivalent, resulting in:
        </Typography>

        <Typography textAlign='center'>
            [28]: <Tex>{'{\\mathbf {B}}_m = - V_0 \\partial {\\mathbf {h}}^{{\\mathrm{T}}}'}</Tex>
        </Typography>

        <References referenceList={referenceList}/>
    </Stack>
}

export default ContactMethod
