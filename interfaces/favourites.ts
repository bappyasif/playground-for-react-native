import { MediaType } from "./apiresults"

export type Favourites = {
    id: string,
    mediaType: MediaType,
    name: string,
    thumb: string
}