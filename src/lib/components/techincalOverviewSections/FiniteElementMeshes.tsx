import { Divider, Stack, Typography, TypographyProps } from "@mui/material";
import { ReactElement } from "react";
import LabeledImage from "../LabeledImage";
import { Tex2SVG } from "react-hook-mathjax";
import References from "../References";


const FiniteElementMeshes = (props: {
    titleProps: TypographyProps,
    subHeaderProps: TypographyProps 
}): ReactElement => {
    const { titleProps, subHeaderProps } = props

    const referenceList = [
        'Ackerman, M.J., 1998. The visible human project. Proceedings of the IEEE, 86(3), pp.504-511.',
        'Gerikhanov, Z., 2017. Simulating the cardinal movements of childbirth using finite element analysis on the graphics processing unit (Doctoral dissertation, University of East Anglia).', 
        'Lapeer, R.J. and Prager, R.W., 2001. Fetal head moulding: finite element analysis of a fetal skull subjected to uterine pressures during the first stage of labour. Journal of biomechanics, 34(9), pp.1125-1133.', 
        'Mitsuhashi, N., Fujieda, K., Tamura, T., Kawamoto, S., Takagi, T. and Okubo, K., 2009. BodyParts3D: 3D structure database for anatomical concepts. Nucleic acids research, 37(suppl_1), pp.D782-D785.',
        'Lapeer, R.J., 1999. A biomechanical model of foetal head moulding (Doctoral dissertation, University of Cambridge).',
        'Shewchuk, J.R., 2002. Delaunay refinement algorithms for triangular mesh generation. Computational geometry, 22(1-3), pp.21-74.', 
        'Hang, S., 2015. TetGen, a Delaunay-based quality tetrahedral mesh generator. ACM Trans. Math. Softw, 41(2), p.11.'
    ]

    return <Stack gap = {1}>
        <Typography {...titleProps}>
            Finite Element Meshes
        </Typography>
        <Typography>
            When working within the realm of computer simulation, it is crucial to consider an important
            aspect of mesh generation. The models used in the simulation must strike a balance between 
            high accuracy and minimal geometrical complexity, specifically in terms of the number of primitives.
            This requirement arises due to the challenges posed by numerical methods when handling intricate 
            models on computers. While modern computers boast greater processing power, enabling higher mesh 
            complexities, the computational cost of modeling the interaction between multiple complex organ meshes 
            becomes prohibitively high, especially in real-time. Consequently, it becomes imperative to simplify 
            the meshes while maintaining a small approximation error.
        </Typography>
        <Typography>
            Furthermore, ensuring a high level of mesh quality is paramount to the accuracy of the simulation. 
            Computational complexity introduces the risk of numerical errors and degenerate cases in numerical methods. 
            Poorly constructed mesh primitives, such as collapsed tetrahedra and elements with unfavorable aspect ratios,
            can severely compromise the accuracy and stability of these methods. To overcome these limitations and 
            achieve improved results, preprocessing techniques must be employed to address the issues related 
            to low-quality mesh primitives. By tackling these challenges, the overall accuracy and reliability 
            of the simulation can be significantly enhanced.
        </Typography>
        
        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />
        
        <Typography {...subHeaderProps}>
            Maternal Bony Pelvis Model
        </Typography>
        <Typography>
            The bony pelvis model utilized in this thesis' simulation was derived from CT scans of the Visible 
            Female. However, significant processing and simplification were necessary to transform the raw 
            scanned data into a suitable model for computer simulation.

            To rectify the model, two main techniques were employed: remeshing and decimation. 
            The initial pelvic mesh generated from the Visible Female CT data exhibited numerous defects, 
            including poor quality triangles and spurious data introduced during the mesh generation process. 
            Manual processing was conducted to eliminate the spurious parts of the mesh, while octree-based
            remeshing was applied to improve the quality of the valid portions of the geometry, which suffered
            from poor quality.

            The need for decimation arose due to the excessive complexity resulting from the remeshing process. 
            The original octree-remeshed meshes consisted of a high number of triangles, approximately 60,000.
            However, a significant portion of these triangles were spurious and did not accurately represent the 
            actual geometry. After decimation was applied, the number of triangles was reduced to approximately 14,000.
        </Typography>
        
        <Stack direction='row' justifyContent='space-evenly'>
            <LabeledImage
                maxWidth='40%'
                src='/bony_pelvis/original.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The maternal pelvis model obtained from Visible Female CT scans (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='40%'
                src='/bony_pelvis/post_processing.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The maternal pelivs after decimation and pre-processing (Gerikhanov 2017). Portions of the mesh
                    that do not come into contact with the fetus are removed.
                </Typography>
            </LabeledImage>
        </Stack>
        <Typography>
            In the current childbirth simulator, the pelvis model is rigid and does not undergo deformation. 
            It serves primarily for the attachment of deformable soft tissues and for contact with the fetal head.
            Consequently, only a subset of the pelvis comes into contact with the fetal head during the simulation,
            and a large portion of the pelvis remains unattached to any soft tissues. Thus, the irrelevant parts 
            of the pelvis are ignored and removed from the mesh. This simplification greatly benefits 
            the simulation's complexity and computational speed. 
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />
        
        <Typography {...subHeaderProps}>
            Fetal Skull Model
        </Typography>
        <Typography>
            Lapeer and Prager (2001) developed a fetal skull model specifically tailored for simulating 
            fetal head moulding. The model consists of a shell mesh, comprising approximately 64,000 triangles.
            To optimize the mesh, decimation techniques were applied, reducing the total number of triangles 
            to 7,900.
        </Typography>
        <Typography>
            Various adjustments were made to the skull model to enhance realism. The cavities beneath the 
            zygomatic bones were removed, and the surface was meticulously smoothed. This extensive 
            smoothing aimed to emulate the influence of soft tissues and fascia enveloping the bony skull.
            The resulting smoothness of the mesh also proves advantageous for the contact method implemented 
            within the simulation.
        </Typography>
        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
            <LabeledImage
                maxWidth='40%'
                src='/fetal_skull/original.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The fetal skull mesh sourced from Lapeer and Prager (2001) in its original form (Gerikhanov 2017).
                    The mandible is noticeably missing from the fetal skull mesh.
                </Typography>
            </LabeledImage>

            <LabeledImage
                maxWidth='40%'
                src='/fetal_skull/post_processing.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The fetal head following pre-processing steps, which were aimed at reducing the complexity 
                    of the mesh and achieving a smoother surface. The original mesh has been augmented by 
                    the inclusion of the mandible, completing the overall structure of the fetal head (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
        </Stack>
        <Typography>
            Furthermore, the dimensions of the head were modified to reflect those of a typical fetal head at full 
            gestation. However, it is important to note that the original skull model by Lapeer and Prager (2001)
            did not include the mandible. Considering the focus on simulating fetal head moulding, it was
            justifiable to exclude the lower portion of the skull, including the mandible. The compressive 
            forces exerted by the cervix and other soft tissues primarily affect specific areas atop the skull,
            namely the occipital region and the bregma.
        </Typography>
        <Typography>
            The resulting interaction between the fetal head and the surrounding structures relies heavily 
            on the geometries of the involved models. It is evident from previous versions of BirthView, 
            that the absence of the mandible and the lower part of the skull can significantly impact the 
            fidelity of the simulation. 
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />
        
        <Typography {...subHeaderProps}>
           Pelvic Floor Models 
        </Typography>
        <Typography>
            The acquisition of a pelvic floor mesh presented numerous challenges, which are comprehensively 
            described in Gherkinov (2017). Among the available sources, the dataset reported in 
            Mitsuhashi et al. (2009) proved to be the most accessible and comprehensive. Notably, the 
            majority of meshes provided in this database are already pre-segmented, simplifying the 
            subsequent analysis. Moreover, the pelvic floor substructures can be readily obtained as 
            separate sub-meshes from the dataset.
        </Typography>
        <Stack direction='row' justifyContent='center'>
            <LabeledImage
                maxWidth='60%'
                src='/pelvic_floor/mitsuhashi_original.png'
                width='100%'
                style={{'objectFit': 'scale-down', marginLeft:'auto', marginRight:'auto'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Transverse and sagittal views of the pelvic floor muscle complex meshes obtained 
                    from Mitsuhashi et al. (2009).
                </Typography>
            </LabeledImage>
        </Stack>
        <Typography pt={1}>
            <b>Octree-based Remeshing:</b> The original mesh obtained from Mitsuhashi et al. (2009) is of 
            insufficient quality for FE mesh generation. Consequently, remeshing techniques 
            must be employed to obtain a higher-quality mesh. Various methods exist for remeshing, with the marching
            cubes algorithm and its variations being a commonly used approach for generating a new mesh from 
            non-mesh data. The triangle quality is determined by calculating the ratio of the radius of the 
            circumscribing circle to the length of the longest side. 
            This can be expressed using the following equation:  
        </Typography>
        <Stack justifyContent='center'>
            <Tex2SVG 
                latex='Q = \frac{R}{L_{m}}'
            />
            <Typography textAlign='center'>
                where <Tex2SVG display='inline' latex='Q'/> is the quality of the traingle
                , <Tex2SVG display='inline' latex='R'/> is the radius of the circumscribing circle,
                and <Tex2SVG  display='inline' latex='L_m'/> is the longest edge.
            </Typography>
        </Stack>
        <Typography>
           In numerical simulations based on the Finite Element Method (FEM), it can be crucial for 
           triangles to possess specific shape characteristics to avoid encountering numerical issues. 
           Specifically, the ratio of the radius of the circumcircle to the length of the shortest edge 
           should be close to 1. This condition ensures that the triangles have a near-equilateral shape, 
           which enhances the stability and accuracy of the simulation. 
        </Typography>
        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
            <LabeledImage
                maxWidth='40%'
                src='/pelvic_floor/wireframe_original.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The original mesh acquired from Mitsuhashi et al. (2009), highlighting areas 
                    of concern. The presence of large red regions on the surface indicates a significant
                    number of triangles with poor aspect ratios (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='40%'
                src='/pelvic_floor/wireframe_octree.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The pelvic floor mesh after undergoing octree-based remeshing. The resulting mesh exhibits 
                    a higher triangle count, but the majority of triangles have favorable aspect ratios, as
                    evidenced by the predominantly blue surface color (Gerikhanov 2017). 
                </Typography>
            </LabeledImage>
        </Stack>
        
        <Typography pt={1}>
            <b>Combining Meshes to Form the Pelvic Floor Structure:</b> The pelvic floor mesh consists of 
            individual substructures that are closely interconnected, forming a unified object that can be 
            treated as a single structure. The separate meshes of the pelvic floor into a cohesive 
            unit with union operation. The seperate meshes were comprised of: Left puborectalis (LPR), 
            Left pubococcygeus (LPC), Left iliococcygeus (LIC), Right puborectalis (RPR),
            Right pubococcygeus (RPC), and Right iliococcygeus (RIC). See Gerikhanov (2017) for more details.
        </Typography>
        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
            <LabeledImage
                maxWidth='30%'
                src='/pelvic_floor/disjoint.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The original disjoint pelvic floor substructures obtained from Mitsuhashi et al. (2009). 
                    Each differently colored mesh represents a distinct substructure: LPC (green), LPR (red), 
                    RPC (pink), RIC (blue), RPR (cyan) (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='30%'
                src='/pelvic_floor/union.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The pelvic floor mesh after combining the substructures using a union operation.
                    Additionally, the perineal body is introduced, where the LPC, LPR, RPC, and RPR 
                    meshes are fused at a single point (Gerikhanov 2017). 
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography pt={1}>
            <b>Laplacian Smoothing and Warping:</b> In order to enhance the stability of contact 
            interactions among the meshes, Laplacian smoothing is employed. This technique considers 
            the outer edges of neighboring triangles as a unified polygon and positions a vertex at 
            the polygon's midpoint, resulting in a smoother mesh (Lapeer, 1999). This process is 
            iteratively applied to all vertices within the mesh, ensuring a more refined surface.
            For further elaboration on this procedure, refer to Lapeer (1999).
        </Typography>
        <Typography>
            The initial meshes used for the simulation of labor in the pelvic floor model are derived 
            from an adult male. While the main anatomical structures of the pelvic floor muscles are 
            similar between males and females, differences arise in the perineal triangle and the area
            of the vaginal opening. Consequently, a warping technique was employed to transform the 
            geometry of the pelvic floor to that of a female. A basic linear warping method was applied,
            utilizing the distance to the transformation origin as the fall-off parameter. 
            This approach results in vertices further from the warp origin undergoing less movement
            compared to those closer to the warp origin. By warping the male pelvic floor to match a female 
            equivalent, alignment within an acceptable margin of error is achieved. Ensuring the correct 
            attachment points of the pelvic floor mesh to the bony pelvis mesh facilitates the fitting process.
            For further information regarding the warping procedure employed in the conversion of the 
            male pelvic floor to a female equivalent, detailed insights can be found in Gerikhanov (2017).
        </Typography>
        
        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
            <LabeledImage
                maxWidth='20%'
                src='/pelvic_floor/pre_warp.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The pelvic floor mesh showcasing the points of interest that undergo shifting to 
                    align with corresponding attachment points on the pelvis, resulting in a warped
                    configuration for better fitting (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='20%'
                src='/pelvic_floor/post_warp.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The warped pelvic floor mesh showing the shifted muscle attachment points accurately aligned 
                    with the pelvis (Gerikhanov 2017). 
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='20%'
                src='/pelvic_floor/mitsuhashi_w_pelvis.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                     The initial model obtained from Mitsuhashi et al. (2009).  
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='20%'
                src='/pelvic_floor/post_processing_w_pelvis.png'
                width='100%'
                style={{'objectFit': 'scale-down'}}
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                   The remeshed pelvic floor model with the addition of the perineal body and linear 
                   warping to conform to the dimensions of the female pelvis (Gerikhanov 2017). 
                </Typography>
            </LabeledImage>
        </Stack>
        
        <Typography pt={1}>
            <b>Uniformizing Thickness:</b> The original pelvic floor mesh comprised various parts,
            each exhibiting different thicknesses. In certain regions, these mesh parts overlapped,
            resulting in an overall thickness increase at the overlapping areas. The utilization of a
            variable thickness mesh for the pelvic floor raises questions when considering the 
            source of the raw pelvic floor mesh used in the simulation and the 
            subsequent preprocessing steps applied to it. While acknowledging that incorporating 
            information about the varying thickness could potentially enhance the accuracy of the simulation,
            it was determined that the introduced approximation errors outweighed the benefits.
            Therefore, the decision was made to simplify the mesh by establishing a uniform thickness,
            as this simplification approach was deemed more advantageous in light of the potential introduced 
            approximation errors.
        </Typography>

        <Typography pt={1}>
            <b>Generating Volumetric Meshes:</b> The TLED FEM employed in the childbirth simulation 
            necessitates a volumetric representation of the meshes. This means that the meshes are not hollow,
            but are composed of a selected type of volumetric element. For the simulation, the tetrahedral 
            finite element description is chosen, requiring the conversion of surface meshes into a volumetric 
            representation consisting of tetrahedral volumetric elements.
        </Typography>
        <Typography>
            The concept of Delaunay triangulation enables the generation of a high-quality triangular mesh 
            from a 2D contour or a set of points. This idea of regularized mesh generation from simpler shapes 
            can also be extended to volumetric tetrahedra. In this case, the "hollow" surface mesh serves
            as the empty contour, which is then "filled" with volumetric elements in a regularized manner 
            akin to 2D Delaunay triangulation. The fundamental principles of generating volumetric tetrahedral 
            meshes from surface meshes are outlined by Shewchuk (2002). Their approach is rooted 
            in the concept of Delaunay triangulation, which is expanded to the domain of 3D tetrahedral elements.
        </Typography>
        <Typography>
            Volumetric meshes are generated with TetGen Delaunay tetrahedral mesh 
            generation software (Hang 2015).
        </Typography>
        
        <References referenceList={referenceList}/>
    </Stack>
}

export default FiniteElementMeshes
