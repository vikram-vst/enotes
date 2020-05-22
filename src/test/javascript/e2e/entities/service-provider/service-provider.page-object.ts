import { element, by, ElementFinder } from 'protractor';

export class ServiceProviderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-service-provider div table .btn-danger'));
  title = element.all(by.css('sys-service-provider div h2#page-heading span')).first();
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

export class ServiceProviderUpdatePage {
  pageTitle = element(by.id('sys-service-provider-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fromDateInput = element(by.id('field_fromDate'));
  thruDateInput = element(by.id('field_thruDate'));
  createdDateInput = element(by.id('field_createdDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));

  userSelect = element(by.id('field_user'));
  serviceSelect = element(by.id('field_service'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFromDateInput(fromDate: string): Promise<void> {
    await this.fromDateInput.sendKeys(fromDate);
  }

  async getFromDateInput(): Promise<string> {
    return await this.fromDateInput.getAttribute('value');
  }

  async setThruDateInput(thruDate: string): Promise<void> {
    await this.thruDateInput.sendKeys(thruDate);
  }

  async getThruDateInput(): Promise<string> {
    return await this.thruDateInput.getAttribute('value');
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

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async serviceSelectLastOption(): Promise<void> {
    await this.serviceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async serviceSelectOption(option: string): Promise<void> {
    await this.serviceSelect.sendKeys(option);
  }

  getServiceSelect(): ElementFinder {
    return this.serviceSelect;
  }

  async getServiceSelectedOption(): Promise<string> {
    return await this.serviceSelect.element(by.css('option:checked')).getText();
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

export class ServiceProviderDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-serviceProvider-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-serviceProvider'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
