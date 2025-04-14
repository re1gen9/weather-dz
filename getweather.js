import axios from "axios"
import {WEATHER_API_URL, WEATHER_API_APP_ID} from "./config.js"
import {Log} from "./console-log.js"

export async function showWeather(dataForSearch) {
    const response = await getWeather(dataForSearch.city, dataForSearch.lang)
    if(dataForSearch.tempOnly === true) {
        return Log.printLogs(Log.trueLog(response?.main?.temp))
    }
    return Log.printLogs(response)
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