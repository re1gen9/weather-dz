import inquirer from 'inquirer'
import {showWeather} from "./getweather.js"
import {checkCitiesValid, checkTempValid, checkLangValid} from "./validation.js"
import {Logger} from "./console-log.js"

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
    if(!resultFlagValue.length) return [null]
    return resultFlagValue
}

function getCitiesArray(cValuesRequest) {
    if (cValuesRequest[0] === null) return cValuesRequest
    let citiesValues = cValuesRequest
    if(typeof citiesValues === 'string') citiesValues = cValuesRequest.split(' ')
    const citiesArr = []
    let citiesString = ''
    for(let i = 0; i < citiesValues.length + 2; i++) {
        if(!(citiesValues[i] === '[')) {
            if(citiesString === ''){
                citiesString = `${citiesString + citiesValues[i]}`
            } else {
                citiesString = `${citiesString + ' ' + citiesValues[i]}`
            }
        }
        if(citiesValues[i] === '[' || i === citiesValues.length - 1) {
            citiesArr.push(citiesString)
            citiesString = ''
            continue
        }
        if(i === citiesValues.length + 1) {
            return citiesArr
        }
    }
}

async function main() {
    const [,, ...args] = process.argv
    let tempOnlyStatus
    let langStatus
    let cities

    if(!args.length) {
        const cityQuestion = await inquirer.prompt([
            {
            type: 'input',
            name: 'cities',
            message: 'Вы не указали города для поиска. Пожалуйста, впишите значения. Для указания нескольких городов используйте знак [ для разделения\n',
            }
        ]).then(answer => {
            console.log()
            if(!answer.cities) {
            return [null]
            }
            return answer.cities
        })

        const tempOnlyQuestion = await inquirer.prompt([
            {
            type: 'list',
            name: 'tempOnly',
            message: 'Выберите значение для параметра tempOnly',
            choices: ['true', 'false']
            }
        ]).then(answer => {
            console.log()
            return [answer.tempOnly]
        })

        const langQuestion = await inquirer.prompt([
            {
            type: 'list',
            name: 'lang',
            message: 'Выберите язык',
            choices: ['ru', 'en', 'de']
            }
        ]).then(answer => {
            console.log()
            return [answer.lang]
        })

        const questionCValues = getCitiesArray(cityQuestion)
        cities = checkCitiesValid(questionCValues)
        if(cities === null) return
        logger.printLogs(logger.inputSectionLog('Переданный список городов:'), logger.commentsLog(questionCValues), '\n')

        tempOnlyStatus = checkTempValid(tempOnlyQuestion)
        langStatus = checkLangValid(langQuestion)
    } else {
        const cFlagValues = getCitiesArray(getFlagArguments('-c', args))
        cities = checkCitiesValid(cFlagValues)
        if(cities === null) return

        logger.printLogs(logger.inputSectionLog('Полученные аргументы:'), logger.commentsLog(args))

        logger.printLogs(logger.inputSectionLog('Переданный список городов:'), logger.commentsLog(cFlagValues), '\n')

        logger.printLogs(logger.titleSectionLog('<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА tempOnly ---------->\n'))

        const tFlagValue = getFlagArguments('-t', args)
        tempOnlyStatus = checkTempValid(tFlagValue)

        logger.printLogs(logger.titleSectionLog('<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА lang ---------->\n'))

        const lFlagValue = getFlagArguments('-l', args)
        langStatus = checkLangValid(lFlagValue)
    }

    logger.printLogs(logger.titleSectionLog('<---------- ОТПРАВКА ЗАПРОСА И ПОЛУЧЕНИЕ ОБЪЕКТА ПОГОДЫ ---------->\n'))

    for(const city of cities) {
        const cityData = {
            city,
            tempOnly: tempOnlyStatus,
            lang: langStatus
        }
        logger.printLogs(logger.sendRequestLog('Отправляем запрос со следующими параметрами:\n'))

        logger.printLogs(logger.requestKeyLog('Город:'), logger.requestPropertyLog(cityData.city))
        logger.printLogs(logger.requestKeyLog('Значение для tempOnly:'), logger.requestPropertyLog(cityData.tempOnly))
        logger.printLogs(logger.requestKeyLog('Язык:'), logger.requestPropertyLog(cityData.lang), '\n')
          
        try {
            await showWeather(cityData), console.log()
        } catch(error) {
            logger.printLogs(logger.commentsLog.bold('^^^ Произошла ошибка, информация по городу не была найдена'))
            logger.printLogs(logger.commentsLog.bold('Код ошибки:'), logger.falseLog(error.response?.data?.cod))
            logger.printLogs(logger.commentsLog.bold('Полученное сообщение:'), logger.falseLog(error.response?.data?.message), '\n')
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