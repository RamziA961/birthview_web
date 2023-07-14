import { TPerson } from "./people"

export type TPublication = {
    title: string,
    authors: string[],
    year: number
    journal?: string,
    publisher: string,
    publicationType: string,
    url: string
}

export type TPublicationAndAuthors = {
    title: string,
    authors: TPerson[],
    year: number
    journal?: string,
    publisher: string,
    publicationType: string,
    url: string
}


const publicationsInfo : TPublication[] = [
    {
        title: 'A computer-based simulation of childbirth using the partial Dirichlet–Neumann contact method with total Lagrangian explicit dynamics on the GPU',
        authors: [
            'Rudy Lapeer',
            'Zelimkhan Gerikhanov',
            'Said-Magomed Sadulaev',
            'Vilius Audinis',
            'Roger Rowland',
            'Kenda Crozier',
            'Edward Morris',
        ],
        year: 2019,
        journal: 'Biomechanics and Modeling in Mechanobiology',
        publisher: 'SpringerLink',
        url: 'https://doi.org/10.1007/s10237-018-01109-x',
        publicationType: 'Journal Article'
    },
    {
        title: 'Simulating the cardinal movements of childbirth using finite element analysis on the graphics processing unit',
        authors: [
            'Zelimkhan Gerikhanov',
        ],
        year: 2017,
        publisher: 'University of East Anglia',
        publicationType: 'Doctoral Thesis',
        url: 'https://ueaeprints.uea.ac.uk/id/eprint/64077'
    },
    {
        title: 'Towards increased realism of a computer simulation of human childbirth.',
        authors: [
            'Said-Magomed Sadulaev'
        ],
        year: 2019,
        publisher: 'University of East Anglia',
        publicationType: 'Doctoral Thesis',
        url: 'https://ueaeprints.uea.ac.uk/id/eprint/79638'
    },
    {
        title: 'A Haptic User Interface to Assess the Mobility of the Newborn\'s Neck',
        authors: [
            'Said-Magomed Sadulaev',
            'Rudy Lapeer',
            'Zelimkhan Gerikhanov',
        ],
        year: 2017,
        journal: '21st International Conference Information Visualisation (IV)',
        publisher: 'IEEE',
        url: 'https://doi.org/10.1109/iV.2017.48',
        publicationType: 'Conference Paper'
    },
    {
        title: 'Computer-based simulation of the effects of instrumental delivery on the fetal head',
        authors: [
            'Vilius Audinis'
        ],
        publisher: 'University of East Anglia',
        year: 2017,
        publicationType: 'Doctoral Thesis',
        url: 'https://ueaeprints.uea.ac.uk/id/eprint/63688'
    },
    {
        title: 'A Computer-Based Simulation of Obstetric Forceps Placement',
        authors: [
            'Rudy Lapeer',
            'Vilius Audinis',
            'Zelimkhan Gerikhanov',
            'Olivier Dupuis',
            'Edward Morris',
        ],
        year: 2014,
        journal: 'Medical Image Computing and Computer-Assisted Intervention',
        publisher: 'Springer Link',
        url: 'https://doi.org/10.1007/978-3-319-10470-6_8',
        publicationType: 'Conference Paper'
    },
    {
        title: 'A computer-based simulation of vacuum extraction during childbirth',
        authors: [
            'Rudy Lapeer',
            'Zelimkhan Gerikhanov',
            'Vilius Audinis'
        ],
        year: 2014,
        publisher: 'UEA Prints',
        journal: 'SIMULIA Regional User Meetings',
        url: 'https://ueaeprints.uea.ac.uk/id/eprint/56987',
        publicationType: 'Workshop Item'
    }
]

export default publicationsInfo
