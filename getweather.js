import axios from "axios"
import {WEATHER_API_URL, WEATHER_API_APP_ID} from "./config.js"
import {GetWeatherLogs} from "./console-log.js"

export async function showWeather(dataForSearch) {
    // здесь мы должны получать данные от getWeather
    // и тут выводить результат в консоль по нужному типу
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
        // обсудим catch
        // (хотя на слое выше он используется)
      }).then((res) => res.data)
    }