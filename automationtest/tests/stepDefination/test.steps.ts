import { then, binding, given, when } from "cucumber-tsflow";
import { browser, element, by } from "protractor";
import { SettingsPage } from "../../pageObjects/settingsPage";
import { LoginPage } from "../../pageObjects/loginPage";
import { FilesPage } from "../../pageObjects/filesPage";
import { expect } from "../../helpers/chai-imports";
import { TestFunction } from "../../function/function";

let settingsPage: SettingsPage = new SettingsPage();
let loginPage: LoginPage = new LoginPage();
let filesPage: FilesPage = new FilesPage();
let testFunction = new TestFunction();

/**
 * STeps File
 */

@binding()
class TestSteps {
  @given(/^Navigate to Test URL$/)
  public async navigateToTestURL() {
    await browser.get("http://qaexercise.envalfresco.com/settings");
  }

  @when(/^User updates the Provider to ECM$/)
  public async updateProviderType() {
    await testFunction.waitForElementToBeDisplayed(settingsPage.providerType);
    await testFunction.click(settingsPage.providerType);
    await testFunction.click(settingsPage.ecmType);
  }

  @when(/^User click on Apply button$/)
  public async clickOnApplyBtn() {
    await testFunction.click(settingsPage.applyBtn);
  }

  @when(/^User navigate to the Login URL$/)
  public async navigateToLoginURL() {
    await browser.get("http://qaexercise.envalfresco.com/login");
  }

  @when(/^User login to the application with user "(.*)" and password "(.*)"$/)
  public async loginToApp(userName: string, password: string) {
    await testFunction.inputText(loginPage.userName, userName);
    await testFunction.inputText(loginPage.password, password);
    await testFunction.click(loginPage.signInButton);

    await testFunction.waitForElementToBeDisplayed(filesPage.homePage);
  }

  @when(/^User navigate to the Files URL$/)
  public async navigateToFilesURL() {
    await browser.get("http://qaexercise.envalfresco.com/files");
  }

  @when(/^User clicks on create new folder icon$/)
  public async clickOnNewFolderIcon() {
    await testFunction.waitForElementToBeDisplayed(filesPage.documentList);
    await testFunction.click(filesPage.newFolderButton);
  }

  @when(/^User inputs the github username "(.*)"$/)
  public async inputUserName(userName: string) {
    await testFunction.inputText(filesPage.nameField, userName);
  }

  @then(/^The username should be inputted in the Name field$/)
  public async verifyUserNameInputted() {
    let userName: string = await testFunction.getAttributeValue(
      filesPage.nameField,
      "value"
    );
    expect(userName).to.be.equal("siddharthsid");
  }

  @when(/^User clicks on create button$/)
  public async clickOnCreateBtn() {
    await testFunction.click(filesPage.createBtn);
  }

  @when(/^User click on the Cancel button$/)
  public async clickOnCancelBtn() {
    await testFunction.click(filesPage.cancelBtn);
  }

  @when(/^User selects the action button for created username "(.*)"$/)
  public async clickOnActionBtn(userName: string) {
    let elm = await element.all(filesPage.dataTableRow);
    for (let i = 0; i < elm.length; i++) {
      let text: string[] = await elm[i].getText();
      if (text.includes(userName)) {
        console.log("Found the user");
        await element(
          by.xpath(`(.//button[@title="Content actions"])[${i}]`)
        ).click();
      }
    }
  }

  @when(/^User click on delete button to delete the username$/)
  public async clickOnDeleteBtn() {
    await testFunction.click(filesPage.deleteBtn);
  }

  @then(/^User should see the New Folder Dialog$/)
  public async verifyNewFolderDiaglog() {
    await testFunction.waitForElementToBeDisplayed(filesPage.newFolderDialog);
    let displayed: boolean = await testFunction.displayed(
      filesPage.newFolderDialog
    );
    expect(displayed).to.be.true;
  }

  @then(/^The Create new folder Dialog should not be displayed$/)
  public async verifyNewFolderDiaglogIsDisplayed() {
    let isPresent: boolean = await testFunction.present(
      filesPage.newFolderDialog
    );
    expect(isPresent).to.be.false;
  }

  @then(
    /^User should see the folder created for the inputed github username "(.*)"$/
  )
  public async verifyFolderCreated(userName: string) {
    let elem = await element.all(filesPage.displayNameList);
    let listOfValues: string[] = [];

    for (const el of elem) {
      const val = await el.getText();
      listOfValues.push(val);
    }
    expect(listOfValues).to.includes(userName);
  }

  @then(/^User should see the validation error message$/)
  public async verifyValidationErrorMessage() {
    let errorMessage: string = await testFunction.text(filesPage.errorMessage);
    expect(errorMessage).to.be.equal(
      "There's already a folder with this name. Try a different name."
    );
  }
}

export = TestSteps;
