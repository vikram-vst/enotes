import { element, by, ElementFinder } from 'protractor';

export class PersonComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-person div table .btn-danger'));
  title = element.all(by.css('sys-person div h2#page-heading span')).first();
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

export class PersonUpdatePage {
  pageTitle = element(by.id('sys-person-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  displayNameInput = element(by.id('field_displayName'));
  profilePictureInput = element(by.id('file_profilePicture'));
  emailInput = element(by.id('field_email'));
  birthdateInput = element(by.id('field_birthdate'));
  notesInput = element(by.id('field_notes'));
  mobileNumberInput = element(by.id('field_mobileNumber'));
  createdDateInput = element(by.id('field_createdDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));

  userSelect = element(by.id('field_user'));
  statusSelect = element(by.id('field_status'));
  preferredLanguageSelect = element(by.id('field_preferredLanguage'));
  genderSelect = element(by.id('field_gender'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFirstNameInput(firstName: string): Promise<void> {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput(): Promise<string> {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName: string): Promise<void> {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput(): Promise<string> {
    return await this.lastNameInput.getAttribute('value');
  }

  async setDisplayNameInput(displayName: string): Promise<void> {
    await this.displayNameInput.sendKeys(displayName);
  }

  async getDisplayNameInput(): Promise<string> {
    return await this.displayNameInput.getAttribute('value');
  }

  async setProfilePictureInput(profilePicture: string): Promise<void> {
    await this.profilePictureInput.sendKeys(profilePicture);
  }

  async getProfilePictureInput(): Promise<string> {
    return await this.profilePictureInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setBirthdateInput(birthdate: string): Promise<void> {
    await this.birthdateInput.sendKeys(birthdate);
  }

  async getBirthdateInput(): Promise<string> {
    return await this.birthdateInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async setMobileNumberInput(mobileNumber: string): Promise<void> {
    await this.mobileNumberInput.sendKeys(mobileNumber);
  }

  async getMobileNumberInput(): Promise<string> {
    return await this.mobileNumberInput.getAttribute('value');
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

  async preferredLanguageSelectLastOption(): Promise<void> {
    await this.preferredLanguageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async preferredLanguageSelectOption(option: string): Promise<void> {
    await this.preferredLanguageSelect.sendKeys(option);
  }

  getPreferredLanguageSelect(): ElementFinder {
    return this.preferredLanguageSelect;
  }

  async getPreferredLanguageSelectedOption(): Promise<string> {
    return await this.preferredLanguageSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption(): Promise<void> {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async genderSelectOption(option: string): Promise<void> {
    await this.genderSelect.sendKeys(option);
  }

  getGenderSelect(): ElementFinder {
    return this.genderSelect;
  }

  async getGenderSelectedOption(): Promise<string> {
    return await this.genderSelect.element(by.css('option:checked')).getText();
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

export class PersonDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-person-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-person'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
