import routeInfo from '../../assets/routes'

export type TAppState = {
    activePage: string
}

export type TDispatchOperation = 'setActivePage'

export type TDispatchArgs = { [key: string]: any }

export type TDispatchAction = {
    operation: TDispatchOperation,
    payload?: TDispatchArgs
}

// Get the initial route used to navigate to the web app.
// Modifies URL to point to the homepage, if the requested route does not exist.
const initialRoute = (): string => {
    const currentPath = new URL(window.location.href)

    if(currentPath.pathname.length === 0) {
        return '/'
    }

    if(Object
        .values(routeInfo)
        .filter(entry => entry.path === currentPath.pathname)
        .length === 0
    ) {
        const stateObj = window.history.state
        window.history.replaceState(stateObj, stateObj?.title, `${currentPath.origin}/`)
        return '/'
    }
    return currentPath.pathname
}

export const initialState = () : TAppState => {
    return {
        activePage: initialRoute()
    }
}


// This nightmare creates a deep copy of any item passed in.
// It is necessary to ensure react can identify changes to states.
export const deepCopy = <T>(cloneable: T): T => {
    if (Array.isArray(cloneable))
        return cloneable.map(item => deepCopy(item)) as T
    else if (cloneable instanceof Date)
        return new Date(cloneable.getTime()) as T
    else if (cloneable && typeof cloneable === 'object')
        return Object.getOwnPropertyNames(cloneable).reduce((o, prop) => {
            Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(cloneable, prop)!)
            o[prop] = deepCopy((cloneable as { [key: string]: any })[prop])
            return o
        }, Object.create(Object.getPrototypeOf(cloneable)))
    else
        return cloneable
}
