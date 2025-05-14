import { WEATHER_LANG_OPTION } from './config'
import { checkCitiesValid, checkLangValid, checkTempValid } from './validation'

export function getArguments(args) {
    const { cities, tempOnlyStatus, langStatus } = args.length
        ? parseProccesArgs(args)
        : getUserPrompt()

    return {
        cities: checkCitiesValid(cities),
        tempOnlyStatus: checkTempValid(tempOnlyStatus),
        langStatus: checkLangValid(langStatus),
    }
}

function getUserPrompt() {
    let cities = ['someCities'],
        langStatus = WEATHER_LANG_OPTION.EN,
        tempOnlyStatus = true

    // Тут какая-то очень умная логика

    //     const cityQuestion = await inquirer.prompt([
    //         {
    //         type: 'input',
    //         name: 'cities',
    //         message: 'Вы не указали города для поиска. Пожалуйста, впишите значения. Для указания нескольких городов используйте знак [ для разделения\n',
    //         }
    //     ]).then(answer => {
    //         console.log()
    //         if(!answer.cities) {
    //         return [null]
    //         }
    //         return answer.cities
    //     })

    //     const tempOnlyQuestion = await inquirer.prompt([
    //         {
    //         type: 'list',
    //         name: 'tempOnly',
    //         message: 'Выберите значение для параметра tempOnly',
    //         choices: ['true', 'false']
    //         }
    //     ]).then(answer => {
    //         console.log()
    //         return [answer.tempOnly]
    //     })

    //     const langQuestion = await inquirer.prompt([
    //         {
    //         type: 'list',
    //         name: 'lang',
    //         message: 'Выберите язык',
    //         choices: Object.values(WEATHER_LANG_OPTION)
    //         }
    //     ]).then(answer => {
    //         console.log()
    //         return [answer.lang]
    //     })

    //     const questionCValues = getCitiesArray(cityQuestion)
    //     cities = checkCitiesValid(questionCValues)
    //     if(cities === null) return
    //     logger.printLogs(logger.inputSectionLog('Переданный список городов:'), logger.commentsLog(questionCValues), '\n')

    //     tempOnlyStatus = checkTempValid(tempOnlyQuestion)
    //     langStatus = checkLangValid(langQuestion)

    return { cities, langStatus, tempOnlyStatus }
}

function parseProccesArgs() {
    let cities = ['someCities'],
        langStatus = WEATHER_LANG_OPTION.EN,
        tempOnlyStatus = true

    //     const cFlagValues = getCitiesArray(getFlagArguments('-c', args))
    //     cities = checkCitiesValid(cFlagValues)
    //     if(cities === null) return

    //     logger.printLogs(logger.inputSectionLog('Полученные аргументы:'), logger.commentsLog(args))

    //     logger.printLogs(logger.inputSectionLog('Переданный список городов:'), logger.commentsLog(cFlagValues), '\n')

    //     logger.printLogs(logger.titleSectionLog('<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА tempOnly ---------->\n'))

    //     const tFlagValue = getFlagArguments('-t', args)
    //     tempOnlyStatus = checkTempValid(tFlagValue)

    //     logger.printLogs(logger.titleSectionLog('<---------- ЛОГИРОВАНИЕ И ПРОВЕРКА ВАЛИДНОСТИ АРГУМЕНТА lang ---------->\n'))

    //     const lFlagValue = getFlagArguments('-l', args)
    //     langStatus = checkLangValid(lFlagValue)

    return { cities, langStatus, tempOnlyStatus }
}

// // <-------------------------- МИНИ ЛЕКЦИЯ ----------------------------------------->
// function getUserName(id) {
//     // ...
//     return 'Rustam'
// }
// const active = true;

// const name = getUserName(123)
// //Это тернарный оператор
// const rustamUser = name === 'Rustam' ? 'Rustamchik' : 'Lol'

// // По сути мы делаем вот это (то шо ниже), только короче записано
// let newRustmaUser;
// if (name === 'Rustam') {
//     newRustmaUser = 'Rustamchik'
// } else {
//     newRustmaUser = 'Lol'
// }

// // &&
// if(name === 'Rustam' && active) { /** МЫ СЮДА ЗАЙДЕМ ТОЛЬКО ЕСЛИ ОБА ТРУ */}
// // ||
// if(name === 'Rustam' || active) { /** МЫ СЮДА ЗАЙДЕМ ЕСЛИ ХОТЯ БЫ ОДИН ИЗ НИХ ТРУ */}
// // ??
// const userName = newRustmaUser ?? 'No name' /** Мы положим в `userName` значение 'No name', только если
// newRustmaUser === null или newRustmaUser === undefined

// Если newRustmaUser, например, === false, то мы и положим в userName false
// */
