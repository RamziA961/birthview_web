
export type TRoute = {
    path: string,
    title: string,
    position: number
}

export type TRouteMap = {[key: string]: TRoute}


const routeInfo : TRouteMap = {
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
