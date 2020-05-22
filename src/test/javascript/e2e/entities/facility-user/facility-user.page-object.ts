import { element, by, ElementFinder } from 'protractor';

export class FacilityUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-facility-user div table .btn-danger'));
  title = element.all(by.css('sys-facility-user div h2#page-heading span')).first();
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

export class FacilityUserUpdatePage {
  pageTitle = element(by.id('sys-facility-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  userSelect = element(by.id('field_user'));
  facilitySelect = element(by.id('field_facility'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
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

  async facilitySelectLastOption(): Promise<void> {
    await this.facilitySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facilitySelectOption(option: string): Promise<void> {
    await this.facilitySelect.sendKeys(option);
  }

  getFacilitySelect(): ElementFinder {
    return this.facilitySelect;
  }

  async getFacilitySelectedOption(): Promise<string> {
    return await this.facilitySelect.element(by.css('option:checked')).getText();
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

export class FacilityUserDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-facilityUser-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-facilityUser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
