import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ServiceEntryTimeLogComponentsPage,
  ServiceEntryTimeLogDeleteDialog,
  ServiceEntryTimeLogUpdatePage
} from './service-entry-time-log.page-object';

const expect = chai.expect;

describe('ServiceEntryTimeLog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceEntryTimeLogComponentsPage: ServiceEntryTimeLogComponentsPage;
  let serviceEntryTimeLogUpdatePage: ServiceEntryTimeLogUpdatePage;
  let serviceEntryTimeLogDeleteDialog: ServiceEntryTimeLogDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceEntryTimeLogs', async () => {
    await navBarPage.goToEntity('service-entry-time-log');
    serviceEntryTimeLogComponentsPage = new ServiceEntryTimeLogComponentsPage();
    await browser.wait(ec.visibilityOf(serviceEntryTimeLogComponentsPage.title), 5000);
    expect(await serviceEntryTimeLogComponentsPage.getTitle()).to.eq('enotesApp.serviceEntryTimeLog.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceEntryTimeLogComponentsPage.entities), ec.visibilityOf(serviceEntryTimeLogComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceEntryTimeLog page', async () => {
    await serviceEntryTimeLogComponentsPage.clickOnCreateButton();
    serviceEntryTimeLogUpdatePage = new ServiceEntryTimeLogUpdatePage();
    expect(await serviceEntryTimeLogUpdatePage.getPageTitle()).to.eq('enotesApp.serviceEntryTimeLog.home.createOrEditLabel');
    await serviceEntryTimeLogUpdatePage.cancel();
  });

  it('should create and save ServiceEntryTimeLogs', async () => {
    const nbButtonsBeforeCreate = await serviceEntryTimeLogComponentsPage.countDeleteButtons();

    await serviceEntryTimeLogComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceEntryTimeLogUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceEntryTimeLogUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceEntryTimeLogUpdatePage.serviceEntrySelectLastOption(),
      serviceEntryTimeLogUpdatePage.modifiedBySelectLastOption(),
      serviceEntryTimeLogUpdatePage.createdBySelectLastOption()
    ]);

    expect(await serviceEntryTimeLogUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await serviceEntryTimeLogUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await serviceEntryTimeLogUpdatePage.save();
    expect(await serviceEntryTimeLogUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceEntryTimeLogComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ServiceEntryTimeLog', async () => {
    const nbButtonsBeforeDelete = await serviceEntryTimeLogComponentsPage.countDeleteButtons();
    await serviceEntryTimeLogComponentsPage.clickOnLastDeleteButton();

    serviceEntryTimeLogDeleteDialog = new ServiceEntryTimeLogDeleteDialog();
    expect(await serviceEntryTimeLogDeleteDialog.getDialogTitle()).to.eq('enotesApp.serviceEntryTimeLog.delete.question');
    await serviceEntryTimeLogDeleteDialog.clickOnConfirmButton();

    expect(await serviceEntryTimeLogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
