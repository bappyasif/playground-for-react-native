import { useEffect, useState } from "react"

export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // update debounced value afer time delay
        const updater = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // prevent debounced value from updating when there is a chnage of delay or value within timeout duration
        // timeout gets restarted when there is any changes during that timer
        return () => clearTimeout(updater)
    }, [value, delay])

    return {debouncedValue}
}