import { Divider, Stack, Typography, TypographyProps } from "@mui/material";
import { ReactElement } from "react";
import Tex from "../Tex";
import References from "../References";


const TLED = (props: {
    titleProps: TypographyProps,
    subHeaderProps: TypographyProps
}): ReactElement => {
    const { titleProps, subHeaderProps } = props
    const referenceList = [
        'Lapeer, R., Gerikhanov, Z., Sadulaev, S.M., Audinis, V., Rowland, R., Crozier, K. and Morris, E., 2019. A computer-based simulation of childbirth using the partial Dirichlet–Neumann contact method with total Lagrangian explicit dynamics on the GPU. Biomechanics and modeling in mechanobiology, 18, pp.681-700.',
        'Belytschko, T., Liu, W.K., Moran, B. and Elkhodary, K., 2014. Nonlinear finite elements for continua and structures. John wiley & sons.'
    ]

    return <Stack gap={1}>
        <Typography {...titleProps}>
            Total Lagrangian Explicit Dynamics
        </Typography>
        <Typography>
            TLED is a numerical method used to simulate the behavior and deformation of materials under 
            dynamic conditions. It is particularly applicable in scenarios 
            where large deformations, high velocities, and transient effects are involved. TLED is commonly 
            employed in various fields, including structural mechanics, solid mechanics, and computational physics.
            The TLED method operates within the framework of the FEM and is designed to 
            accurately capture the dynamic response of materials. It solves the equations of motion based on 
            the total Lagrangian formulation, where the deformation gradient is measured with respect to the 
            initial configuration of the material. This approach ensures accurate and consistent handling of 
            large deformations, enabling the simulation of complex material behaviors.
        </Typography> 

        <Typography>
            The explicit dynamics aspect of TLED implies that the time integration is performed explicitly, meaning 
            that the equations of motion are directly solved in a step-by-step manner. This explicit time integration 
            scheme allows for efficient and stable simulations, particularly for problems with short duration events 
            or highly transient phenomena.
            One of the key advantages of TLED is its ability to accurately capture material failure and fragmentation,
            as well as the propagation of waves and shocks through the material. This makes it suitable for studying 
            impact and collision scenarios, as well as dynamic events involving highly nonlinear material behavior.
        </Typography>

        <Typography>
            The Total Lagrangian (TL) formulation was specifically chosen for BirthView owing to the fact that a
            substantial number of values can be pre-computed and reused throughout the simulation. Since BirthView 
            is a real-time simulation, reducing the number computations is paramount to ensure that the program 
            can run smoothly.
            To implement TLED, the material properties and behavior are typically described using constitutive 
            models that capture the mechanical response of the material under various loading conditions.
            These models are integrated into the simulation framework to accurately represent the material's deformation,
            stress, and strain behavior.
        </Typography>

        <Typography>
            The TLED explicit FE formulation is utilized in conjunction with a projection-based contact method 
            to compute the contact forces that induce deformation in the soft tissues, resulting in the rotation of 
            the fetal head. The external body forces acting on the system consist of the intra-uterine expulsion 
            force and the maternal bearing down forces. The soft tissues, including the pelvic floor muscles, 
            ligaments, and uterine cervix, are represented using tetrahedral elements and Neo-Hookean hyperelastic 
            material properties. Additionally, the model incorporates static components, such as the maternal pelvis,
            and dynamic components, such as the fetus represented as a rigid body.
        </Typography>

        <Typography>
            The fetus is composed of the fetal head and the fetal body, connected by the fetal neck. The fetal neck 
            is modeled using linear and torsional springs to resist translations and rotations, respectively. Bending motions,
            including flexion, extension, and lateral flexion, are constrained by the contact between the fetal head and the 
            fetal body. Rotations in the transverse plane are restricted by the torsional spring.
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />
        
        <Typography {...subHeaderProps}>
            TLED Formulation (Lapeer et al. 2019)
        </Typography>

        <Typography> 
            The first equation of interest is the law of conservation of linear momentum (Belytschko et al. 2014):
        </Typography>
        <Stack alignItems='center'>
            <Typography>
                [1]: <Tex>
                    {'\\nabla_{0} \\cdot \\mathbf{P} + \\mathbf{b} - \\rho_{0} \\mathbf{\\ddot{u}} = 0'}
                </Tex>
            </Typography>
            <Typography textAlign='center'>
                where <Tex>{'\\nabla_{0}'}</Tex> is the nabla operator in the reference 
                configuration, <Tex>{'\\mathbf{P}'}</Tex> is the normal 
                stress, <Tex>{'\\mathbf{b}'}</Tex> is a vector of body 
                forces, <Tex>{'\\rho_{0}'}</Tex> is the density of the reference 
                configuration or the undeformed initial configuration of a 
                continuous body, <Tex>{'\\mathbf{\\ddot{u}}'}</Tex> is the acceleration vector 
                of <Tex>{'u'}</Tex>.
            </Typography>
        </Stack>
        
        <Typography>
            Applying the principle of virtual work, Eq. 1 is multiplied by a
            variation of <Tex>{'\\delta u'}</Tex> and integrated over the reference
            domain <Tex>{'\\Omega_{0}'}</Tex>.
         </Typography>
        
        <Stack alignItems='center'>
            <Typography>
                [2]: <Tex>
                    {
                        '\\int_{\\Omega_{0}} \\delta u \\frac{\\partial \\mathbf{P}}{\\partial X} +' +
                        '\\int_{\\Omega_{0}} \\delta u\\mathbf{b}d\\Omega_{0} -' +
                        '\\int_{\\Omega_{0}} \\delta u \\rho_{0} \\mathbf{\\ddot{u}} \\Omega_{0} = 0'
                    }
                </Tex>
            </Typography>
            <Typography textAlign='center'>
                where <Tex>{'X'}</Tex> is a point on the reference material configuration. 
            </Typography>
        </Stack>

        <Typography>
            Each term in Eq. 2 represents internal energy <Tex>{'(\\delta W^{int})'}</Tex>, 
            external energy <Tex>{'(-\\delta W^{ext})'}</Tex>, and
            kinetic energy <Tex>{'(\\delta W^{kin})'}</Tex>, respectively.
        </Typography>
        <Typography>
            Given the arbitrary nature of the variation <Tex>{'\\delta u'}</Tex>, the forces can be promptly determined using Eq. 2.
            The external forces, denoted as <Tex>{'f^{ext}'}</Tex>, encompass the intra-uterine pressure and maternal bearing down forces.
            On the other hand, the kinetic forces, represented as <Tex>{'f^{kin}'}</Tex>, are determined within the TLED update loop.
            This implies that only the internal forces necessitate further consideration:
        </Typography>
        
        <Typography textAlign='center'>
            [3]: <Tex> 
                {'f^{int} = \\int_{\\Omega_{0}} \\frac{\\partial \\mathbf{P}}{\\partial X} d \\Omega_{0}'}
            </Tex>
        </Typography>


       <Typography>
            By utilizing shape functions <Tex>{'N'}</Tex> and the matrix of shape 
            function derivatives <Tex>{'\\partial\\mathbf{h}'}</Tex>, we approximate the 
            internal forces <Tex>{'f^{int}'}</Tex> as nodal forces <Tex>{'f'}</Tex>.
            This approximation involves expressing the first Piola-Kirchhoff (FPK) stress tensor <Tex>{'\\mathbf{P}^T'}</Tex> 
            in terms of the second Piola-Kirchhoff (SPK) stress <Tex>{'\\mathbf{S}'}</Tex> and introducing the deformation 
            gradient <Tex>{'\\mathbf{F}'}</Tex>. The resulting nodal force can be expressed as:
         </Typography>
        
        <Typography textAlign='center'>
            [4]: <Tex>
                {
                    'f= \\int_{\\Omega_{0}} \\frac{\\partial N}{\\partial X}\\mathbf{P}^{T}d\\Omega_{0} ='+
                    '\\int_{\\Omega_{0}} \\partial \\mathbf{h} \\mathbf{P}^Td\\Omega_{0} = \\int_{\\Omega_{0}} \\partial \\mathbf{hSF}^Td\\Omega_{0}'
                }
            </Tex>
        </Typography>

        <Typography>
            To compute the integral mentioned above, a numerical approach is necessary. 
        </Typography>

        <Typography>
            Consider a continuous function <Tex>{'\\phi'}</Tex> of natural element coordinates <Tex>{'\\xi, \\eta, \\zeta :'}</Tex>
        </Typography>

        <Typography textAlign='center'>
            [5]: <Tex>
                {
                    '\\int _{\\Omega } \\phi (\\xi ,\\eta ,\\zeta ){\\mathrm{d}}\\Omega =' +
                    '\\int \\,\\int \\,\\int_{-1}^{1} \\phi (\\xi ,\\eta ,\\zeta ){\\mathrm{d}}\\xi {\\mathrm{d}}\\eta {\\mathrm{d}}\\zeta'
                }
            </Tex>
        </Typography>

        <Typography>
            The approximation of this integral can be achieved using three-dimensional Gaussian quadrature integration.
            By selecting quadrature points in each dimension, a triple summation is obtained by multiplying the three-dimensional 
            weights with the function value at each quadrature point. To simplify this triple summation, it is often condensed into 
            a single summation. This is done by multiplying the weights in each dimension together, resulting in a single weight
            for each of the <Tex>{'n_q'}</Tex> quadrature points.
        </Typography>   
        
        <Typography textAlign='center'>
            [6]: <Tex>
                {'\\int_{\\Omega } \\phi (\\xi ,\\eta ,\\zeta ){\\mathrm{d}}\\Omega \\approx \\sum_{q=1}^{n_q} w_q \\phi (\\xi_q,\\eta_q,\\zeta_q)'}
            </Tex> 
        </Typography>
        
        <Typography>
            For tetrahedral elements, the Jacobian: <Tex>{'J = det\\left( \\frac{\\partial X}{\\partial e_c}\\right) = 6V_0'}</Tex> for 
            element natural coordinates <Tex>{'e_c = \\{ \\xi ,\\eta ,\\zeta \\}'}</Tex> and the volume of the undeformed 
            tetrahedron <Tex>{'V_0'}</Tex>. Yielding the following expression:
        </Typography>

        <Typography textAlign='center'>
            [7]: <Tex>
                {
                    'd \\Omega _0 = \\frac{1}{6}J {\\mathrm{d}}\\xi {\\mathrm{d}}\\eta {\\mathrm{d}}\\zeta ='+
                    'V_0 {\\mathrm{d}}\\xi {\\mathrm{d}}\\eta {\\mathrm{d}}\\zeta'
                }
            </Tex>
        </Typography>

        <Typography>
            By substituting Eq. 7 into Eq. 4 and utilizing Eq. 6 for numerical integration, the resulting equation is:
        </Typography>
        <Typography textAlign='center'>
            [8]: <Tex>
                {
                    'f = \\int \\,\\int \\,\\int _{0}^{1} V_0 \\partial {\\mathbf {h}}{\\mathbf {SF}}^{{\\mathrm{T}}}' +
                    '{\\mathrm{d}}\\xi {\\mathrm{d}}\\eta {\\mathrm{d}}\\zeta \\approx \\sum _{q=1}^{n_q} w_q V_0' +
                    '\\partial {\\mathbf {h}}{\\mathbf {SF}}^{{\\mathrm{T}}}'
                }
            </Tex>
        </Typography>
        <Typography>
            Since the integration range in the above equation is [0, 1] instead of the canonical range of [-1, 1],
            the weights in each dimension are scaled to 1. As a result, the combined weight <Tex>{'w_q'}</Tex> across the three dimensions 
            is also equal to 1. Therefore, Eq. 8 can be simplified to:
        </Typography>
        <Typography textAlign='center'>
            [9]: <Tex>
                {'f = V_0 \\partial {\\mathbf {h}}{\\mathbf {SF}}^{{\\mathrm{T}}}'}
            </Tex>
        </Typography>
        
        <Typography>
            The deformation gradient <Tex>{'\\mathbf{F}'}</Tex> in Eq. 9 can be dervied 
            from <Tex>{'\\mathbf{F} = \\partial \\mathbf{h}u + \\mathbf{I}'}</Tex> with the identity matrix <Tex>{'\\mathbf{I}'}</Tex>.
            Finally, to derive <Tex>{'\\partial\\mathbf{h}'}</Tex>, 
            the chain rule is applied to the matrix of shape function derivatives:
        </Typography>
        
        <Typography textAlign='center'>
            [10]: <Tex>
                {
                    '\\partial {\\mathbf {h}} = \\frac{\\partial N}{\\partial X} = \\frac{\\partial N}{\\partial e_c}\\frac{\\partial e_c}{\\partial X} =' +
                    '\\frac{\\partial N}{\\partial e_c}\\left( \\frac{\\partial X}{\\partial e_c}\\right) ^{-1}'
                }
            </Tex>
        </Typography>

        <Typography>
            The shape functions for a constant strain tetrahedral element are as follows:
        </Typography>

        <Stack ml={1}>
            <Typography>[11]: <Tex>{'N_1(\\xi ,\\eta ,\\zeta )=\\xi'}</Tex></Typography>
            <Typography>[12]: <Tex>{'N_2(\\xi ,\\eta ,\\zeta )=\\eta'}</Tex></Typography>
            <Typography>[13]: <Tex>{'N_3(\\xi ,\\eta ,\\zeta )=\\zeta'}</Tex></Typography>
            <Typography>[14]: <Tex>{'N_4(\\xi ,\\eta ,\\zeta )=1-\\xi-\\eta-\\zeta'}</Tex></Typography>
        </Stack>
        
        <Typography>
            The Jacobian matrix, <Tex>{'\\mathbf{J}'}</Tex>, is given by: 
        </Typography>
        
        <Stack alignItems='center'>
            <Typography textAlign='center'>
                [15]: <Tex>
                    {
                        '{\\mathbf {J}} = \\frac{\\partial X}{\\partial e_c} = {\\mathbf {X}} \\frac{\\partial N}{\\partial e_c} =' +
                        '\\left['+
                        '\\begin{array}{cccc} x_1 &{} x_2 &{} x_3 &{} x_4 \\\\ y_1 &{} y_2 &{} y_3 &{} y_4 \\\\ z_1 &{} z_2 &{} z_3 &{} z_4 \\end{array}' +
                        '\\right] \\ \\left[' + 
                        '\\begin{array}{ccc} 1 &{} 0 &{} 0 \\\\ 0 &{} 1 &{} 0 \\\\ 0 &{} 0&{} 1 \\\\ -1 &{} -1 &{} -1 \\end{array}' + 
                        '\\right]'
                    }
                </Tex>
            </Typography>
            <Typography> 
                where <Tex>{'\\mathbf{X}'}</Tex> is the matrix of nodal coordinates.
            </Typography>
        </Stack>
        
        <Typography>
            Simplifying Eq. 15, works out to:
        </Typography>

        <Stack alignItems='center'>
            <Typography>
                [16]: <Tex>{
                    '{\\mathbf {J}} = \\left[' +
                        '\\begin{array}{ccc}' + 
                            'x_1 - x_4 &{} x_2 - x_4 &{} x_3 - x_4 \\\\' + 
                            'y_1 - y_4 &{} y_2 - y_4 &{} y_3 - y_4 \\\\' + 
                            'z_1 - z_4 &{} z_2 - z_4 &{} z_3 - z_4' +
                        '\\end{array}' +
                    '\\right] = ' + 
                    '\\left[' + 
                        '\\begin{array}{c}' + 
                            'E_1 \\\\ E_2 \\\\ E_3' + 
                        '\\end{array}' + 
                    '\\right] ^{{\\mathrm{T}}}'
                }</Tex>
            </Typography>
            <Typography>
                where <Tex>{'E_i'}</Tex> are column vectors representing the tetrahedral edges.
            </Typography>
        </Stack>

        <Typography>
            Finally, <Tex>{'\\partial\\mathbf{h}'}</Tex> can be dervied by substituting Eq. 16 into Eq. 10.
        </Typography>

        <Typography textAlign='center'>
            [17]: <Tex>{
                '\\partial {\\mathbf {h}} = \\frac{\\partial N}{\\partial e_c}\\left[ \\begin{array}{ccc} E_1&E_2&E_3 \\end{array} \\right] ^{-1}'
            }</Tex>
        </Typography>

        <References referenceList={referenceList}/>
    </Stack>

}

export default TLED
