import { useEffect } from 'react'
import ReactGA from 'react-ga4'


const usePageHit = (route: string, title: string) => {
    useEffect(() => {
        ReactGA.send({hitType:'pageview', title: title, page: route})

        // ReactGA.event({
        //     category: 'Page',
        //     action: 'Hit',
        //     label: `${title} (${route})`,
        // })
    }, [])
}

export default usePageHit
