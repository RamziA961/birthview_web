import { useEffect, useState } from "react"
import ReactGA from 'react-ga4'

// Google Analytics hook. Send time spent on page.
const useTimeSpent = (route: string, title: string) => {
    const [time, _] = useState(Date.now())
    
    useEffect(() => {
        console.log(title, 'time event added.')
        return () => {
            const timeSpent = Math.round(Math.abs(Date.now() - time) / 1000)
            console.log(title, 'time event sent : ', timeSpent)
            ReactGA.event({
                category: 'Time Spent',
                action: 'Page',
                label: `${title} (${route})`,
                value: timeSpent,
                transport: 'beacon'
            })
        }
    }, [])
}

export default useTimeSpent
