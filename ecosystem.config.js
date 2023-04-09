module.exports = {
  apps: [
    {
      name: "chatgpt",
      script: "index.ts",
      exec_mode: "fork",
      interpreter: "/home/dd/.yarn/bin/ts-node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
