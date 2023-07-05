
export type TPerson = {
    name: string,
    affiliations?: string[],
    scholar?: string,
    email?: string,
    imageName?: string
}

const people: TPerson[] = [
    {
        name: 'Ramzi Abou Chahine',
        affiliations: ['University of East Anglia'],
        scholar: 'https://scholar.google.com/citations?user=swpS524AAAAJ',
        email: 'r.abou-chahine@uea.ac.uk',
    },
    {
        name: 'Rudy Lapeer',
        affiliations: ['University of East Anglia'],
        scholar: 'https://scholar.google.com/citations?hl=en&user=wh4kam4AAAAJ',
        email: 'r.lapeer@uea.ac.uk',
        imageName: 'rudylapeer.png'
    },
    {
        name: 'Samuel Scarfe',
        affiliations: ['University of East Anglia'],
        email: 's.scarfe@uea.ac.uk'
    },
    {
        name: 'Zelimkhan Gerikhanov',
        affiliations: ['University of East Anglia'],
        scholar: 'https://scholar.google.co.uk/citations?user=jQsOQFwAAAAJ&hl=en'
    },
    {
        name: 'Said-Magomed Sadulaev',
        affiliations: ['University of East Anglia'],
    }
]

export default people
