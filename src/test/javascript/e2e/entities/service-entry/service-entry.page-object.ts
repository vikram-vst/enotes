import { element, by, ElementFinder } from 'protractor';

export class ServiceEntryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-service-entry div table .btn-danger'));
  title = element.all(by.css('sys-service-entry div h2#page-heading span')).first();
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

export class ServiceEntryUpdatePage {
  pageTitle = element(by.id('sys-service-entry-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  createdDateInput = element(by.id('field_createdDate'));
  initiatedDateInput = element(by.id('field_initiatedDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));
  serviceStartDateInput = element(by.id('field_serviceStartDate'));
  serviceEndDateInput = element(by.id('field_serviceEndDate'));
  entryInput = element(by.id('field_entry'));

  userSelect = element(by.id('field_user'));
  statusSelect = element(by.id('field_status'));
  serviceDefinitionSelect = element(by.id('field_serviceDefinition'));
  geoPointSelect = element(by.id('field_geoPoint'));
  addressSelect = element(by.id('field_address'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCreatedDateInput(createdDate: string): Promise<void> {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput(): Promise<string> {
    return await this.createdDateInput.getAttribute('value');
  }

  async setInitiatedDateInput(initiatedDate: string): Promise<void> {
    await this.initiatedDateInput.sendKeys(initiatedDate);
  }

  async getInitiatedDateInput(): Promise<string> {
    return await this.initiatedDateInput.getAttribute('value');
  }

  async setLastModifiedDateInput(lastModifiedDate: string): Promise<void> {
    await this.lastModifiedDateInput.sendKeys(lastModifiedDate);
  }

  async getLastModifiedDateInput(): Promise<string> {
    return await this.lastModifiedDateInput.getAttribute('value');
  }

  async setServiceStartDateInput(serviceStartDate: string): Promise<void> {
    await this.serviceStartDateInput.sendKeys(serviceStartDate);
  }

  async getServiceStartDateInput(): Promise<string> {
    return await this.serviceStartDateInput.getAttribute('value');
  }

  async setServiceEndDateInput(serviceEndDate: string): Promise<void> {
    await this.serviceEndDateInput.sendKeys(serviceEndDate);
  }

  async getServiceEndDateInput(): Promise<string> {
    return await this.serviceEndDateInput.getAttribute('value');
  }

  async setEntryInput(entry: string): Promise<void> {
    await this.entryInput.sendKeys(entry);
  }

  async getEntryInput(): Promise<string> {
    return await this.entryInput.getAttribute('value');
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

  async serviceDefinitionSelectLastOption(): Promise<void> {
    await this.serviceDefinitionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async serviceDefinitionSelectOption(option: string): Promise<void> {
    await this.serviceDefinitionSelect.sendKeys(option);
  }

  getServiceDefinitionSelect(): ElementFinder {
    return this.serviceDefinitionSelect;
  }

  async getServiceDefinitionSelectedOption(): Promise<string> {
    return await this.serviceDefinitionSelect.element(by.css('option:checked')).getText();
  }

  async geoPointSelectLastOption(): Promise<void> {
    await this.geoPointSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async geoPointSelectOption(option: string): Promise<void> {
    await this.geoPointSelect.sendKeys(option);
  }

  getGeoPointSelect(): ElementFinder {
    return this.geoPointSelect;
  }

  async getGeoPointSelectedOption(): Promise<string> {
    return await this.geoPointSelect.element(by.css('option:checked')).getText();
  }

  async addressSelectLastOption(): Promise<void> {
    await this.addressSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async addressSelectOption(option: string): Promise<void> {
    await this.addressSelect.sendKeys(option);
  }

  getAddressSelect(): ElementFinder {
    return this.addressSelect;
  }

  async getAddressSelectedOption(): Promise<string> {
    return await this.addressSelect.element(by.css('option:checked')).getText();
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

export class ServiceEntryDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-serviceEntry-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-serviceEntry'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
