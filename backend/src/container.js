const {
  createContainer,
  InjectionMode,
  Lifetime,
  asClass,
  asFunction,
  asValue,
} = require('awilix');

// =============================================================================
// Awilix Container
// =============================================================================

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  awilixContainer: asValue(container),
});

// =============================================================================
// Application
// =============================================================================

const HttpServerApp = require('./app/HttpServerApp');

container.register({
  httpServerApp: asClass(HttpServerApp),
});

container.loadModules(
  ['src/app/operations/**/*.js'],
  {
    resolverOptions: {
      lifetime: Lifetime.TRANSIENT,
      register: asClass,
    },
  },
);

container.loadModules(
  ['src/app/services/**/*.js'],
  {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asClass,
    },
    formatName: 'camelCase',
  },
);

// =============================================================================
// Database
// =============================================================================

const { mongoose } = require('./db/mongoose');

container.register({
  mongoose: asValue(mongoose),
});

container.loadModules(
  ['src/db/mongoose/models/*.js'],
  {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asFunction,
    },
    formatName: (name) => {
      const firstLetter = name.charAt(0)
        .toLowerCase();
      const rest = name.slice(1);
      return firstLetter + rest;
    },
  },
);

container.loadModules(
  ['src/db/mongoose/repositories/*.js'],
  {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asClass,
    },
    formatName: 'camelCase',
  },
);
// =============================================================================
// Infrastructure
// =============================================================================

const config = require('./infra/config');
const logger = require('./infra/logger/winstonLogger');
const mailer = require('./infra/mailer');

container.register({
  config: asValue(config),
});

container.register({
  logger: asFunction(logger)
    .singleton(),
});

container.register({
  mailer: asClass(mailer).singleton(),
});

// =============================================================================
// User Interfaces
// =============================================================================

const express = require('./ui/express/ExpressServer');

container.register({
  express: asClass(express)
    .singleton(),
});

container.loadModules(
  ['src/ui/express/serializers/*.js'],
  {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asFunction,
    },
    formatName: 'camelCase',
  },
);

// =============================================================================
// Module export
// =============================================================================

module.exports = container;
