import { useEffect } from "react"
import ReactGA from 'react-ga4'


const useWebsiteHit = () => {
    
    useEffect(() => {
        ReactGA.send({hitType: 'pageview', title: 'Website', page: '/'})
        // ReactGA.event({
        //     category: 'Website',
        //     action: 'Hit',
        //     label: 'Website',
        //     transport: 'beacon'
        // })
    }, [])
}

export default useWebsiteHit
