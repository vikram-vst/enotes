import { element, by, ElementFinder } from 'protractor';

export class PreferenceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-preference div table .btn-danger'));
  title = element.all(by.css('sys-preference div h2#page-heading span')).first();
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

export class PreferenceUpdatePage {
  pageTitle = element(by.id('sys-preference-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  preferenceTypeSelect = element(by.id('field_preferenceType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async preferenceTypeSelectLastOption(): Promise<void> {
    await this.preferenceTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async preferenceTypeSelectOption(option: string): Promise<void> {
    await this.preferenceTypeSelect.sendKeys(option);
  }

  getPreferenceTypeSelect(): ElementFinder {
    return this.preferenceTypeSelect;
  }

  async getPreferenceTypeSelectedOption(): Promise<string> {
    return await this.preferenceTypeSelect.element(by.css('option:checked')).getText();
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

export class PreferenceDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-preference-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-preference'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
