import { element, by, ElementFinder } from 'protractor';

export class FacilityGroupComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-facility-group div table .btn-danger'));
  title = element.all(by.css('sys-facility-group div h2#page-heading span')).first();
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

export class FacilityGroupUpdatePage {
  pageTitle = element(by.id('sys-facility-group-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  facilityGroupTypeSelect = element(by.id('field_facilityGroupType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async facilityGroupTypeSelectLastOption(): Promise<void> {
    await this.facilityGroupTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facilityGroupTypeSelectOption(option: string): Promise<void> {
    await this.facilityGroupTypeSelect.sendKeys(option);
  }

  getFacilityGroupTypeSelect(): ElementFinder {
    return this.facilityGroupTypeSelect;
  }

  async getFacilityGroupTypeSelectedOption(): Promise<string> {
    return await this.facilityGroupTypeSelect.element(by.css('option:checked')).getText();
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

export class FacilityGroupDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-facilityGroup-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-facilityGroup'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
