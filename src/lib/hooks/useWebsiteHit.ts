import { useEffect } from "react"
import ReactGA from 'react-ga4'


const useWebsiteHit = () => {
    
    useEffect(() => {
        ReactGA.event({
            category: 'Hit',
            action: 'Website Hit',
            transport: 'beacon'
        })
    }, [])
}

export default useWebsiteHit
