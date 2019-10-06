/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

const firebaseConfigPath = process.env.FIREBASE_ACCOUNT_JSON_PATH
  || '../../../certs/firebase-service-account.json';
const apnConfigPath = process.env.APN_ACCOUNT_JSON_PATH
  || '../../../certs/apn-service-account.json';

let firebaseCert = false;
let apnCert = false;

if (fs.existsSync(firebaseConfigPath)) {
  // eslint-disable-next-line global-require
  firebaseCert = require(firebaseConfigPath);
}

if (fs.existsSync(apnConfigPath)) {
  // eslint-disable-next-line global-require
  apnCert = require(apnConfigPath);
}

const currentEnv = process.env.NODE_ENV || 'development';
const corsOrigin = '*';


const config = {
  env: currentEnv,
  isProd: currentEnv === 'production',
  database: {
    url: process.env.DATABASE_URL
    || 'mongodb://127.0.0.1:27017/mamut'
  },
  logging: {
    level: process.env.LOGGING_LEVEL || 'info',
    showAccessLogs: process.env.LOGGING_ACCESS === 'true',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || false,
  },
  mailer: {
    host: process.env.MAILER_HOST || 'smtp.gmail.com',
    port: process.env.MAILER_PORT || 465,
    secure: true,
    user: process.env.MAILER_USER || 'user',
    password: process.env.MAILER_PASSWORD || 'password',
    from: process.env.MAILER_FROM || 'test@gmail.com',
  },
  server: {
    port: process.env.PORT || '3001',
    hostname: '0.0.0.0',
    secret: process.env.SERVER_SECRET || 'ThisHaveToBeChanged',
    cors: {
      origin: corsOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      optionsSuccessStatus: 204,
      preflightContinue: false,
      maxAge: 1728000,
      credentials: true,
    },
    auth: {
      user: process.env.AUTH_USER || 'user',
      password: process.env.AUTH_PSWD || 'password',
    },
  },
  pushProviders: {
    firebase: firebaseCert,
    apn: apnCert,
  },
};

module.exports = config;
