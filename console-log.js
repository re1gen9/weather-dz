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

/** так можно, если printLogs имеет static
    Logger.printLogs()
*/

/**
 * так можно, если printLogs НЕ имеет static
 * 
 * const logger = new Logger()
    logger.printLogs()
 */


export class Logger {
    constructor(scope, showHeader) {
        this.scope = scope;
        this.showHeader = showHeader ?? false;
    }

    falseLog = chalk.red.bold
    trueLog = chalk.green.bold
    inputSectionLog = chalk.rgb(185, 255, 33)
    titleSectionLog = chalk.rgb(185, 255, 33).italic.bold
    langKeyLog = chalk.blue.bold
    sendRequestLog = chalk.blue
    commentsLog = chalk.rgb(255, 149, 104)
    requestKeyLog = chalk.rgb(0, 255, 149)
    requestPropertyLog = chalk.rgb(149, 0, 255)
    scopeColor = chalk.rgb(8, 67, 42)

    printLogs(...args) {
        if(this.showHeader) console.log(this.scopeColor('<-------------------------------------------------------------------->'))
        console.log(this.scopeColor(`[${this.scope}]`), ...args)
    }
}