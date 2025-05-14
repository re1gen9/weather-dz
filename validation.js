import { Logger } from './console-log.js'
import { WEATHER_LANG_OPTION } from './config.js'

const logger = new Logger('VALIDATION')

export function checkCitiesValid(cFlagValuesRequest) {
    if (cFlagValuesRequest[0] === null) {
        logger.printLogs(
            logger.commentsLog.bold(
                'Не было указано ни одного аргумента для списка городов, пожалуйста, впишите данные'
            )
        )
        return null
    }
    for (const element of cFlagValuesRequest) {
        if (/[0-9]/.test(element)) {
            logger.printLogs(
                logger.commentsLog.bold(
                    'В одном из аргументов для списка городов найдена цифра, пожалуйста, впишите валидные данные'
                )
            )
            return null
        }
    }
    return cFlagValuesRequest
}

export function checkTempValid(tFlagValueRequest) {
    const tempOnlyValue = tFlagValueRequest[0]
    if (tempOnlyValue === null) {
        logger.printLogs(
            logger.commentsLog(
                'Значение для параметра tempOnly не было передано как'
            ),
            logger.trueLog('true'),
            logger.commentsLog('или'),
            logger.falseLog('false'),
            logger.requestPropertyLog(' >>> '),
            logger.commentsLog('значение автоматически выставленно на'),
            logger.falseLog('false\n')
        )
        return false
    }
    if (tempOnlyValue === 'true') {
        logger.printLogs(
            logger.commentsLog('Переданный аргумент для параметра tempOnly:'),
            logger.trueLog(true),
            '\n'
        )
        return true
    }
    if (tempOnlyValue === 'false') {
        logger.printLogs(
            logger.commentsLog('Переданный аргумент для параметра tempOnly:'),
            logger.falseLog(false),
            '\n'
        )
        return false
    }
    logger.printLogs(
        logger.commentsLog(
            'Значение для параметра tempOnly не было передано как'
        ),
        logger.trueLog('true'),
        logger.commentsLog('или'),
        logger.falseLog('false'),
        logger.requestPropertyLog(' >>> '),
        logger.commentsLog('значение автоматически выставленно на'),
        logger.falseLog('false\n')
    )
    return false
}

export function checkLangValid(lFlagValueRequest) {
    const langValue = lFlagValueRequest[0]
    if (!Object.values(WEATHER_LANG_OPTION).includes(langValue)) {
        logger.printLogs(
            logger.commentsLog(
                'Значение для параметра lang не было передано как один из доступных вариантов:'
            ),
            logger.trueLog(Object.values(WEATHER_LANG_OPTION).join(', ')),
            logger.requestPropertyLog(' >>> '),
            logger.commentsLog('значение автоматически выставлено на'),
            logger.langKeyLog(WEATHER_LANG_OPTION.RU, '\n')
        )
        return WEATHER_LANG_OPTION.RU
    }
    logger.printLogs(
        logger.commentsLog('Переданный аргумент для параметра lang:'),
        logger.langKeyLog(langValue),
        '\n'
    )
    return langValue
}
