import { protractor, browser, Locator, element } from "protractor";
const EC = protractor.ExpectedConditions;

/**
 * Helper Function which are needed to perform action on a browser
 */

export class TestFunction {
  /**
   * Function to Wait for an Element till its Visible within the time Frame
   */
  public async waitForElementToBeDisplayed(elem: Locator): Promise<any> {
    await browser.wait(EC.visibilityOf(browser.element(elem)), 7000);
  }

  /**
   * Function to click on Element
   */

  public async click(elem: Locator): Promise<any> {
    await element(elem).click();
  }

  /**
   * Function to Input Text on Element
   */

  public async inputText(elem: Locator, text: string): Promise<any> {
    await element(elem).sendKeys(text);
  }

  /**
   * Function to Check if an Element is Displayed return boolean True/False value
   */

  public async displayed(elem: Locator): Promise<boolean> {
    return await element(elem).isDisplayed();
  }

  /**
   * Function to Check if an Element is Present return boolean True/False value
   */

  public async present(elem: Locator): Promise<boolean> {
    return await element(elem).isPresent();
  }

  /**
   * Function to Get Text from an Element returns String
   */

  public async text(elem: Locator): Promise<string> {
    return await element(elem).getText();
  }

  /**
   * Function to Get any attribute value from an Element returns String
   */

  public async getAttributeValue(
    elem: Locator,
    attribute: string
  ): Promise<string> {
    return await element(elem).getAttribute(attribute);
  }
}
