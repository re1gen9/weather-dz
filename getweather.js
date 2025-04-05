import axios from "axios"
import {WEATHER_API_URL, WEATHER_API_APP_ID} from "./config.js"

export async function showWeather(dataForSearch) {
    const res = await getWeather(dataForSearch.city, dataForSearch.lang)
    if(dataForSearch.tempOnly === true) {
        if(!res) return null
        return console.log(res?.main?.temp)
    } 
    return console.log(res)
}

async function getWeather(city, lang) {
    const params = {
        q: city,
        appid: WEATHER_API_APP_ID,
        lang: lang,
        units: 'metric'
    }
    return axios.get(WEATHER_API_URL, {
        params
      }).then((res) => res.data)
}