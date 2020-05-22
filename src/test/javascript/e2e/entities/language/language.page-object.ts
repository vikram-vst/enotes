import { element, by, ElementFinder } from 'protractor';

export class LanguageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-language div table .btn-danger'));
  title = element.all(by.css('sys-language div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class LanguageUpdatePage {
  pageTitle = element(by.id('sys-language-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  isoLanguageCodeInput = element(by.id('field_isoLanguageCode'));
  nameInput = element(by.id('field_name'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIsoLanguageCodeInput(isoLanguageCode: string): Promise<void> {
    await this.isoLanguageCodeInput.sendKeys(isoLanguageCode);
  }

  async getIsoLanguageCodeInput(): Promise<string> {
    return await this.isoLanguageCodeInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class LanguageDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-language-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-language'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
