const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
          chrome: "67",
          edge: "17",
          firefox: "60",
          safari: "11.1",
        },
        useBuiltIns: "usage",
        corejs: "3.6.5",
      },
    ],
    "@babel/preset-typescript",
  ],
};

export default config;
