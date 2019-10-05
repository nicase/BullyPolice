const container = require('./container');

const app = container.resolve('httpServerApp');
const logger = container.resolve('logger');


function shutdownServerHandler(signal) {
  logger.info(`Received ${signal}`);
  app.stop();
}

process.on('SIGINT', shutdownServerHandler);
process.on('SIGTERM', shutdownServerHandler);

app
  .start()
  .then(() => {
    logger.info('Application created.');
  })
  .catch((err) => {
    logger.error(`Application error: ${err}`);
    app.stop();
    process.exit(1);
  });
