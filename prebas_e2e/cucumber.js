module.exports = {
  default: {
    require: [
      "features/steps/**/*.ts",
      "features/support/**/*.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    paths: [
      "features/**/*.feature"
    ],
    publishQuiet: true,
    format: ["progress"]
  }
};
