import inquirer from 'inquirer'
import { Weather } from './getweather.js'
import { WEATHER_LANG_OPTION, SHOW_WEATHER_INTERVAL_SECS } from './config.js'
import {
    checkCitiesValid,
    checkTempValid,
    checkLangValid,
} from './validation.js'
import { Logger } from './console-log.js'
// import { getArguments } from './parse-args.js'

const logger = new Logger('MAIN')

function getFlagArguments(flagStartSymbol, inputArgs) {
    const resultFlagValue = []
    for (let i = 0; i < inputArgs.length; i++) {
        if (inputArgs[i] === flagStartSymbol) {
            while (
                i + 1 < inputArgs.length &&
                !inputArgs[i + 1].startsWith('-')
            ) {
                resultFlagValue.push(inputArgs[i + 1])
                i++
            }
        }
    }
    if (!resultFlagValue.length) return [null]
    return resultFlagValue
}

// Надо переделать, на более простой линейный варик. Попробуй с ',' как разделитель
// (или мб использовать ""???)
function getCitiesArray(cValuesRequest) {
    if (cValuesRequest[0] === null) return cValuesRequest
    let citiesValues = cValuesRequest
    if (typeof citiesValues === 'string')
        citiesValues = cValuesRequest.split(' ')
    const citiesArr = []
    let citiesString = ''
    for (let i = 0; i < citiesValues.length + 2; i++) {
        if (!(citiesValues[i] === '[')) {
            if (citiesString === '') {
                citiesString = `${citiesString + citiesValues[i]}`
            } else {
                citiesString = `${citiesString + ' ' + citiesValues[i]}`
            }
        }
        if (citiesValues[i] === '[' || i === citiesValues.length - 1) {
            citiesArr.push(citiesString)
            citiesString = ''
            continue
        }
        if (i === citiesValues.length + 1) {
            return citiesArr
        }
    }
}

async function main() {
    const [, , ...args] = process.argv
    let tempOnlyStatus
    let langStatus
    let cities

    /** Некая функция getArguments, которая получает аргументы, переданные при запуске нашего приложения
     * И далее внутри ДЕЛАЕТ КАКУЮ-ТО МАГИЮ (и нам не важно какую именно), в результе которой
     * мы получае ТОЧНО валидные параметры для отправке запроса */
    // const {cities, langStatus, tempOnlyStatus} = getArguments(args);

    if (!args.length) {
        const cityQuestion = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'cities',
                    message:
                        'Вы не указали города для поиска. Пожалуйста, впишите значения. Для указания нескольких городов используйте знак [ для разделения\n',
                },
            ])
            .then((answer) => {
                console.log()
                if (!answer.cities) {
                    return [null]
                }
                return answer.cities
            })

        const tempOnlyQuestion = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'tempOnly',
                    message: 'Выберите значение для параметра tempOnly',
                    choices: ['true', 'false'],
                },
            ])
            .then((answer) => {
                console.log()
                return [answer.tempOnly]
            })

        const langQuestion = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'lang',
                    message: 'Выберите язык',
                    choices: Object.values(WEATHER_LANG_OPTION),
                },
            ])
            .then((answer) => {
                console.log()
                return [answer.lang]
            })

        const questionCValues = getCitiesArray(cityQuestion)
        cities = checkCitiesValid(questionCValues)
        if (cities === null) return
        logger.printLogs(
            logger.inputSectionLog('Переданный список городов:'),
            logger.commentsLog(questionCValues),
            '\n'
        )

        tempOnlyStatus = checkTempValid(tempOnlyQuestion)
        langStatus = checkLangValid(langQuestion)
    } else {
        const cFlagValues = getCitiesArray(getFlagArguments('-c', args))
        cities = checkCitiesValid(cFlagValues)
        if (cities === null) return

        logger.printLogs(
            logger.inputSectionLog('Полученные аргументы:'),
            logger.commentsLog(args)
        )

        logger.printLogs(
            logger.inputSectionLog('Переданный список городов:'),
            logger.commentsLog(cFlagValues),
            '\n'
        )

        logger.printLogs(
            logger.titleSectionLog(
                '<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА tempOnly ---------->\n'
            )
        )

        const tFlagValue = getFlagArguments('-t', args)
        tempOnlyStatus = checkTempValid(tFlagValue)

        logger.printLogs(
            logger.titleSectionLog(
                '<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА lang ---------->\n'
            )
        )

        const lFlagValue = getFlagArguments('-l', args)
        langStatus = checkLangValid(lFlagValue)
    }

    const weather = new Weather(tempOnlyStatus, langStatus)
    setInterval(
        () => printWeatherByCities(cities, weather),
        SHOW_WEATHER_INTERVAL_SECS
    )
}

async function printWeatherByCities(cities = [], weatherClass) {
    for (const city of cities) {
        logger.printLogs(
            logger.titleSectionLog(
                '<---------- ОТПРАВКА ЗАПРОСА И ПОЛУЧЕНИЕ ОБЪЕКТА ПОГОДЫ ---------->\n'
            )
        )

        try {
            // Изменить вывод логов так, чтобы заданные параметры выводились одни раз. А для городов была запись вида
            // `Температура в городе ВСТАВИТЬ_НАЗВАНИЕ: 182387.11`
            // + СДЕЛАТЬ ЛОГИРОВАНИЕ В ТОМ ЖЕ ЯЗЫКЕ, ЧТО И langStatus
            await weatherClass.showWeather(city)
        } catch (error) {
            console.log('err', error)
            logger.printLogs(
                logger.commentsLog.bold(
                    '^^^ Произошла ошибка, информация по городу не была найдена'
                )
            )
            logger.printLogs(
                logger.commentsLog.bold('Код ошибки:'),
                logger.falseLog(error.response?.data?.cod)
            )
            logger.printLogs(
                logger.commentsLog.bold('Полученное сообщение:'),
                logger.falseLog(error.response?.data?.message),
                '\n'
            )
        }
    }
}

main()
