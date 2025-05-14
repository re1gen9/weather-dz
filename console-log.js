import chalk from 'chalk'

export class Logger {
    constructor(scope) {
        this.scope = scope
    }

    falseLog = chalk.red.bold
    trueLog = chalk.green.bold
    inputSectionLog = chalk.rgb(185, 255, 33)
    titleSectionLog = chalk.rgb(185, 255, 33).italic.bold
    langKeyLog = chalk.blue.bold
    sendRequestLog = chalk.rgb(41, 244, 255)
    commentsLog = chalk.rgb(255, 149, 104)
    requestKeyLog = chalk.rgb(0, 255, 149)
    requestPropertyLog = chalk.rgb(149, 0, 255)
    scopeColor = chalk.rgb(41, 244, 255)

    printLogs(...args) {
        console.log(this.scopeColor(`[${this.scope}]`), ...args)
    }
}
