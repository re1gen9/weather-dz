import axios from "axios"
import {WEATHER_API_URL, WEATHER_API_APP_ID} from "./config.js"
import {Logger} from "./console-log.js"

const logger = new Logger('SHOW_WEATHER')

export async function showWeather(dataForSearch) {
    console.log('ДЕЛАЕМ ЗАПРОС!')
    const response = await getWeather(dataForSearch.city, dataForSearch.lang)
    console.log('СДЕЛАЛИ ЗАПРОС!')

    if(dataForSearch.tempOnly === true) {
        return logger.printLogs(logger.trueLog(response?.main?.temp))
    }
    return logger.printLogs(response)
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
      }).then((res) => {
            console.log(`МЫ ПОЛУЧИЛИ ОТВЕТ ОТ ${WEATHER_API_URL}!`)
            return res.data
        })
    }