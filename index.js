import {showWeather} from "./getweather.js"
import {checkCitiesValid, checkTempValid, checkLangValid} from "./validation.js"
import {falseLog, getLogs, titleSectionLog, inputSectionLog, commentsLog, requestKeyLog, requestPropertyLog} from "./console-log.js"

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

async function main() {
    const [,, ...args] = process.argv
    if(!args || !Array.isArray(args) || !args.length) return getLogs([commentsLog, '\nНе получили аргументы'])
    getLogs([inputSectionLog, `\nПолученные аргументы:`], [commentsLog, `\n${args}`])

    const cFlagValues = getFlagArguments('-c', args)
    getLogs([inputSectionLog, 'Переданный список городов:']) + getLogs([commentsLog, cFlagValues])
    checkCitiesValid(cFlagValues)
    const cities = cFlagValues

    getLogs([titleSectionLog, '\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА tempOnly ---------->\n'])

    const tFlagValue = getFlagArguments('-t', args)[0]
    const tempOnlyStatus = checkTempValid(tFlagValue)

    getLogs([titleSectionLog, '\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА lang ---------->\n'])

    const lFlagValue = getFlagArguments('-l', args)[0]
    const langStatus = checkLangValid(lFlagValue)

    getLogs([titleSectionLog, '\n<---------- ОТПРАВКА ЗАПРОСА И ПОЛУЧЕНИЕ ОБЪЕКТА ПОГОДЫ ---------->'])

    for(const city of cities) {
        const cityData = {
            city,
            tempOnly: tempOnlyStatus,
            lang: langStatus
        }
        getLogs([falseLog, '\n< --- Отправляем запрос со следующими параметрами --- >\n'])

        getLogs([requestKeyLog, 'Город:'], [requestPropertyLog, `${cityData.city}`])
        getLogs([requestKeyLog, 'Значение для tempOnly:'], [requestPropertyLog, `${cityData.tempOnly}`])
        getLogs([requestKeyLog, 'Язык:'], [requestPropertyLog, `${cityData.lang}\n`])
          
        try {
            await showWeather(cityData)
        } catch(error) {
            getLogs([falseLog, '< --- Произошла ошибка, информация по городу не была найдена --- >\n'])
            getLogs([requestKeyLog, 'Код ошибки:'], [falseLog, error.response.data.cod])
            getLogs([requestKeyLog, 'Полученное сообщение:'], [requestPropertyLog, `${error.response.data.message}\n`])
        }
    }
}

main()