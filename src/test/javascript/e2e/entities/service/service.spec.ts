import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServiceComponentsPage, ServiceDeleteDialog, ServiceUpdatePage } from './service.page-object';

const expect = chai.expect;

describe('Service e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceComponentsPage: ServiceComponentsPage;
  let serviceUpdatePage: ServiceUpdatePage;
  let serviceDeleteDialog: ServiceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Services', async () => {
    await navBarPage.goToEntity('service');
    serviceComponentsPage = new ServiceComponentsPage();
    await browser.wait(ec.visibilityOf(serviceComponentsPage.title), 5000);
    expect(await serviceComponentsPage.getTitle()).to.eq('enotesApp.service.home.title');
    await browser.wait(ec.or(ec.visibilityOf(serviceComponentsPage.entities), ec.visibilityOf(serviceComponentsPage.noResult)), 1000);
  });

  it('should load create Service page', async () => {
    await serviceComponentsPage.clickOnCreateButton();
    serviceUpdatePage = new ServiceUpdatePage();
    expect(await serviceUpdatePage.getPageTitle()).to.eq('enotesApp.service.home.createOrEditLabel');
    await serviceUpdatePage.cancel();
  });

  it('should create and save Services', async () => {
    const nbButtonsBeforeCreate = await serviceComponentsPage.countDeleteButtons();

    await serviceComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceUpdatePage.setTitleInput('title'),
      serviceUpdatePage.setSequenceNoInput('5'),
      serviceUpdatePage.setStartTimeInput('PT12S'),
      serviceUpdatePage.setEndTimeInput('PT12S'),
      serviceUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceUpdatePage.setRecurrenceInput('5'),
      serviceUpdatePage.setIntervalInput('PT12S'),
      serviceUpdatePage.setGracePeriodInput('PT12S'),
      serviceUpdatePage.setImagePathInput('imagePath'),
      serviceUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceUpdatePage.categorySelectLastOption(),
      serviceUpdatePage.frequencySelectLastOption()
    ]);

    expect(await serviceUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await serviceUpdatePage.getSequenceNoInput()).to.eq('5', 'Expected sequenceNo value to be equals to 5');
    expect(await serviceUpdatePage.getStartTimeInput()).to.contain('12', 'Expected startTime value to be equals to 12');
    expect(await serviceUpdatePage.getEndTimeInput()).to.contain('12', 'Expected endTime value to be equals to 12');
    expect(await serviceUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await serviceUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30', 'Expected endDate value to be equals to 2000-12-31');
    expect(await serviceUpdatePage.getRecurrenceInput()).to.eq('5', 'Expected recurrence value to be equals to 5');
    expect(await serviceUpdatePage.getIntervalInput()).to.contain('12', 'Expected interval value to be equals to 12');
    expect(await serviceUpdatePage.getGracePeriodInput()).to.contain('12', 'Expected gracePeriod value to be equals to 12');
    expect(await serviceUpdatePage.getImagePathInput()).to.eq('imagePath', 'Expected ImagePath value to be equals to imagePath');
    expect(await serviceUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await serviceUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await serviceUpdatePage.save();
    expect(await serviceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Service', async () => {
    const nbButtonsBeforeDelete = await serviceComponentsPage.countDeleteButtons();
    await serviceComponentsPage.clickOnLastDeleteButton();

    serviceDeleteDialog = new ServiceDeleteDialog();
    expect(await serviceDeleteDialog.getDialogTitle()).to.eq('enotesApp.service.delete.question');
    await serviceDeleteDialog.clickOnConfirmButton();

    expect(await serviceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
