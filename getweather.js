import axios from 'axios'
import {
    WEATHER_API_URL,
    WEATHER_API_APP_ID,
    WEATHER_LANG_OPTION,
} from './config.js'
import { Logger } from './console-log.js'

export class Weather {
    logger = new Logger('SHOW_WEATHER')
    constructor(tempOnly = false, language = WEATHER_LANG_OPTION.RU) {
        this.tempOnly = tempOnly
        this.language = language
    }

    async showWeather(city = '') {
        this.logger.printLogs(
            this.logger.sendRequestLog(
                'Отправляем запрос со следующими параметрами:\n'
            )
        )

        this.logger.printLogs(
            this.logger.requestKeyLog('Город:'),
            this.logger.requestPropertyLog(city)
        )
        this.logger.printLogs(
            this.logger.requestKeyLog('Значение для tempOnly:'),
            this.logger.requestPropertyLog(this.tempOnly)
        )
        this.logger.printLogs(
            this.logger.requestKeyLog('Язык:'),
            this.logger.requestPropertyLog(this.language),
            '\n'
        )

        const response = await this.getWeather(city, this.language)

        if (this.tempOnly === true) {
            return this.logger.printLogs(
                this.logger.trueLog(response?.main?.temp)
            )
        }
        return this.logger.printLogs(response)
    }

    async getWeather(city, lang) {
        const params = {
            q: city,
            appid: WEATHER_API_APP_ID,
            lang: lang,
            units: 'metric',
        }
        return axios
            .get(WEATHER_API_URL, {
                params,
            })
            .then((res) => res.data)
    }
}
