import { element, by, ElementFinder } from 'protractor';

export class FacilityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-facility div table .btn-danger'));
  title = element.all(by.css('sys-facility div h2#page-heading span')).first();
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

export class FacilityUpdatePage {
  pageTitle = element(by.id('sys-facility-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));

  facilityTypeSelect = element(by.id('field_facilityType'));
  productStoreSelect = element(by.id('field_productStore'));
  facilityGroupSelect = element(by.id('field_facilityGroup'));
  ownerSelect = element(by.id('field_owner'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async facilityTypeSelectLastOption(): Promise<void> {
    await this.facilityTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facilityTypeSelectOption(option: string): Promise<void> {
    await this.facilityTypeSelect.sendKeys(option);
  }

  getFacilityTypeSelect(): ElementFinder {
    return this.facilityTypeSelect;
  }

  async getFacilityTypeSelectedOption(): Promise<string> {
    return await this.facilityTypeSelect.element(by.css('option:checked')).getText();
  }

  async productStoreSelectLastOption(): Promise<void> {
    await this.productStoreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productStoreSelectOption(option: string): Promise<void> {
    await this.productStoreSelect.sendKeys(option);
  }

  getProductStoreSelect(): ElementFinder {
    return this.productStoreSelect;
  }

  async getProductStoreSelectedOption(): Promise<string> {
    return await this.productStoreSelect.element(by.css('option:checked')).getText();
  }

  async facilityGroupSelectLastOption(): Promise<void> {
    await this.facilityGroupSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facilityGroupSelectOption(option: string): Promise<void> {
    await this.facilityGroupSelect.sendKeys(option);
  }

  getFacilityGroupSelect(): ElementFinder {
    return this.facilityGroupSelect;
  }

  async getFacilityGroupSelectedOption(): Promise<string> {
    return await this.facilityGroupSelect.element(by.css('option:checked')).getText();
  }

  async ownerSelectLastOption(): Promise<void> {
    await this.ownerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ownerSelectOption(option: string): Promise<void> {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect(): ElementFinder {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption(): Promise<string> {
    return await this.ownerSelect.element(by.css('option:checked')).getText();
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

export class FacilityDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-facility-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-facility'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
