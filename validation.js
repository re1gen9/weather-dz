import {falseLog, trueLog, getLogs, commentsLog, langKeyLog, requestPropertyLog} from "./console-log.js"
import {WEATHER_LANG_OPTION} from "./config.js"

export function checkCitiesValid(cFlagValuesRequest) {
    if(!cFlagValuesRequest.length) {
        getLogs([commentsLog, 'Не было указано ни одного аргумента для списка городов, пожалуйста, впишите данные'])
        process.kill(process.pid)
    } else if(/[0-9]/.test(cFlagValuesRequest)) {
        getLogs([commentsLog, 'В одном из аргументов для списка городов найдена цифра, пожалуйста, впишите валидные данные'])
        process.kill(process.pid)
    }
}

export function checkTempValid(tFlagValueRequest) {
    if (!tFlagValueRequest) {
        getLogs([commentsLog, 'Не было передано аргумента для параметра tempOnly, значение автоматически выставлено на'], [falseLog, false], [falseLog, `\nfalse`])
        return false
    }
    getLogs([commentsLog, 'Переданный аргумент для параметра tempOnly:'], [requestPropertyLog, tFlagValueRequest])
    if(!((tFlagValueRequest === 'false') || (tFlagValueRequest === 'true'))) {
        getLogs([commentsLog, 'Значение для параметра tempOnly не передано как'], [trueLog, 'true'], [commentsLog, 'или'], [falseLog, 'false,'], [commentsLog, 'значение автоматически выставлено на'], [falseLog, false], [falseLog, `\nfalse`])
        return false
    } else if(tFlagValueRequest === 'true') {
        getLogs([trueLog, true])
        return true
    } else {
        getLogs([falseLog, false])
        return false
    }
}

export function checkLangValid(lFlagValueRequest) {
    if(!lFlagValueRequest) {
        getLogs([commentsLog, 'Не было передано аргумента для параметра lang, значение автоматически выставлено на'], [trueLog, WEATHER_LANG_OPTION.RU])
        getLogs([trueLog, WEATHER_LANG_OPTION.RU])
        return WEATHER_LANG_OPTION.RU
    }
    getLogs([commentsLog, 'Переданный аргумент для параметра lang:'], [langKeyLog, lFlagValueRequest])
    if(!(Object.values(WEATHER_LANG_OPTION).includes(lFlagValueRequest))) {
        getLogs([commentsLog, 'Переданный аргумент для параметра lang не является одним из доступных вариантов, значение автоматически выставлено на'], [trueLog, WEATHER_LANG_OPTION.RU])
        getLogs([trueLog, WEATHER_LANG_OPTION.RU])
        return WEATHER_LANG_OPTION.RU
    }
    getLogs([trueLog, lFlagValueRequest])
    return lFlagValueRequest
}