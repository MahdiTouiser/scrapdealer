module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        alias: {
          "@scrapdealer/tokens": "../../packages/tokens/src",
          "@scrapdealer/utils": "../../packages/utils/src"
        }
      }]
    ]
  };
};
