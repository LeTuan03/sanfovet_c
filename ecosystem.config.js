module.exports = {
  apps: [
    {
      name: 'biotechvet',
      script: 'pnpm',
      args: 'start',
      cwd: '/var/www/biotechvet',

      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', '.next', 'public/uploads'],
    },
  ],
};
