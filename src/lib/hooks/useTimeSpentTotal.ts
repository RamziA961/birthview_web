import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'

const useTimeSpentTotal = () => {
    const [time, _] = useState(Date.now())

    useEffect(() => {
        return () => {
            const timeSpent = Math.ceil(Math.abs(Date.now() - time) / 1000)
            ReactGA.event({
                category: 'Time Spent',
                action: 'Website',
                value: timeSpent,
                transport: 'beacon'
            })
        }
    }, [])
}

export default useTimeSpentTotal
