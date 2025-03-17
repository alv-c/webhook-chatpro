import { createLogger, format, transports } from 'winston'
const { combine, timestamp, json, errors } = format

export const logger = createLogger({
    format: combine(
        errors({ stack: true }),
        format.splat(),
        format.json(),
        format.simple(),
        format.timestamp({ format: "HH:mm:ss - DD-MM-YYYY" }),
        format.printf(info => {
            if (info.stack) {
                return `[${info.timestamp}] ${info.level} ${info.stack}`;
            }
            return `[${info.timestamp}] ${info.level} ${info.message}`;
        }),
        format.printf(error => {
            if (error.stack) {
                return `[${error.timestamp}] ${error.level} ${error.stack}`;
            }
            return `[${error.timestamp}] ${error.level} ${error.message}`;
        }),
    ),
    transports:
        new transports.File({
            filename: 'logger/server.log',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),

})



