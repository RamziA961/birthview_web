import { LinkProps, Link } from "react-router-dom"
import { Dispatch, ReactElement } from "react"

import { DispatchAction } from "../reducer/Reducer"
import { TDispatchAction } from '../reducer/AppState'

import routeInfo from "../../assets/routes"

const LocalLink = (props: {
    dispatch: Dispatch<TDispatchAction>, 
    children: ReactElement
} & LinkProps) : ReactElement => {
    const { dispatch, children, ...linkProps } = props
    
    const desiredPage = Object.values(routeInfo)
        .filter(v => v.path === linkProps.to.toString())

    if(desiredPage.length === 0)
        return <Link {...linkProps}> {children} </Link>

    return <Link 
        {...linkProps} 
        onClick = {() => dispatch(DispatchAction('setActivePage', {'activePage': desiredPage[0]}))}
    >
        {children}
    </Link>
}

export default LocalLink
