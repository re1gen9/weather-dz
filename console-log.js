import chalk from 'chalk'

export const falseLog = chalk.red.bold

export const trueLog = chalk.green.bold

export const inputSectionLog = chalk.rgb(185, 255, 33)

export const titleSectionLog = chalk.rgb(185, 255, 33).italic.bold

export const langKeyLog = chalk.blue.bold

export const commentsLog = chalk.rgb(255, 149, 104)

export const requestKeyLog = chalk.rgb(0, 229, 255)

export const requestPropertyLog = chalk.rgb(149, 0, 255)

export function getLogs(...logs) {
    //если передам что-то не то, все сломается. Раз у тебя такой прикольный варик с функция + текст,
    // то нужно валидировать входящие данные
    console.log(logs.map(log => log[0](log[1])).join(' '))

    //а мы не хотим заложить удобный перенос строк в саму логику этой функции?

    //Можно было бы для удобства чтения записать это через деструктуризацию
    // console.log(logs.map(([logFunc, text]) => logFunc(text)).join(' '))
}

export function printLogs(...args) {
    console.log(...args, '\n')
}

// Это идейно плохой подход. Мы передаем непонятную функцию, непонятные данные к ней
// И все ради того чтобы вывести в консоль данные?
// далее см. getweather.js 
export async function GetWeatherLogs(getWeatherFunction, dataForSearchObject) {
    const response = await getWeatherFunction(dataForSearchObject.city, dataForSearchObject.lang)
    if(dataForSearchObject.tempOnly === true) {
        // что означает ?. запись?
        return console.log(response?.main?.temp)
    }
    return console.log(response)
}