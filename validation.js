import chalk from 'chalk'
import {WEATHER_LANG_OPTION} from "./config.js"

export function checkCitiesValid(cFlagValuesRequest) {
    if(!cFlagValuesRequest.length) {
        console.log(chalk.yellow('Не было указано ни одного аргумента для списка городов, пожалуйста, впишите данные'))
        process.kill(process.pid)
    } else if(/[0-9]/.test(cFlagValuesRequest)) {
        console.log(chalk.yellow('В одном из аргументов для списка городов найдена цифра, пожалуйста, впишите валидные данные'))
        process.kill(process.pid)
    }
}

export function checkTempValid(tFlagValueRequest, tempOnlyStatusRequest) {
    if (!tFlagValueRequest) {
        console.log(chalk.yellow('Не было передано аргумента для параметра tempOnly, значение автоматически выставлено на ') + chalk.red('false'))
        console.log(chalk.red.bold(false))
        return(false)
    }
    console.log(chalk.yellow('Переданный аргумент для параметра tempOnly:'), chalk.rgb(53, 0, 176)(tFlagValueRequest))
    if(!((tFlagValueRequest === 'false') || (tFlagValueRequest === 'true'))) {
        console.log(chalk.yellow('Значение для параметра tempOnly не передано как ') + chalk.green('true ') + chalk.yellow('или ') + chalk.red('false') + chalk.yellow(', значение автоматически выставлено на ') + chalk.red(`false`))
        console.log(chalk.red.bold(false))
        return(false)
    } else if(tFlagValueRequest === 'true') {
        console.log(chalk.green.bold(true))
        return true
    } else {
        console.log(chalk.red.bold(false))
        return(false)
    }
}

export function checkLangValid(lFlagValueRequest) {
    if(!lFlagValueRequest) {
        console.log(chalk.yellow('Не было передано аргумента для параметра lang, значение автоматически выставлено на ') + chalk.green(`${WEATHER_LANG_OPTION.RU}`))
        console.log(chalk.green.bold(WEATHER_LANG_OPTION.RU))
        return (WEATHER_LANG_OPTION.RU)
    }
    console.log(chalk.yellow('Переданный аргумент для параметра lang:'), chalk.rgb(53, 0, 176)(lFlagValueRequest))
    if(!(Object.values(WEATHER_LANG_OPTION).includes(lFlagValueRequest))) {
        console.log(chalk.yellow('Переданный аргумент для параметра language не является одним из доступных вариантов, значение автоматически выставлено на ') + chalk.green(`${WEATHER_LANG_OPTION.RU}`))
        console.log(chalk.green.bold(WEATHER_LANG_OPTION.RU))
        return (WEATHER_LANG_OPTION.RU)
    }
    console.log(chalk.green.bold(lFlagValueRequest))
    return lFlagValueRequest
}