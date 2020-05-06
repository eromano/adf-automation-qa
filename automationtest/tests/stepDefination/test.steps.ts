import { then, binding, given, when } from "cucumber-tsflow";
import { browser, element, by } from "protractor";
import { SettingsPage } from "../../pageObjects/settingsPage";
import { LoginPage } from "../../pageObjects/loginPage";
import { FilesPage } from "../../pageObjects/filesPage";
import { expect } from "../../helpers/chai-imports";
import { TestFunction } from "../../function/function";
import { ActionType } from "../../function/enum";

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
    if (
      !(await testFunction.enabled(filesPage.previousArrowBtn)) &&
      !(await testFunction.enabled(filesPage.nextArrowBtn))
    ) {
      await this.clickOnDeleteActionBtnForUser(userName);
    }

    while (await testFunction.enabled(filesPage.previousArrowBtn)) {
      console.log("click on previous button");
      let user = await this.getDisplayNameFromList();
      if (user.includes(userName)) {
        console.log("Found the user");
        await element(
          by.xpath(
            `.//*[contains(@data-automation-id,'${userName}')]/ancestor::adf-datatable-row//button[@title="Content actions"]`
          )
        ).click();
        break;
      }
      await testFunction.click(filesPage.previousArrowBtn);
    }

    while (await testFunction.enabled(filesPage.nextArrowBtn)) {
      console.log("click on next button");
      let user = await this.getDisplayNameFromList();
      if (user.includes(userName)) {
        console.log("Found the user");
        await element(
          by.xpath(
            `.//*[contains(@data-automation-id,'${userName}')]/ancestor::adf-datatable-row//button[@title="Content actions"]`
          )
        ).click();
        break;
      }
      await testFunction.click(filesPage.nextArrowBtn);
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
    /^User should see the folder (.*) for the inputed github username "(.*)"$/
  )
  public async verifyFolderCreated(action: ActionType, userName: string) {
    let totalPageCount = await testFunction.text(filesPage.totalPageCount);
    let getTotalPageCount: any = totalPageCount.split(" ")[1];
    let currentPageCount = await testFunction.text(filesPage.currentPageCount);
    let getCurrentPageCount: any = currentPageCount.split(" ")[1];
    let listOfValues: string[] = [];

    if (getTotalPageCount === getCurrentPageCount) {
      listOfValues = await this.getDisplayNameFromList();
    } else {
      //Iterate through the page
      for (let i: any = getCurrentPageCount; i < getTotalPageCount; i++) {
        listOfValues = await this.getDisplayNameFromList();
        await testFunction.click(filesPage.forwardArrowKey);
      }
    }
    if (action === ActionType.created) {
      expect(listOfValues).to.include(userName);
    } else if (action === ActionType.deleted)
      expect(listOfValues).to.not.include(userName);
  }

  @then(/^User should see the validation error message$/)
  public async verifyValidationErrorMessage() {
    let errorMessage: string = await testFunction.text(filesPage.errorMessage);
    expect(errorMessage).to.be.equal(
      "There's already a folder with this name. Try a different name."
    );
  }

  // This Function retrives all the Display Name Present in the Page
  public async getDisplayNameFromList(): Promise<string[]> {
    await testFunction.waitForElementToBeDisplayed(filesPage.displayNameList);
    let elem = await element.all(filesPage.displayNameList);
    let listOfValues: string[] = [];
    for (const el of elem) {
      const val: any = await el.getText();
      listOfValues.push(val);
    }
    return listOfValues;
  }

  // Function to Click on Delete Action Button of a Specific User
  public async clickOnDeleteActionBtnForUser(userName: string): Promise<any> {
    let user = await this.getDisplayNameFromList();
    if (user.includes(userName)) {
      console.log("Found the user");
      await element(
        by.xpath(
          `.//*[contains(@data-automation-id,'${userName}')]/ancestor::adf-datatable-row//button[@title="Content actions"]`
        )
      ).click();
    }
  }
}

export = TestSteps;
