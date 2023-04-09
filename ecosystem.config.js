module.exports = {
  apps: [
    {
      name: "chatgpt",
      script: "index.ts",
      exec_mode: "fork",
      interpreter: "/home/dd/.yarn/bin/ts-node",
      interpreter_args: "-T -P ./tsconfig.json",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
