const winston = require('winston');


const winstonLogger = winston.createLogger();

const parseErrorMessage = winston.format((info) => {
  if (info.message instanceof Object) {
    if (info.message.err instanceof Error) {
      return Object.assign(info, {
        errorMsg: {
          name: info.message.err.name,
          message: info.message.err.message,
          stack: info.message.err.stack,
        },
      });
    }
    return Object.assign(info, {
      message: JSON.stringify(info.message, null, 2),
    });
  }
  return info;
});

const testFormat = () => winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  parseErrorMessage(),
  winston.format.printf((info) => {
    const {
      timestamp, level, message, errorMsg, ...args
    } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' ');
    const parsedArgs = Object.keys(args).length
      ? JSON.stringify(args, null, 2)
      : '';

    if (errorMsg) {
      return `${ts} [${level}]: \t${errorMsg.stack}`;
    }
    return `${ts} [${level}]: \t${message} ${parsedArgs}`;
  }),
);

module.exports = ({ config }) => {
  winstonLogger.configure({
    level: config.logging.level || 'info',
  });

  winstonLogger.add(
    new winston.transports.Console({
      format: testFormat(),
      stderrLevels: ['error', 'warn'],
    }),
  );

  return winstonLogger;
};
