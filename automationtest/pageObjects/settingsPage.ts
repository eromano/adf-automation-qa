import { by } from "protractor";

/**
 * This contains all the Locator present in the Settings Page
 */

export class SettingsPage {
  providerType = by.xpath(".//*[@id='adf-provider-selector']");
  ecmType = by.xpath(".//mat-option//span[contains(text(),'ECM')]");
  applyBtn = by.id("host-button");
  form = by.id("host-form");
}
