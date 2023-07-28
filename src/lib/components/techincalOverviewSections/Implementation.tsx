import { Divider, Stack, Typography, TypographyProps } from "@mui/material"
import { ReactElement } from 'react'
import References from "../References"
import LabeledImage from "../LabeledImage"
import Tex from "../Tex"

import { AlgorithmTabs, InlineCode } from '../Algorithms/Algorithms'
import AlgoOne from "./algorithms/tledPrecomputation"
import AlgoTwo from "./algorithms/tledElementPreProcessing"
import AlgoThree from "./algorithms/nodalProcessing"
import AlgoFour from "./algorithms/projectionBasedContact"


const Implementation = (props: {
    titleProps: TypographyProps,
    subHeaderProps: TypographyProps
}) : ReactElement => {
    const { titleProps, subHeaderProps } = props

    const referenceList = [
        'Lapeer, R., Gerikhanov, Z., Sadulaev, S.M., Audinis, V., Rowland, R., Crozier, K. and Morris, E., 2019. A computer-based simulation of childbirth using the partial Dirichlet–Neumann contact method with total Lagrangian explicit dynamics on the GPU. Biomechanics and modeling in mechanobiology, 18, pp.681-700.',
        'Gerikhanov, Z., 2017. Simulating the cardinal movements of childbirth us{ing finite element analysis on the graphics processing unit (Doctoral dissertation, University of East Anglia).', 
        'Stone, J.E., Gohara, D. and Shi, G., 2010. OpenCL: A parallel programming standard for heterogeneous computing systems. Computing in science & engineering, 12(3), p.66.',
        'Nystrom, R., 2014. Game programming patterns. Genever Benning.',
        'Refactoring Guru and Zhart, D., 2014. Observer. [online] Refactoring Guru. Available at: https://refactoring.guru/design-patterns/observer.',
        'Reinders, J., 2007. Intel threading building blocks: outfitting C++ for multi-core processor parallelism. O\'Reilly Media.',
        'König, B., 2008. OpenCL Memory Model. [Online Image] Wikipedia. Available at: https://de.wikipedia.org/wiki/Datei:OpenCL_Memory_model.svg.',
        'Courant, R., Friedrichs, K. and Lewy, H., 1928. Über die partiellen Differenzengleichungen der mathematischen Physik. Mathematische annalen, 100(1), pp.32-74.',
    ]


    return <Stack gap={1}>
        <Typography {...titleProps}>
            Implementation
        </Typography>

        <Typography>
            The BirthView simulation system is implemented in C++, providing a cross-platform capability 
            that enables compilation on various popular platforms. General-purpose GPU calculations are 
            incorporated using the OpenCL framework (Stone et al. 2010), offering enhanced portability 
            across operating systems and GPU vendors.
        </Typography>
        
        <Typography {...subHeaderProps}>
       
            Entity Component System
        </Typography>

        <Typography>
            The birth simulation software is built on an entity-component system (ECS)
            architecture (Nystrom 2014). The ECS architecture is commonly used in computer game-style 
            software, where multiple entities share generic components. In this system,
            an entity represents an object, such as the fetal head, pelvis, or pelvic floor muscle.
            It encapsulates the object's attributes like position, orientation, and velocity,
            while the behavior of the object is defined by separate generic components associated 
            with systems like rendering, physics, UI, camera, keyboard, and windows. This 
            decoupling of behavior from the object allows for modular and flexible software design. 
        </Typography>

        <Typography>
            The ECS architecture is considered preferable over a traditional OOP approach for the 
            BirthView. In the OOP approach, using hierarchies of classes can lead to complexity issues. 
            Specifically, when modeling the functionalities of the fetal head, a deep hierarchy 
            of classes would be required, introducing redundancy and making it difficult to modify the 
            functionality by modifying the hierarchy.
        </Typography>

        <Typography>
            Additionally, if another object, such as the pelvis, needs to be modeled, it may 
            require rendering functionality but not the same dynamic rigid body behavior as the fetal head.
            In the OOP approach, inheriting from a Renderable class would also inherit all the other 
            classes in the hierarchy, leading to redundancy and a fragile design.
        </Typography>

        <Typography>
            In contrast, the ECS architecture allows for a more modular and flexible design.
            Each entity, such as the fetal head or pelvis, is composed of generic components that 
            define its attributes and behaviors. This decoupling of functionality from the hierarchy 
            eliminates redundancy and simplifies modifications. It provides a more scalable solution,
            allowing new entities to be added without impacting the existing structure.
        </Typography>

        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
             <LabeledImage
                maxWidth='45%'
                width='100%'
                orientation='horizontal'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/implementation/oop_bv.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The hierarchical representation of the fetal head entity using OOP. The complex structure 
                    involves multiple layers of inheritance, resulting in significant computational and memory overhead
                    (Gerikhanov, 2017).
                </Typography>
            </LabeledImage>
            <LabeledImage
                maxWidth='44%'
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/implementation/ecs_bv.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    ECS diagram of the fetal head. The diagram showcases the decoupled nature of the ECS architecture,
                    where components are used to define the specific functionalities of the fetal head entity.
                    No inheritance is required, and the lines indicate references between components 
                    (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
            An entity in the simulation system serves as an identifier for discernible objects, including 
            the pelvis, skull, pelvic floor, and more. However, the entity itself does not represent 
            these objects but provides them with an identity. It can also identify non-visible objects 
            such as cameras, attachment points, or force field origins. The entity typically encapsulates 
            properties like position, orientation, scaling, and name.
        </Typography>
        <Typography>
            Components play a crucial role in adding features and behaviors to entities. Without any 
            attached components, an entity lacks functionality and serves as a dummy object. 
            By adding specific sets of components, entities can model objects of various types.
            For example, a rendering component can provide visual representation and rendering 
            properties to an entity, allowing it to be displayed on the screen.
            A physics component can enable physical interactions and apply forces to the entity.
            Other types of components may include sound, collision, input, animation, or AI, 
            depending on the requirements of the simulation.
        </Typography>
        <Typography>
            Systems, on the other hand, encapsulate distinct functionalities of the system as a whole.
            They operate on entities that meet specific criteria. Examples of systems implemented 
            in BirthView include rendering, physics, GUI, manipulator, selection, camera, mouse,
            keyboard, windowing, and collision systems. Each system is responsible for its designated 
            functionality, such as rendering, physics updates, GUI management, and collision detection.
            It's important to note that system functionality is not entity-specific,
            but rather applicable to entities that meet certain criteria.
        </Typography>
        
        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            System Concurrency
        </Typography>
        <Typography>
        For optimal performance, certain simulation functions in BirthView are executed in parallel. Most systems described earlier can be run independently as they have no inter-dependencies.
        </Typography>
        
        <Typography>
            The update system in BirthView serves as the primary source of concurrent updates. It utilizes the observer pattern (Refactoring Guru 2014), where the update event acts as the subject, and the systems that require concurrent actions act as observers.
        </Typography>
        
        <Typography>
            However, in some cases, certain systems need access to the results of another system's update, creating dependencies. For example, rendering systems may need to enqueue render calls synchronously. A traditional mutex-based solutions can lead to live-locks or dead-locks in complex scenarios, causing systems to stall.
        </Typography>
        
        <Typography>
        To address this, BirthView leverages an alternative solution. The functionality of systems with no inter-dependencies is left to run concurrently. For the part of functionality with inter-system access dependencies, a sync event was introduced in the update system. This sync event calls the observer's callbacks sequentially and triggers only after all parallel threads have joined (synchronized). This approach ensures both efficient parallel execution and synchronized access when necessary.
        </Typography>

        <Typography>
            The figure below illustrates the basic representation of the approach. During the parallel stage, all tasks that can run independently execute concurrently. The duration of this stage is determined by the longest task, which is the TLED update in this scenario.
        </Typography>

        <Stack alignItems='center'>
            <LabeledImage
                orientation="horizontal"
                maxWidth="60%"
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/implementation/update_loop.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Flow chart of the processes involved in the childbirth simulation. Concurrent updates with a sync event at the end of each frame, illustrating all systems synchronizing. Following the synchronizing event, additional tasks are executed synchronously (Gerikhanov 2017).
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
        The current implementation of parallel execution is based on the C++11 standard 
        library's <InlineCode>std::thread</InlineCode> class. The observer callbacks, represented as instances of
        the <InlineCode>std::function</InlineCode> class, are stored in an <InlineCode>std::vector</InlineCode>. 
        The parallel execution begins at a point known as the "fork," where a set of <InlineCode>std::thread</InlineCode> instances is 
        created, each responsible for invoking the corresponding callbacks.
        </Typography>
        <Typography>
            To achieve the most optimal workload distribution, the tasks are ideally divided equally among all CPU cores. When the number of tasks matches or is less than the number of CPU cores, each core is assigned one task, ensuring an even load distribution. However, when the number of threads exceeds the available CPU cores, the CPU is forced to perform time-slicing and context switches. These context switches result in significant CPU time being spent without productive work, which negatively impacts the overall performance of the simulation system. To avoid this issue and optimize performance, it is preferable to spawn only as many threads as there are available CPU cores.
        </Typography>

        <Typography>
            The workload can be distributed among the threads by dividing the tasks equally when the number of tasks <Tex>{'(N_t)'}</Tex> is exactly divisible by the 
            number of cores <Tex>{'(N_c)'}</Tex>. However, in cases where the number of tasks is not evenly divisible by the number of cores, 
            the first <Tex>{'N_c - 1'}</Tex> threads will receive subtasks, of size <Tex>{'(N_{sub})'}</Tex>, while the remaining thread receives a
            task size <Tex>{'< N_{sub}'}</Tex>. <Tex>{'N_{sub}'}</Tex> can be calculated using the following formula: 
        </Typography>
        <Typography textAlign='center'>
            [29]: <Tex>{'N_{sub} = \\frac{N_t}{N_c}'}</Tex>
        </Typography>

        <Typography>
           To improve the performance and avoid the overhead of frequent thread spawning and destruction, BirthView employs a thread pool, which is a highly efficient implementation as described in (Reinders 2007). The thread pool operates based on the principle that a fixed number of threads are pre-allocated and stored in an array (the pool). Arbitrary tasks are then scheduled into a queue. Each thread in the pool takes a task from the queue, processes it, and after execution, continues to process other tasks from the queue without being destroyed. This way, the threads are reused for multiple tasks, reducing the overhead associated with thread creation and destruction.
        </Typography>
        
        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            General Purpose Computation on GPU
        </Typography>
        
        <Typography>
           When implementing FE and contact methods on a GPU, a different approach is required compared to a CPU-only implementation. Several technical issues arise due to the parallel nature of GPU processing, memory access patterns, and the need to optimize data transfers between the CPU and GPU.  
        </Typography> 

        <Typography>
            GPUs have witnessed significant advancements in processing power, largely driven by the demand for high-quality graphics in computer games. Achieving high-quality visuals in games requires performing a vast number of calculations while keeping the calculation time extremely short. In the TV and cinema industry, the critical fusion frequency (CFF) sets the traditional threshold for the minimum frame rate, which is 24 frames per second (fps). At this frame rate, a series of images appears as continuous motion to the average human eye. However, the gaming industry operates on a different level of demand, where frame rates of 60 fps or more are highly desired.These higher frame rates are essential for delivering a smooth experiences.
    </Typography>
    <Typography>
            The pursuit of such high frame rates comes with the challenge of managing very short time budgets for calculations within each 
            frame: <Tex>{'\\Delta t = \\frac{1~s}{60~fps} = 0.1 \\overline{6}~s = 16.\\overline{66}ms'}</Tex>. To meet this demand, modern GPUs are equipped with a multitude of cores capable of processing data in parallel. This parallel processing capability enables GPUs to efficiently handle complex graphical calculations and generate the high frame rates needed.
        </Typography>

        <Typography>
            To achieve realistic visuals in computer games, a large number of calculations are involved, and these computations are subdivided into distinct tasks. Most of these tasks need to be completed within a single frame step, imposing the need for shorter time windows for each calculation. The nature of computation tasks in typical computer games often involves repetitive calculations with no dependencies on one another, making them excellent candidates for parallel processing. These tasks, referred to as parallelizable tasks, can be efficiently executed in parallel, taking advantage of modern GPUs' high parallel processing capabilities.
        </Typography>

        <Typography>
            BirthView's FEM calculations are also largely parallelizable. Tasks such as processing a large number of elements to identify stress tensors or performing time integration for node position evolution fall under this category. Each of these tasks, also known as sub-tasks, can be processed independently in parallel, with the total workload shared among the available parallel processing units.
        </Typography>

        <Typography>
        Previously, numerical methods for FEA were traditionally implemented on CPUs. However, porting these methods from CPU to GPU can be challenging due to the significant architectural differences between the two. GPUs employ the Single Instruction Multiple Thread (SIMT) architecture, which imposes specific constraints on algorithm design and implementation, making the porting process difficult, inefficient, or even infeasible in some cases (Göddeke 2011). Furthermore, GPUs utilize single-point precision over double-point precision, which can lead to increased computational speed but may also result in reduced accuracy for numerical calculations, overflow and underflow erros, and a loss of stability.
        </Typography>

        <Typography>
           Ensuring portability across various GPUs and hardware architectures is crucial for the implementation. This requirement necessitates the usage of cross-platform libraries and the avoidance of vendor-specific extenssions  to achieve broad compatibility and optimal performance across diverse computing environments. 
        </Typography>
        
        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}> 
            GPGPU with OpenCL and Performance Caveats 
        </Typography>

        <Typography>
            As previously mentioned, GPUs offer significantly higher performance compared to CPUs. However, to fully leverage this potential, careful consideration of the implementation approach is essential. Crucial aspects of GPGPU programming include minimizing locking operations, optimizing data layout and access patterns, and adopting branch-less code structures. Efficient parallel processing relies on avoiding data races and minimizing branching in the code to ensure all processing units work efficiently without idling.
        </Typography>

        <Typography>
            Optimizing data layout is another crucial factor for achieving better performance. GPUs are designed for fast access when specific data layouts and access patterns are employed. Largely localized access patterns, where read and write operations occur within specific regions in memory, are preferred to ensure the most optimized performance.
        </Typography>

        <Stack alignItems='center'>
             <LabeledImage
                maxWidth='45%'
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/implementation/open_cl_memory.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    OpenCL Memory Model (König 2008). The local memory offers small but very fast memory access. The global memory is accessible from all threads but comes with significant access time overheads.
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
            GPGPU programming favors a branch-less code structure to avoid divergence between different processing units. Divergence occurs when some tasks take longer to execute than others, causing some processing units to idle while waiting for the slower tasks to finish. By minimizing branching in the code, all processing units can work efficiently without idling, leading to better performance.
        </Typography>

        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography {...subHeaderProps}>
            TLED GPU Implementation
        </Typography>
        
        <Typography> 
        The need for real-time rates in BirthView demands computations to be completed within short time periods, ideally smaller than 16 ms. To achieve this, several underlying systems run in parallel. The TLED implementation is executed on the GPU utilizing the OpenCL API. The figure below provides an overview of each stage in the TLED implementation. The pre-computation step is performed only once, while the nodal and elemental updates are continually updated in an iterative cycle with data exchange between the two kernels. 
        </Typography>

        <Stack direction='row-reverse' gap ={1} alignItems='center'>

             <LabeledImage
                maxWidth='45%'
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/implementation/tled_gpu.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The essential stages of the TLED algorithm, as implemented in the childbirth simulation software, involving continuous data exchange between the two kernels (Lapeer et al. 2019). <Tex>{'S_{\\mathrm{PK}}'}</Tex> represents the second Piola–Kirchoff stress.
                </Typography>
            </LabeledImage>
        
            <Stack gap={1}>
                <Typography>
                    The nodal displacement updates at the next time step <Tex>{'t + 1'}</Tex> are calculated using an explicit FE solver with Verlet numerical integration:
                </Typography>
                <Typography>
                    [30]: <Tex>{'u_{t+1} = A({\\mathbf {R}}_t - {\\mathbf {F}}_t) + Bu_t + Cu_{t-1}'}</Tex>
                </Typography>
                <Typography> where <Tex>{'u'}</Tex> is the nodal displacement, <Tex>{'\\mathbf{R}_t'}</Tex>, the external force vector, <Tex>{'\\mathbf{F}_t'}</Tex> the internal force vector, both at time <Tex>{'t'}</Tex> and the pre-computed constants <Tex>{'A, B, C'}</Tex> are:
                </Typography>
                <Stack direction='row' gap={1} alignItems='center' width='100%'>
                    <Typography>[31]:</Typography>
                    <Tex>{'A= (\\frac{1}{\\Delta t^2} \\mathbf {M} + \\frac{1}{2 \\Delta t} \\mathbf {C})^{-1},'}</Tex>
                    <Tex>{'B= \\frac{2}{\\Delta t^2} \\mathbf {M} A,'}</Tex> 
                    <Tex>{'C= \\frac{1}{2 \\Delta t} \\mathbf {C} A + \\frac{B}{2}'}</Tex>
                </Stack>
                <Typography>
                    where <Tex>{'\\mathbf{M}'}</Tex> is the mass matrix and <Tex>{'\\mathbf{C}'}</Tex> the damping matrix. Convergence to the correct solution is conditional to a sufficiently small time step, <Tex>{'\\Delta t'}</Tex>, according to the Courant-Friedrichs-Lewy (CFL) condition (Courant et al. 1928).
                </Typography>
            </Stack>

        </Stack>

        <Stack alignItems='center'>
             <LabeledImage
                maxWidth='100%'
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/implementation/tled_class_diagram.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    Class diagram showcasing the TLED implementation in the childbirth simulation software.
                    The crucial computations are carried out within the <InlineCode>Calculator</InlineCode> subclasses, while 
                    the <InlineCode>Assembly</InlineCode> class manages and stores the FE data.
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
            The primary nodal boundary condition (BC) utilized in the pDN method involves a plane constraint. When a penetrating slave node with a plane constraint is encountered, it is projected onto the master surface plane, which is defined by the plane equation's four parameters. The contact detection process is executed on the CPU. The interaction between the contact and TLED processes is depicted in the figure below. During the sync event, data is exchanged between the CPU (contact) and GPU (TLED). This enables TLED to use the latest contact conditions as boundary conditions until the next sync event, while considering the latest nodal deformations to be constant in the contact detection process until the next sync event.
        </Typography>

        <Stack alignItems='center'>
             <LabeledImage
                maxWidth='100%'
                width='100%'
                style={{ 
                    objectFit: 'scale-down',
                }}
                src='/implementation/contact_tled_gpu.png'
            >
                <Typography variant='subtitle2' textAlign='center' flexWrap='wrap' mx = {2}>
                    The contact method, executed on the CPU, generates the contact boundary conditions (Lapeer et al. 2019). During the sync event, data is exchanged between the CPU (contact) and GPU (TLED). The GPU's TLED process involves green and orange sub-tasks, representing per-element and per-node kernels, respectively.
                </Typography>
            </LabeledImage>
        </Stack>

        <Typography>
            To optimize performance, the system employs amortized contact detection, executing contact once per frame instead of at every TLED subtask step (orange and green blocks in the figure above), which requires a complete TLED update each time. The per-frame simulation time step is set to 16 ms, while TLED subtask time steps are much smaller. This approach allows the system to update in real-time, as performing CPU-processed contact detection at every TLED subtask step would be impractical due to data transfer overheads.
        </Typography>

        
        <Divider 
            orientation='horizontal' 
            variant='middle' 
            flexItem
            sx = {{ width: '40%', mx: 'auto', my: 1}}
        />

        <Typography { ...subHeaderProps }>
            Relevant Algorithms
        </Typography>
        
        <AlgorithmTabs>
            {/* Could be cleaned Up */}
            {/* Must support (props: Any) => ReactElement<AlgorithmProps> */}
            {AlgoOne()}
            {AlgoTwo()}
            {AlgoThree()}
            {AlgoFour()}
            {/* * * * * * * * * * */}
        </AlgorithmTabs>

        <References referenceList={referenceList}/>
    </Stack>
}

export default Implementation
