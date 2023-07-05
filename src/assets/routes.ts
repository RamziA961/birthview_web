
export type TRoutes = {[key: string]: {
    path: string,
    title: string,
    position: number
}}


const routeInfo : TRoutes = {
    Overview: {
        path: '/',
        title: 'Overview',
        position: 0
    },
    TechnicalOverview: {
        path: '/technical',
        title: 'Technical Overview',
        position: 1
    },
    Publications: {
        path: '/publications',
        title: 'Publications',
        position: 2
    },
    People: {
        path: '/people',
        title: 'People',
        position: 3
    }
}

export default routeInfo
