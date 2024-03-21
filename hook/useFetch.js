import { useEffect, useState } from "react"
// import { RAPID_API_KEY } from "@env"
import axios from "axios";
// const RapidAPIKey = RAPID_API_KEY

export const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        // params: {
        //   query: 'Python developer in Texas, USA',
        //   page: '1',
        //   num_pages: '1'
        // },
        params: {
            ...query
        },
        headers: {
            'X-RapidAPI-Key': "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524",
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await axios.request(options)

            setData(response.data?.data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        // setIsLoading(true);
        fetchData()
    }

    return {data, isLoading, error, refetch}
}