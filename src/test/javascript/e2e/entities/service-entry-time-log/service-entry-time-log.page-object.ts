import { element, by, ElementFinder } from 'protractor';

export class ServiceEntryTimeLogComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-service-entry-time-log div table .btn-danger'));
  title = element.all(by.css('sys-service-entry-time-log div h2#page-heading span')).first();
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

export class ServiceEntryTimeLogUpdatePage {
  pageTitle = element(by.id('sys-service-entry-time-log-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  createdDateInput = element(by.id('field_createdDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));

  serviceEntrySelect = element(by.id('field_serviceEntry'));
  modifiedBySelect = element(by.id('field_modifiedBy'));
  createdBySelect = element(by.id('field_createdBy'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCreatedDateInput(createdDate: string): Promise<void> {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput(): Promise<string> {
    return await this.createdDateInput.getAttribute('value');
  }

  async setLastModifiedDateInput(lastModifiedDate: string): Promise<void> {
    await this.lastModifiedDateInput.sendKeys(lastModifiedDate);
  }

  async getLastModifiedDateInput(): Promise<string> {
    return await this.lastModifiedDateInput.getAttribute('value');
  }

  async serviceEntrySelectLastOption(): Promise<void> {
    await this.serviceEntrySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async serviceEntrySelectOption(option: string): Promise<void> {
    await this.serviceEntrySelect.sendKeys(option);
  }

  getServiceEntrySelect(): ElementFinder {
    return this.serviceEntrySelect;
  }

  async getServiceEntrySelectedOption(): Promise<string> {
    return await this.serviceEntrySelect.element(by.css('option:checked')).getText();
  }

  async modifiedBySelectLastOption(): Promise<void> {
    await this.modifiedBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async modifiedBySelectOption(option: string): Promise<void> {
    await this.modifiedBySelect.sendKeys(option);
  }

  getModifiedBySelect(): ElementFinder {
    return this.modifiedBySelect;
  }

  async getModifiedBySelectedOption(): Promise<string> {
    return await this.modifiedBySelect.element(by.css('option:checked')).getText();
  }

  async createdBySelectLastOption(): Promise<void> {
    await this.createdBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async createdBySelectOption(option: string): Promise<void> {
    await this.createdBySelect.sendKeys(option);
  }

  getCreatedBySelect(): ElementFinder {
    return this.createdBySelect;
  }

  async getCreatedBySelectedOption(): Promise<string> {
    return await this.createdBySelect.element(by.css('option:checked')).getText();
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

export class ServiceEntryTimeLogDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-serviceEntryTimeLog-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-serviceEntryTimeLog'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
