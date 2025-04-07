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
    console.log(logs.map(log => log[0](log[1])).join(' '))
}

export async function GetWeatherLogs(getWeatherFunction, dataForSearchObject) {
    const response = await getWeatherFunction(dataForSearchObject.city, dataForSearchObject.lang)
    if(dataForSearchObject.tempOnly === true) {
        return console.log(response?.main?.temp)
    }
    return console.log(response)
}