const fcmAdmin = require('firebase-admin');

class FirebaseService {
  constructor({ config, logger }) {
    this.logger = logger;

    this.fcmApp = null;

    if (config.pushProviders.firebase) {
      this.fcmApp = fcmAdmin.initializeApp(
        {
          credential: fcmAdmin.credential.cert(
            config.pushProviders.firebase,
          ),
        },
      );
    }
  }

  async stop() {
    await this.fcmApp.delete();
  }

  notifyDevices(tokens, title, message, data = {}) {
    return new Promise((resolve, reject) => {
      if (this.fcmApp === null) {
        this.logger.debug('FCM not initialized');
        resolve();
        return;
      }
      if (!tokens || !Array.isArray(tokens) || tokens.length <= 0) {
        this.logger.debug(
          `FBService: tokens has to be a non empty array (${tokens})`);
        resolve();
        return;
      }

      const payload = {
        notification: {
          title,
          body: message,
        },
        data,
      };

      this.fcmApp.messaging()
        .sendToDevice(tokens, payload)
        .then((msgDevResp) => {
          // TODO: remove tokens that failed
          this.logger.debug({ msgDevResp });
          resolve(msgDevResp);
        })
        .catch((error) => {
          // TODO: remove tokens that failed
          this.logger.debug({ error });
          reject(error);
        });
    });
  }
}

module.exports = FirebaseService;
