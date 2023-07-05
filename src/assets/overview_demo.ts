export type TDemoSlide = {
    title: string,
    description: string,
    src: string
}



const demoSlides : TDemoSlide[] = [
    {
        title: 'Initial Position',
        description: 'The image demonstrates the baby\'s initial position as the second stage of labour begins. The current version of Birthview is capable of simulating childbirth with the baby in occiput anterior (OA) position. OA implies that the back of the baby’s head presents to the front of the maternal pelvis near the time of expulsion and is the most common presentation.',
        src: '/simulation_demo/1.png'
    },
    {
        title: 'Flexion',
        description: 'In this stage of the simulation, uterine pressure is applied to the fetus, causing it to move downward through the cervix and into the birth canal. As this happens, the baby\'s head comes into contact with the pelvic tissue, resulting in a movement called flexion. Flexion, as seen in the simulation image, refers to a specific position of the baby\'s head during childbirth. The pressure exerted by the pelvic tissue causes the baby\'s head to bend forward, aligning the chin with the chest. This flexed position allows for a smoother passage through the birth canal.',
        src: '/simulation_demo/2.png'
    },
    {
        title: 'Internal Rotataion',
        description: 'In this image from the BirthView simulation, we can observe an essential process called internal rotation during childbirth. Internal rotation is a cardinal movement that helps facilitate the passage of the baby\'s head through the varying diameter of the pelvis. During internal rotation, the baby\'s head undergoes a natural adjustment. It transitions from a sideways position to facing backward relative to the mother\'s body. This rotation is necessary to align the baby\'s head with the optimal position for a smooth passage through the birth canal.',
        src: '/simulation_demo/3.png'
    },
    {
        title: 'Extension Begins',
        description: 'In this image from the BirthView simulation, we can observe the initial stage of extension during childbirth. Extension is a significant movement that occurs as the baby progresses through the birth canal. This particular image captures the beginning of this process. During extension, the baby\'s head starts to tilt backward relative to the body. This movement allows the baby\'s head to pass under the pubic bone and align with the rest of the body for delivery.',
        src: '/simulation_demo/4.png'
    },
    {
        title: 'Extension Ends',
        description: 'This image from the BirthView simulator captures the end of extension, a cardinal movement during childbirth. The baby\'s head has emerged from the birth canal, with the chin and head facing outward. This position signifies the completion of extension and allows for the smooth delivery of the rest of the baby\'s body, pending external rotation and expulsion.',
        src: '/simulation_demo/5.png'
    },
    {
        title: 'External Rotation',
        description: 'This image from the BirthView simulator highlights the process of external rotation during delivery. As the baby\'s head emerges from the birth canal, it undergoes a crucial movement where it begins to rotate externally. This rotation is necessary for the baby\'s head to align with the position of the mother\'s body. External rotation plays a vital role in facilitating the smooth delivery of the baby\'s shoulders and the rest of the body. The image precisely captures the significant moment when the baby\'s head initiates the repositioning process, facing towards the mother\'s side.',
        src: '/simulation_demo/6.png'
    }
    

]

export default demoSlides
