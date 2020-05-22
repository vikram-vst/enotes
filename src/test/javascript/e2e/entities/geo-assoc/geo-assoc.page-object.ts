import { element, by, ElementFinder } from 'protractor';

export class GeoAssocComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-geo-assoc div table .btn-danger'));
  title = element.all(by.css('sys-geo-assoc div h2#page-heading span')).first();
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

export class GeoAssocUpdatePage {
  pageTitle = element(by.id('sys-geo-assoc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  geoSelect = element(by.id('field_geo'));
  geoToSelect = element(by.id('field_geoTo'));
  geoAssocTypeSelect = element(by.id('field_geoAssocType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async geoSelectLastOption(): Promise<void> {
    await this.geoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async geoSelectOption(option: string): Promise<void> {
    await this.geoSelect.sendKeys(option);
  }

  getGeoSelect(): ElementFinder {
    return this.geoSelect;
  }

  async getGeoSelectedOption(): Promise<string> {
    return await this.geoSelect.element(by.css('option:checked')).getText();
  }

  async geoToSelectLastOption(): Promise<void> {
    await this.geoToSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async geoToSelectOption(option: string): Promise<void> {
    await this.geoToSelect.sendKeys(option);
  }

  getGeoToSelect(): ElementFinder {
    return this.geoToSelect;
  }

  async getGeoToSelectedOption(): Promise<string> {
    return await this.geoToSelect.element(by.css('option:checked')).getText();
  }

  async geoAssocTypeSelectLastOption(): Promise<void> {
    await this.geoAssocTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async geoAssocTypeSelectOption(option: string): Promise<void> {
    await this.geoAssocTypeSelect.sendKeys(option);
  }

  getGeoAssocTypeSelect(): ElementFinder {
    return this.geoAssocTypeSelect;
  }

  async getGeoAssocTypeSelectedOption(): Promise<string> {
    return await this.geoAssocTypeSelect.element(by.css('option:checked')).getText();
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

export class GeoAssocDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-geoAssoc-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-geoAssoc'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
