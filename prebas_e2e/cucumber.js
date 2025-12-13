module.exports = {
  default: {
    require: [
      "features/steps/**/*.ts"
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
