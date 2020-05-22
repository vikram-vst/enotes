import { element, by, ElementFinder } from 'protractor';

export class OtpAuthComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-otp-auth div table .btn-danger'));
  title = element.all(by.css('sys-otp-auth div h2#page-heading span')).first();
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

export class OtpAuthUpdatePage {
  pageTitle = element(by.id('sys-otp-auth-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  otpInput = element(by.id('field_otp'));
  otpSentInput = element(by.id('field_otpSent'));
  verificationSuccessInput = element(by.id('field_verificationSuccess'));
  otpExpiredInput = element(by.id('field_otpExpired'));
  otpSentTimeInput = element(by.id('field_otpSentTime'));
  sentCounterInput = element(by.id('field_sentCounter'));
  failCounterInput = element(by.id('field_failCounter'));
  otpResetCounterInput = element(by.id('field_otpResetCounter'));
  maxResendInput = element(by.id('field_maxResend'));
  maxResetInput = element(by.id('field_maxReset'));
  maxFailuresInput = element(by.id('field_maxFailures'));
  otpActiveTimeInput = element(by.id('field_otpActiveTime'));
  createdDateInput = element(by.id('field_createdDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOtpInput(otp: string): Promise<void> {
    await this.otpInput.sendKeys(otp);
  }

  async getOtpInput(): Promise<string> {
    return await this.otpInput.getAttribute('value');
  }

  getOtpSentInput(): ElementFinder {
    return this.otpSentInput;
  }

  getVerificationSuccessInput(): ElementFinder {
    return this.verificationSuccessInput;
  }

  getOtpExpiredInput(): ElementFinder {
    return this.otpExpiredInput;
  }

  async setOtpSentTimeInput(otpSentTime: string): Promise<void> {
    await this.otpSentTimeInput.sendKeys(otpSentTime);
  }

  async getOtpSentTimeInput(): Promise<string> {
    return await this.otpSentTimeInput.getAttribute('value');
  }

  async setSentCounterInput(sentCounter: string): Promise<void> {
    await this.sentCounterInput.sendKeys(sentCounter);
  }

  async getSentCounterInput(): Promise<string> {
    return await this.sentCounterInput.getAttribute('value');
  }

  async setFailCounterInput(failCounter: string): Promise<void> {
    await this.failCounterInput.sendKeys(failCounter);
  }

  async getFailCounterInput(): Promise<string> {
    return await this.failCounterInput.getAttribute('value');
  }

  async setOtpResetCounterInput(otpResetCounter: string): Promise<void> {
    await this.otpResetCounterInput.sendKeys(otpResetCounter);
  }

  async getOtpResetCounterInput(): Promise<string> {
    return await this.otpResetCounterInput.getAttribute('value');
  }

  async setMaxResendInput(maxResend: string): Promise<void> {
    await this.maxResendInput.sendKeys(maxResend);
  }

  async getMaxResendInput(): Promise<string> {
    return await this.maxResendInput.getAttribute('value');
  }

  async setMaxResetInput(maxReset: string): Promise<void> {
    await this.maxResetInput.sendKeys(maxReset);
  }

  async getMaxResetInput(): Promise<string> {
    return await this.maxResetInput.getAttribute('value');
  }

  async setMaxFailuresInput(maxFailures: string): Promise<void> {
    await this.maxFailuresInput.sendKeys(maxFailures);
  }

  async getMaxFailuresInput(): Promise<string> {
    return await this.maxFailuresInput.getAttribute('value');
  }

  async setOtpActiveTimeInput(otpActiveTime: string): Promise<void> {
    await this.otpActiveTimeInput.sendKeys(otpActiveTime);
  }

  async getOtpActiveTimeInput(): Promise<string> {
    return await this.otpActiveTimeInput.getAttribute('value');
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

export class OtpAuthDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-otpAuth-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-otpAuth'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
