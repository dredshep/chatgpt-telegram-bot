module.exports = {
  apps: [
    {
      name: "gpt-3-telegram-bot",
      script: "index.ts",
      exec_mode: "fork",
      interpreter: "ts-node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
