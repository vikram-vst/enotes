import { element, by, ElementFinder } from 'protractor';

export class GeoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-geo div table .btn-danger'));
  title = element.all(by.css('sys-geo div h2#page-heading span')).first();
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

export class GeoUpdatePage {
  pageTitle = element(by.id('sys-geo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  codeInput = element(by.id('field_code'));
  abbreviationInput = element(by.id('field_abbreviation'));

  geoTypeSelect = element(by.id('field_geoType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setCodeInput(code: string): Promise<void> {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput(): Promise<string> {
    return await this.codeInput.getAttribute('value');
  }

  async setAbbreviationInput(abbreviation: string): Promise<void> {
    await this.abbreviationInput.sendKeys(abbreviation);
  }

  async getAbbreviationInput(): Promise<string> {
    return await this.abbreviationInput.getAttribute('value');
  }

  async geoTypeSelectLastOption(): Promise<void> {
    await this.geoTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async geoTypeSelectOption(option: string): Promise<void> {
    await this.geoTypeSelect.sendKeys(option);
  }

  getGeoTypeSelect(): ElementFinder {
    return this.geoTypeSelect;
  }

  async getGeoTypeSelectedOption(): Promise<string> {
    return await this.geoTypeSelect.element(by.css('option:checked')).getText();
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

export class GeoDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-geo-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-geo'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
