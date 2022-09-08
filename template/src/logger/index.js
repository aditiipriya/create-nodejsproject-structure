const { createLogger, transports, transport ,format} = require('winston');
const customFormat = format.combine( format.timestamp(), format.printf((info )=>{ 
    if (!info.stack) {
        return `${info.timestamp} - [${info.level.toUpperCase().padEnd(8)}]- ${info.message}`
    }
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(8)}]- ${info.message} ${info.stack}`
}))
// const customFormat = format.json()
const logger = createLogger({
    format: customFormat,
    transports : [
        new transports.Console({level:"silly"}),
        new transports.File({filename:'app.log',level:"info"})
    ]
});

module.exports= logger;