import { element, by, ElementFinder } from 'protractor';

export class ServiceDefinitionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-service-definition div table .btn-danger'));
  title = element.all(by.css('sys-service-definition div h2#page-heading span')).first();
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

export class ServiceDefinitionUpdatePage {
  pageTitle = element(by.id('sys-service-definition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  versionInput = element(by.id('field_version'));
  imagePathInput = element(by.id('field_imagePath'));
  createdDateInput = element(by.id('field_createdDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));
  fieldsInput = element(by.id('field_fields'));

  statusSelect = element(by.id('field_status'));
  serviceSelect = element(by.id('field_service'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setVersionInput(version: string): Promise<void> {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput(): Promise<string> {
    return await this.versionInput.getAttribute('value');
  }

  async setImagePathInput(imagePath: string): Promise<void> {
    await this.imagePathInput.sendKeys(imagePath);
  }

  async getImagePathInput(): Promise<string> {
    return await this.imagePathInput.getAttribute('value');
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

  async setFieldsInput(fields: string): Promise<void> {
    await this.fieldsInput.sendKeys(fields);
  }

  async getFieldsInput(): Promise<string> {
    return await this.fieldsInput.getAttribute('value');
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async statusSelectOption(option: string): Promise<void> {
    await this.statusSelect.sendKeys(option);
  }

  getStatusSelect(): ElementFinder {
    return this.statusSelect;
  }

  async getStatusSelectedOption(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
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

export class ServiceDefinitionDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-serviceDefinition-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-serviceDefinition'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
