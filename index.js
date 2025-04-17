import {showWeather} from "./getweather.js"
import {checkCitiesValid, checkTempValid, checkLangValid} from "./validation.js"
import {Log, Logger} from "./console-log.js"

const logger = new Logger('MAIN')

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
    if(!args || !Array.isArray(args) || !args.length) return logger.printLogs(Log.commentsLog('Не получили аргументы'))
    logger.printLogs(Log.inputSectionLog('Полученные аргументы:'), Log.commentsLog(args))

    const cFlagValues = getCitiesArray(getFlagArguments('-c', args))
    logger.printLogs(Log.inputSectionLog('Переданный список городов:'), Log.commentsLog(cFlagValues))
    const cities = checkCitiesValid(cFlagValues)
    if(cities === null) return

    logger.printLogs(Log.titleSectionLog('\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА tempOnly ---------->\n'))

    const tFlagValue = getFlagArguments('-t', args)[0]
    const tempOnlyStatus = checkTempValid(tFlagValue)

    logger.printLogs(Log.titleSectionLog('\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА lang ---------->\n'))

    const lFlagValue = getFlagArguments('-l', args)[0]
    const langStatus = checkLangValid(lFlagValue)

    logger.printLogs(Log.titleSectionLog('<---------- ОТПРАВКА ЗАПРОСА И ПОЛУЧЕНИЕ ОБЪЕКТА ПОГОДЫ ---------->\n'))

    for(const city of cities) {
        const cityData = {
            city,
            tempOnly: tempOnlyStatus,
            lang: langStatus
        }
        logger.printLogs(Log.sendRequestLog('\nОтправляем запрос со следующими параметрами:\n'))

        logger.printLogs(Log.requestKeyLog('Город:'), Log.requestPropertyLog(cityData.city))
        logger.printLogs(Log.requestKeyLog('Значение для tempOnly:'), Log.requestPropertyLog(cityData.tempOnly))
        logger.printLogs(Log.requestKeyLog('Язык:'), Log.requestPropertyLog(cityData.lang))
          
        try {
            await showWeather(cityData)
        } catch(error) {
            logger.printLogs(Log.commentsLog.bold('^^^ Произошла ошибка, информация по городу не была найдена\n'))
            logger.printLogs(Log.commentsLog.bold('Код ошибки:'), Log.falseLog(error.response?.data?.cod))
            logger.printLogs(Log.commentsLog.bold('Полученное сообщение:'), Log.falseLog(error.response?.data?.message))
        }
    }
}

main()



// Так, берем `response` у `error`. А у `response` берем `data`. А у `data` берем `code`
// error.response.data.code

// Так, а проверь, есть ли `response` у `error`? 
// Если нет, значит возвращаем `undefined`
// Если есть,  то идем дальше по "цепочке" (если есть куда)
// Далее: а проверь, есть ли `data` у `response`? 
// ...
// Далее: а проверь, есть ли `code` у `data`? 
// Если хоть где-то у нас не будет нужного свойства, то все это просто вернет `undefined`
// error?.response?.data?.code