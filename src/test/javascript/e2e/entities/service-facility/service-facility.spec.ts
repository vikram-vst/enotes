import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServiceFacilityComponentsPage, ServiceFacilityDeleteDialog, ServiceFacilityUpdatePage } from './service-facility.page-object';

const expect = chai.expect;

describe('ServiceFacility e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceFacilityComponentsPage: ServiceFacilityComponentsPage;
  let serviceFacilityUpdatePage: ServiceFacilityUpdatePage;
  let serviceFacilityDeleteDialog: ServiceFacilityDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceFacilities', async () => {
    await navBarPage.goToEntity('service-facility');
    serviceFacilityComponentsPage = new ServiceFacilityComponentsPage();
    await browser.wait(ec.visibilityOf(serviceFacilityComponentsPage.title), 5000);
    expect(await serviceFacilityComponentsPage.getTitle()).to.eq('enotesApp.serviceFacility.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceFacilityComponentsPage.entities), ec.visibilityOf(serviceFacilityComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceFacility page', async () => {
    await serviceFacilityComponentsPage.clickOnCreateButton();
    serviceFacilityUpdatePage = new ServiceFacilityUpdatePage();
    expect(await serviceFacilityUpdatePage.getPageTitle()).to.eq('enotesApp.serviceFacility.home.createOrEditLabel');
    await serviceFacilityUpdatePage.cancel();
  });

  it('should create and save ServiceFacilities', async () => {
    const nbButtonsBeforeCreate = await serviceFacilityComponentsPage.countDeleteButtons();

    await serviceFacilityComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceFacilityUpdatePage.setFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceFacilityUpdatePage.setThruDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceFacilityUpdatePage.setStartTimeInput('PT12S'),
      serviceFacilityUpdatePage.setEndTimeInput('PT12S'),
      serviceFacilityUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceFacilityUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceFacilityUpdatePage.setRecurrenceInput('5'),
      serviceFacilityUpdatePage.setIntervalInput('PT12S'),
      serviceFacilityUpdatePage.setGracePeriodInput('PT12S'),
      serviceFacilityUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceFacilityUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceFacilityUpdatePage.frequencySelectLastOption()
    ]);

    expect(await serviceFacilityUpdatePage.getFromDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fromDate value to be equals to 2000-12-31'
    );
    expect(await serviceFacilityUpdatePage.getThruDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected thruDate value to be equals to 2000-12-31'
    );
    expect(await serviceFacilityUpdatePage.getStartTimeInput()).to.contain('12', 'Expected startTime value to be equals to 12');
    expect(await serviceFacilityUpdatePage.getEndTimeInput()).to.contain('12', 'Expected endTime value to be equals to 12');
    expect(await serviceFacilityUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await serviceFacilityUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );
    expect(await serviceFacilityUpdatePage.getRecurrenceInput()).to.eq('5', 'Expected recurrence value to be equals to 5');
    expect(await serviceFacilityUpdatePage.getIntervalInput()).to.contain('12', 'Expected interval value to be equals to 12');
    expect(await serviceFacilityUpdatePage.getGracePeriodInput()).to.contain('12', 'Expected gracePeriod value to be equals to 12');
    expect(await serviceFacilityUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await serviceFacilityUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await serviceFacilityUpdatePage.save();
    expect(await serviceFacilityUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceFacilityComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ServiceFacility', async () => {
    const nbButtonsBeforeDelete = await serviceFacilityComponentsPage.countDeleteButtons();
    await serviceFacilityComponentsPage.clickOnLastDeleteButton();

    serviceFacilityDeleteDialog = new ServiceFacilityDeleteDialog();
    expect(await serviceFacilityDeleteDialog.getDialogTitle()).to.eq('enotesApp.serviceFacility.delete.question');
    await serviceFacilityDeleteDialog.clickOnConfirmButton();

    expect(await serviceFacilityComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
