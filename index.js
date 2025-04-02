import chalk from 'chalk' 
import {showWeather} from "./getweather.js"
import {checkCitiesValid} from "./validation.js"
import {checkTempValid} from "./validation.js"
import {checkLangValid} from "./validation.js"

export const WEATHER_LANG_OPTION = {
    RU: 'ru',
    EN: 'en'
}

async function main() {
    const [,, ...args] = process.argv
    if(!args || !Array.isArray(args) || !args.length) return console.log('\nНе получили аргументы.')
    console.log(chalk.blue('\nПолученные аргументы:'), args)

    function getFlagArguments(flagStartSymbol) {
        const resultFlagValue = []
        for(let i = 0; i < args.length; i++) {
            if(args[i] === flagStartSymbol) {
                while(i + 1 < args.length && !args[i + 1].startsWith('-')) {
                    resultFlagValue.push(args[i + 1])
                    i++
                }
            }
        }
        return resultFlagValue
    }

    const cFlagValues = getFlagArguments('-c')
    console.log(chalk.cyan('Переданный список городов:'), cFlagValues)
    checkCitiesValid(cFlagValues)
    const cities = cFlagValues

    console.log(chalk.greenBright.italic('\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА tempOnly ---------->\n'))

    const tFlagValue = getFlagArguments('-t')[0]
    let tempOnlyStatus
    tempOnlyStatus = checkTempValid(tFlagValue, tempOnlyStatus)

    console.log(chalk.greenBright.italic('\n<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА lang ---------->\n'))

    const lFlagValue = getFlagArguments('-l')[0]
    let langStatus
    langStatus = (checkLangValid(lFlagValue, langStatus))

    console.log(chalk.greenBright.italic(('\n<---------- ОТПРАВКА ЗАПРОСА И ПОЛУЧЕНИЕ ОБЪЕКТА ПОГОДЫ ---------->')))

    for(const city of cities) {
        const cityData = {
            city,
            tempOnly: tempOnlyStatus,
            lang: langStatus
        }
        console.log(chalk.blue.bold('\n< --- Отправляем запрос со следующими параметрами --- >\n'))
        console.log(
            chalk.rgb(255, 128, 73)('Город:'), chalk.rgb(255, 255, 255)(cityData.city) + '\n' +
            chalk.rgb(255, 128, 73)('Значение для tempOnly:'), chalk.rgb(255, 255, 255)(cityData.tempOnly) + '\n' +
            chalk.rgb(255, 128, 73)('Язык:'), chalk.rgb(255, 255, 255)(cityData.lang) + '\n'
          )
        try {
            await showWeather(cityData)
        } catch(error) {
            console.log(chalk.red.bold('< --- Произошла ошибка, информация по городу не была найдена --- >\n'))
            console.log(chalk.rgb(0, 255, 136)('Код ошибки: '), chalk.rgb(53, 0, 176)(error.response.data.cod))
            console.log(chalk.rgb(0, 255, 136)('Полученное сообщение: '), chalk.rgb(53, 0, 176)(error.response.data.message))
        }
    }
}

main()

console.log('AAAAAA')