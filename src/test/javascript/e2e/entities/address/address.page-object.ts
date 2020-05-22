import { element, by, ElementFinder } from 'protractor';

export class AddressComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-address div table .btn-danger'));
  title = element.all(by.css('sys-address div h2#page-heading span')).first();
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

export class AddressUpdatePage {
  pageTitle = element(by.id('sys-address-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  streetAddressInput = element(by.id('field_streetAddress'));
  streetAddress2Input = element(by.id('field_streetAddress2'));
  cityInput = element(by.id('field_city'));
  landmarkInput = element(by.id('field_landmark'));
  postalCodeInput = element(by.id('field_postalCode'));
  noteInput = element(by.id('field_note'));
  isDefaultInput = element(by.id('field_isDefault'));
  customAddressTypeInput = element(by.id('field_customAddressType'));

  statusSelect = element(by.id('field_status'));
  stateSelect = element(by.id('field_state'));
  pincodeSelect = element(by.id('field_pincode'));
  countrySelect = element(by.id('field_country'));
  addressTypeSelect = element(by.id('field_addressType'));
  geoPointSelect = element(by.id('field_geoPoint'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStreetAddressInput(streetAddress: string): Promise<void> {
    await this.streetAddressInput.sendKeys(streetAddress);
  }

  async getStreetAddressInput(): Promise<string> {
    return await this.streetAddressInput.getAttribute('value');
  }

  async setStreetAddress2Input(streetAddress2: string): Promise<void> {
    await this.streetAddress2Input.sendKeys(streetAddress2);
  }

  async getStreetAddress2Input(): Promise<string> {
    return await this.streetAddress2Input.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setLandmarkInput(landmark: string): Promise<void> {
    await this.landmarkInput.sendKeys(landmark);
  }

  async getLandmarkInput(): Promise<string> {
    return await this.landmarkInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode: string): Promise<void> {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput(): Promise<string> {
    return await this.postalCodeInput.getAttribute('value');
  }

  async setNoteInput(note: string): Promise<void> {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput(): Promise<string> {
    return await this.noteInput.getAttribute('value');
  }

  getIsDefaultInput(): ElementFinder {
    return this.isDefaultInput;
  }

  async setCustomAddressTypeInput(customAddressType: string): Promise<void> {
    await this.customAddressTypeInput.sendKeys(customAddressType);
  }

  async getCustomAddressTypeInput(): Promise<string> {
    return await this.customAddressTypeInput.getAttribute('value');
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

  async stateSelectLastOption(): Promise<void> {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stateSelectOption(option: string): Promise<void> {
    await this.stateSelect.sendKeys(option);
  }

  getStateSelect(): ElementFinder {
    return this.stateSelect;
  }

  async getStateSelectedOption(): Promise<string> {
    return await this.stateSelect.element(by.css('option:checked')).getText();
  }

  async pincodeSelectLastOption(): Promise<void> {
    await this.pincodeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async pincodeSelectOption(option: string): Promise<void> {
    await this.pincodeSelect.sendKeys(option);
  }

  getPincodeSelect(): ElementFinder {
    return this.pincodeSelect;
  }

  async getPincodeSelectedOption(): Promise<string> {
    return await this.pincodeSelect.element(by.css('option:checked')).getText();
  }

  async countrySelectLastOption(): Promise<void> {
    await this.countrySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async countrySelectOption(option: string): Promise<void> {
    await this.countrySelect.sendKeys(option);
  }

  getCountrySelect(): ElementFinder {
    return this.countrySelect;
  }

  async getCountrySelectedOption(): Promise<string> {
    return await this.countrySelect.element(by.css('option:checked')).getText();
  }

  async addressTypeSelectLastOption(): Promise<void> {
    await this.addressTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async addressTypeSelectOption(option: string): Promise<void> {
    await this.addressTypeSelect.sendKeys(option);
  }

  getAddressTypeSelect(): ElementFinder {
    return this.addressTypeSelect;
  }

  async getAddressTypeSelectedOption(): Promise<string> {
    return await this.addressTypeSelect.element(by.css('option:checked')).getText();
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

export class AddressDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-address-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-address'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
