// "https://api.pexels.com/v1/search?query=nature&per_page=1"

const base_url = "https://api.pexels.com/v1/search?per_page=1"

import { createClient } from 'pexels';

const client = createClient('563492ad6f91700001000001ff1b2b316cff458fa9f5199597d08cf7');

export const getPictureBasedWeather = (weather: string, updateImgSrc: (url:string) => void) => {
    const query = weather || 'Nature';

    client.photos.search({ query, per_page: 1 }).then((photos: any) => {
        // console.log(photos.photos, "photos!!")
        updateImgSrc(photos.photos[0].src.portrait)
    });
}