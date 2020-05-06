import { by } from "protractor";

/**
 * This contains all the Locator present in the Files Page
 */

export class FilesPage {
  homePage = by.xpath('.//*[@class="app-home-background"]');
  documentList = by.id("document-list-container");
  newFolderButton = by.xpath(
    ".//button[@data-automation-id='create-new-folder']"
  );
  newFolderDialog = by.xpath(
    ".//mat-dialog-container[contains(@id,'mat-dialog')]"
  );
  dataTableRow = by.xpath(
    './/*[contains(@data-automation-id,"datatable-row")]'
  );
  displayNameList = by.xpath(
    './/*[@class="adf-datatable-body"]//*[@title="Display name"]'
  );
  nameField = by.id("adf-folder-name-input");
  createBtn = by.id("adf-folder-create-button");
  cancelBtn = by.id("adf-folder-cancel-button");
  errorMessage = by.xpath(".//*[contains(@class,'adf-error-snackbar')]");
  deleteBtn = by.xpath(
    './/*[@data-automation-id="DOCUMENT_LIST.ACTIONS.FOLDER.DELETE"]'
  );
  actionBtn = by.xpath(
    './/*[@title="name"]/ancestor::*[contains(@data-automation-id,"datatable-row")]//button[@aria-label="Actions"]'
  );
  totalPageCount = by.xpath('.//*[@class="adf-pagination__total-pages"]');
  currentPageCount = by.xpath(".//*[@class='adf-pagination__current-page']");
  forwardArrowKey = by.xpath(".//*[text()='keyboard_arrow_right']");
  previousArrowBtn = by.xpath('.//*[@aria-label="Previous page button"]');
  nextArrowBtn = by.xpath('.//*[@aria-label="Next page button"]');
}
