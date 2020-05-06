'use strict';
// const path = require('path');
const fs = require('fs-extra');
const { resolve } = require("path");
const { browser } = require("protractor");
require("./register")(resolve(__dirname));

exports.config = {
  allScriptsTimeout: 120000,
  disableChecks: true,
  directConnect: true,
  restartBrowserBetweenTests: false,
  SELENIUM_PROMISE_MANAGER: false,
  ignoreUncaughtExceptions: true,

  beforeLaunch: () => {

    console.log(`\nThe directory './tmp', which holds reports / screenshots is being removed.\n`);

    fs.removeSync('./.tmp');
  },

  params: {},
  capabilities: {
    browserName: "chrome",
  },

  /**
   * CucumberJS specific
   */
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ["tests/**/*.steps.ts", "helpers/*.ts"],
    format: 'json:.tmp/results.json',
    tags: "@Sid",
  },
  specs: ["tests/**/*.feature"],
  getPageTimeout: 120000,

  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      metadataKey: 'deviceProperties',
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile: true
    }
  }],

};
