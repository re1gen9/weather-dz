import {showWeather} from "./getweather.js"
import {checkCitiesValid, checkTempValid, checkLangValid} from "./validation.js"
import {Log} from "./console-log.js"

function getFlagArguments(flagStartSymbol, inputArgs) {
    const resultFlagValue = []
    for(let i = 0; i < inputArgs.length; i++) {
        if(inputArgs[i] === flagStartSymbol) {
            while(i + 1 < inputArgs.length && !inputArgs[i + 1].startsWith('-')) {
                resultFlagValue.push(inputArgs[i + 1])
                i++
            }
        }
    }
    return resultFlagValue
}

function getCitiesArray(cFlagValuesRequest) {
    const citiesArr = []
    let citiesString = ''
    for(let i = 0; i < cFlagValuesRequest.length + 2; i++) {
        if(!(cFlagValuesRequest[i] === ']') && !(cFlagValuesRequest[i] === '[')) {
            if(citiesString === ''){
                citiesString = `${citiesString + cFlagValuesRequest[i]}`
            } else {
                citiesString = `${citiesString + ' ' + cFlagValuesRequest[i]}`
            }
        }
        if(cFlagValuesRequest[i] === '[' || i === cFlagValuesRequest.length - 1) {
            citiesArr.push(citiesString)
            citiesString = ''
            continue
        }
        if(i === cFlagValuesRequest.length + 1) {
            return citiesArr
        }
    }
}

async function main() {
    const [,, ...args] = process.argv
    if(!args || !Array.isArray(args) || !args.length) return Log.printLogs(Log.commentsLog('Не получили аргументы'))
    Log.printLogs(Log.inputSectionLog('Полученные аргументы:'), Log.commentsLog(args))

    const cFlagValues = getCitiesArray(getFlagArguments('-c', args))
    Log.printLogs(Log.inputSectionLog('Переданный список городов:'), Log.commentsLog(cFlagValues))
    const cities = checkCitiesValid(cFlagValues)
    if(cities === null) return

    Log.printLogs(Log.titleSectionLog('\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА tempOnly ---------->\n'))

    const tFlagValue = getFlagArguments('-t', args)[0]
    const tempOnlyStatus = checkTempValid(tFlagValue)

    Log.printLogs(Log.titleSectionLog('\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА lang ---------->\n'))

    const lFlagValue = getFlagArguments('-l', args)[0]
    const langStatus = checkLangValid(lFlagValue)

    Log.printLogs(Log.titleSectionLog('\n<---------- ОТПРАВКА ЗАПРОСА И ПОЛУЧЕНИЕ ОБЪЕКТА ПОГОДЫ ---------->'))

    for(const city of cities) {
        const cityData = {
            city,
            tempOnly: tempOnlyStatus,
            lang: langStatus
        }
        Log.printLogs(Log.sendRequestLog('\nОтправляем запрос со следующими параметрами:\n'))

        Log.printLogs(Log.requestKeyLog('Город:'), Log.requestPropertyLog(cityData.city))
        Log.printLogs(Log.requestKeyLog('Значение для tempOnly:'), Log.requestPropertyLog(cityData.tempOnly))
        Log.printLogs(Log.requestKeyLog('Язык:'), Log.requestPropertyLog(cityData.lang))
          
        try {
            await showWeather(cityData)
        } catch(error) {
            Log.printLogs(Log.commentsLog.bold('\n^^^ Произошла ошибка, информация по городу не была найдена\n'))
            Log.printLogs(Log.commentsLog.bold('Код ошибки:'), Log.falseLog(error.response.data.cod))
            Log.printLogs(Log.commentsLog.bold('Полученное сообщение:'), Log.falseLog(error.response.data.message))
        }
    }
}

main()