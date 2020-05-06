### Automation QA exercise Setup

 ***Prerequisites***

 * NodeJS needs to be installed globally in the system
 * Chrome Browser installed

 ***Setup Scripts***

 * Clone the Repository
 * Navigate to the automationtest folder and then run the below command from terminal
```
 npm install
```
* This will install all the dependency from package.json to node modules folder

***Run Scripts***

* We need to start the selenium server.The Below command will download the binaries for chrome and gecko driver locally and will start the selenium server
```
 npm run webdriver-update
```
* Test Command to fire up the Chrome browser and to run Scripts
```
 npm test
```
## Register.js function compiles on fly
With the Register.js function which is added in protractor.conf.js file, we no longer have to complie the TypeScript files as it has ts-node wich complies them on fly

***Feature File***
* Place where all the scenario are written is Cucumber BDD Framework, we can Tag the scenario with @TagName to run a specfic scenario or Test Case.The Tag needs to be passed in the config file under cucumberOpts

***Steps Defination***
* All the steps are defined in this file.It uses protractor to integrate with the browser and to do browser actions.

***Assertion***
Framework uses chai as Assertion library to perfrom all assertion related operations

***Page Objects***
All the page locators are defined in Page object file.

***Function***
All the browser related action such as click(),wait()etc are kept separted in the function files.Which can be used to do browser actions

***Cucumber Hooks***
* Cucumber has Before and AFter Feature as Hooks which helps to do activites during start and end of the test.
* As of now for any failed scenarios, screenshot will be taken on Failures which will be Performed in After Hooks
* Before Hooks just maxmise the browser and set the waitForAngularEnabled to TRUE which means it will wait for Angular tasks to complete before interacting with the browser.

***HTML Report***
This Framework uses an easy reproting plugin provided by protractor-multiple-cucumber-html-reporter-plugin

***Version Used***
* protractor : 5.1.2
* cucmberjs: 6.0.5
* typescript : 3.8.3
* node: 12.16.3