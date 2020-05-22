import { element, by, ElementFinder } from 'protractor';

export class ServiceFacilityComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-service-facility div table .btn-danger'));
  title = element.all(by.css('sys-service-facility div h2#page-heading span')).first();
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

export class ServiceFacilityUpdatePage {
  pageTitle = element(by.id('sys-service-facility-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fromDateInput = element(by.id('field_fromDate'));
  thruDateInput = element(by.id('field_thruDate'));
  startTimeInput = element(by.id('field_startTime'));
  endTimeInput = element(by.id('field_endTime'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  recurrenceInput = element(by.id('field_recurrence'));
  intervalInput = element(by.id('field_interval'));
  gracePeriodInput = element(by.id('field_gracePeriod'));
  createdDateInput = element(by.id('field_createdDate'));
  lastModifiedDateInput = element(by.id('field_lastModifiedDate'));

  frequencySelect = element(by.id('field_frequency'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFromDateInput(fromDate: string): Promise<void> {
    await this.fromDateInput.sendKeys(fromDate);
  }

  async getFromDateInput(): Promise<string> {
    return await this.fromDateInput.getAttribute('value');
  }

  async setThruDateInput(thruDate: string): Promise<void> {
    await this.thruDateInput.sendKeys(thruDate);
  }

  async getThruDateInput(): Promise<string> {
    return await this.thruDateInput.getAttribute('value');
  }

  async setStartTimeInput(startTime: string): Promise<void> {
    await this.startTimeInput.sendKeys(startTime);
  }

  async getStartTimeInput(): Promise<string> {
    return await this.startTimeInput.getAttribute('value');
  }

  async setEndTimeInput(endTime: string): Promise<void> {
    await this.endTimeInput.sendKeys(endTime);
  }

  async getEndTimeInput(): Promise<string> {
    return await this.endTimeInput.getAttribute('value');
  }

  async setStartDateInput(startDate: string): Promise<void> {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput(): Promise<string> {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate: string): Promise<void> {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput(): Promise<string> {
    return await this.endDateInput.getAttribute('value');
  }

  async setRecurrenceInput(recurrence: string): Promise<void> {
    await this.recurrenceInput.sendKeys(recurrence);
  }

  async getRecurrenceInput(): Promise<string> {
    return await this.recurrenceInput.getAttribute('value');
  }

  async setIntervalInput(interval: string): Promise<void> {
    await this.intervalInput.sendKeys(interval);
  }

  async getIntervalInput(): Promise<string> {
    return await this.intervalInput.getAttribute('value');
  }

  async setGracePeriodInput(gracePeriod: string): Promise<void> {
    await this.gracePeriodInput.sendKeys(gracePeriod);
  }

  async getGracePeriodInput(): Promise<string> {
    return await this.gracePeriodInput.getAttribute('value');
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

  async frequencySelectLastOption(): Promise<void> {
    await this.frequencySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async frequencySelectOption(option: string): Promise<void> {
    await this.frequencySelect.sendKeys(option);
  }

  getFrequencySelect(): ElementFinder {
    return this.frequencySelect;
  }

  async getFrequencySelectedOption(): Promise<string> {
    return await this.frequencySelect.element(by.css('option:checked')).getText();
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

export class ServiceFacilityDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-serviceFacility-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-serviceFacility'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
