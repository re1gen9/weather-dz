import axios from "axios"
import {WEATHER_API_URL, WEATHER_API_APP_ID} from "./config.js"
import {GetWeatherLogs} from "./console-log.js"

export async function showWeather(dataForSearch) {
    return GetWeatherLogs(getWeather, dataForSearch)
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