import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ServiceEntryStatusLogComponentsPage,
  ServiceEntryStatusLogDeleteDialog,
  ServiceEntryStatusLogUpdatePage
} from './service-entry-status-log.page-object';

const expect = chai.expect;

describe('ServiceEntryStatusLog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceEntryStatusLogComponentsPage: ServiceEntryStatusLogComponentsPage;
  let serviceEntryStatusLogUpdatePage: ServiceEntryStatusLogUpdatePage;
  let serviceEntryStatusLogDeleteDialog: ServiceEntryStatusLogDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceEntryStatusLogs', async () => {
    await navBarPage.goToEntity('service-entry-status-log');
    serviceEntryStatusLogComponentsPage = new ServiceEntryStatusLogComponentsPage();
    await browser.wait(ec.visibilityOf(serviceEntryStatusLogComponentsPage.title), 5000);
    expect(await serviceEntryStatusLogComponentsPage.getTitle()).to.eq('enotesApp.serviceEntryStatusLog.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceEntryStatusLogComponentsPage.entities), ec.visibilityOf(serviceEntryStatusLogComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceEntryStatusLog page', async () => {
    await serviceEntryStatusLogComponentsPage.clickOnCreateButton();
    serviceEntryStatusLogUpdatePage = new ServiceEntryStatusLogUpdatePage();
    expect(await serviceEntryStatusLogUpdatePage.getPageTitle()).to.eq('enotesApp.serviceEntryStatusLog.home.createOrEditLabel');
    await serviceEntryStatusLogUpdatePage.cancel();
  });

  it('should create and save ServiceEntryStatusLogs', async () => {
    const nbButtonsBeforeCreate = await serviceEntryStatusLogComponentsPage.countDeleteButtons();

    await serviceEntryStatusLogComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceEntryStatusLogUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceEntryStatusLogUpdatePage.modifiedBySelectLastOption()
    ]);

    expect(await serviceEntryStatusLogUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );

    await serviceEntryStatusLogUpdatePage.save();
    expect(await serviceEntryStatusLogUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceEntryStatusLogComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ServiceEntryStatusLog', async () => {
    const nbButtonsBeforeDelete = await serviceEntryStatusLogComponentsPage.countDeleteButtons();
    await serviceEntryStatusLogComponentsPage.clickOnLastDeleteButton();

    serviceEntryStatusLogDeleteDialog = new ServiceEntryStatusLogDeleteDialog();
    expect(await serviceEntryStatusLogDeleteDialog.getDialogTitle()).to.eq('enotesApp.serviceEntryStatusLog.delete.question');
    await serviceEntryStatusLogDeleteDialog.clickOnConfirmButton();

    expect(await serviceEntryStatusLogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
