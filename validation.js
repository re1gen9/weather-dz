import {Log} from "./console-log.js"
import {WEATHER_LANG_OPTION} from "./config.js"

export function checkCitiesValid(cFlagValuesRequest) {
    if(!cFlagValuesRequest.length) {
        Log.printLogs(Log.commentsLog.bold('\nНе было указано ни одного аргумента для списка городов, пожалуйста, впишите данные'))
        return null
    }
    for(const element of cFlagValuesRequest) {
        if(/[0-9]/.test(element)) {
            Log.printLogs(Log.commentsLog.bold('\nВ одном из аргументов для списка городов найдена цифра, пожалуйста, впишите валидные данные'))
            return null
        }
    }
    return cFlagValuesRequest
}

export function checkTempValid(tFlagValueRequest) {
    if(tFlagValueRequest === 'true') {
        Log.printLogs(Log.commentsLog('Переданный аргумент для параметра tempOnly:'), Log.trueLog(true))
        return true
    }
    if(tFlagValueRequest === 'false') {
        Log.printLogs(Log.commentsLog('Переданный аргумент для параметра tempOnly:'), Log.falseLog(false))
        return false
    }
    Log.printLogs(Log.commentsLog('Значение для параметра tempOnly не было передано как'), Log.trueLog('true'), Log.commentsLog('или'), Log.falseLog('false'), Log.requestPropertyLog(' >>> '), Log.commentsLog('значение автоматически выставленно на'), Log.falseLog('false'))
    return false
}

export function checkLangValid(lFlagValueRequest) {
    if(!(Object.values(WEATHER_LANG_OPTION).includes(lFlagValueRequest))) {
        Log.printLogs(Log.commentsLog('Значение для параметра lang не было передано как один из доступных вариантов'), Log.requestPropertyLog(' >>> '), Log.commentsLog('значение автоматически выставлено на'), Log.langKeyLog(WEATHER_LANG_OPTION.RU))
        return WEATHER_LANG_OPTION.RU
    }
    Log.printLogs(Log.commentsLog('Переданный аргумент для параметра lang:'), Log.langKeyLog(lFlagValueRequest))
    return lFlagValueRequest
}