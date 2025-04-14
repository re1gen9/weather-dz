import chalk from 'chalk'

export class Log {
    static falseLog = chalk.red.bold
    static trueLog = chalk.green.bold
    static inputSectionLog = chalk.rgb(185, 255, 33)
    static titleSectionLog = chalk.rgb(185, 255, 33).italic.bold
    static langKeyLog = chalk.blue.bold
    static sendRequestLog = chalk.blue
    static commentsLog = chalk.rgb(255, 149, 104)
    static requestKeyLog = chalk.rgb(0, 255, 149)
    static requestPropertyLog = chalk.rgb(149, 0, 255)

    static printLogs(...args) {
        console.log(...args)
    }
}