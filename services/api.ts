import { MediaType, TrendingResult } from "~/interfaces/apiresults"

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY

export const getTrending = async (page: number = 1): Promise<TrendingResult> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`
    )

    const jsonResponse = await response.json()
    return jsonResponse
}

export const getSearchResults = async (query: string): Promise<TrendingResult> => {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?language=en-US&api_key=${API_KEY}&query=${encodeURIComponent(query)}`)

    const jsonResponse = await response.json()
    return jsonResponse
}

export const getMovieDetails = async (id: number, type: MediaType): Promise<any> => {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${API_KEY}`)

    const jsonResponse = await response.json()
    return jsonResponse
}