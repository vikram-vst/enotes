import { element, by, ElementFinder } from 'protractor';

export class ServiceCategoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-service-category div table .btn-danger'));
  title = element.all(by.css('sys-service-category div h2#page-heading span')).first();
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

export class ServiceCategoryUpdatePage {
  pageTitle = element(by.id('sys-service-category-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  sequenceNoInput = element(by.id('field_sequenceNo'));
  parentCategoryInput = element(by.id('field_parentCategory'));
  imagePathInput = element(by.id('field_imagePath'));
  createdDateInput = element(by.id('field_createdDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setSequenceNoInput(sequenceNo: string): Promise<void> {
    await this.sequenceNoInput.sendKeys(sequenceNo);
  }

  async getSequenceNoInput(): Promise<string> {
    return await this.sequenceNoInput.getAttribute('value');
  }

  async setParentCategoryInput(parentCategory: string): Promise<void> {
    await this.parentCategoryInput.sendKeys(parentCategory);
  }

  async getParentCategoryInput(): Promise<string> {
    return await this.parentCategoryInput.getAttribute('value');
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

export class ServiceCategoryDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-serviceCategory-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-serviceCategory'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
