import { useEffect } from 'react'
import ReactGA from 'react-ga4'


const usePageHit = (route: string, title: string) => {
    useEffect(() => {
        ReactGA.event({
            category: 'Hit',
            action: 'Page Hit',
            label: `${title} (${route})`,
            transport: 'beacon'
        })
    }, [])
}

export default usePageHit
