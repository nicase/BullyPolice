// https://pm2.io/doc/en/runtime/guide/load-balancing/
// https://pm2.io/doc/en/runtime/reference/ecosystem-file/

module.exports = {
  apps: [
    {
      name: 'api',
      // cwd: '/home/node/app',
      interpreter: 'node',
      script: './src/httpServer.js',
      instances: '-1',
      exec_mode: 'cluster',
      max_memory_restart: '128M',
      // merge_logs: true,
      // disable_logs: true,
      // log_type: 'json',
      output: './logs/pm2-out.log',
      error: './logs/pm2-error.log',
    },
  ],
};
