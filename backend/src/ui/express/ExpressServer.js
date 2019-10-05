const express = require('express');
const cors = require('cors');
const compression = require('compression');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const morgan = require('morgan');

const router = require('./router');
const { initServices } = require('./services');


class ExpressServer {
  constructor({ config, logger, awilixContainer }) {
    this.config = config;
    this.logger = logger;
    this.awilixContainer = awilixContainer;

    this.express = express();

    // =========================================================================
    // Request Handler
    // =========================================================================

    if (this.config.sentry.dsn) {
      Sentry.init({ dsn: this.config.sentry.dsn });

      // The request handler must be the first middleware on the app
      this.express.use(Sentry.Handlers.requestHandler());
    }

    // =========================================================================
    // Middlewares
    // =========================================================================

    console.log('TODO');
    console.log(this.config.logging.showAccessLogs);
    if (this.config.logging.showAccessLogs) {
      this.logger.debug('> Access logs enabled');
      const loggerAdapter = {
        toStream(_logger) {
          return {
            write(message) {
              _logger.info(message.slice(0, -1));
            },
          };
        },
      };
      this.express.use(morgan('dev', {
        stream: loggerAdapter.toStream(this.logger),
      }));
    }

    this.express.use(methodOverride('X-HTTP-Method-Override'));
    this.express.use(cors(this.config.server.cors));
    this.express.use(compression());
    this.express.use(bodyParser.json({ limit: '5mb' }));
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.enable('trust proxy');

    this.express.use((req, res, next) => {
      res.setHeader('X-Powered-By', 'Nakima S.L.');
      next();
    });

    // Awilix Middleware
    this.express.use((req, res, next) => {
      req.container = this.awilixContainer.createScope();
      return next();
    });

    // =========================================================================
    // Routes
    // =========================================================================

    this.express.use(router);

    // =========================================================================
    // Error Handler
    // =========================================================================

    if (this.config.sentry.dsn) {
      // The error handler must be before any other error middleware
      this.express.use(Sentry.Handlers.errorHandler());
    }

    this.express.use((err, req, res, next) => {
      this.logger.error({ err });
      return next(err);
    });

    initServices();
  }

  getRequestListener() {
    return this.express;
  }
}

module.exports = ExpressServer;
