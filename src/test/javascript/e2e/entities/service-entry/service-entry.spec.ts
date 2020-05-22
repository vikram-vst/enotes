import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ServiceEntryComponentsPage,
  /* ServiceEntryDeleteDialog, */
  ServiceEntryUpdatePage
} from './service-entry.page-object';

const expect = chai.expect;

describe('ServiceEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceEntryComponentsPage: ServiceEntryComponentsPage;
  let serviceEntryUpdatePage: ServiceEntryUpdatePage;
  /* let serviceEntryDeleteDialog: ServiceEntryDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceEntries', async () => {
    await navBarPage.goToEntity('service-entry');
    serviceEntryComponentsPage = new ServiceEntryComponentsPage();
    await browser.wait(ec.visibilityOf(serviceEntryComponentsPage.title), 5000);
    expect(await serviceEntryComponentsPage.getTitle()).to.eq('enotesApp.serviceEntry.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceEntryComponentsPage.entities), ec.visibilityOf(serviceEntryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceEntry page', async () => {
    await serviceEntryComponentsPage.clickOnCreateButton();
    serviceEntryUpdatePage = new ServiceEntryUpdatePage();
    expect(await serviceEntryUpdatePage.getPageTitle()).to.eq('enotesApp.serviceEntry.home.createOrEditLabel');
    await serviceEntryUpdatePage.cancel();
  });

  /* it('should create and save ServiceEntries', async () => {
        const nbButtonsBeforeCreate = await serviceEntryComponentsPage.countDeleteButtons();

        await serviceEntryComponentsPage.clickOnCreateButton();

        await promise.all([
            serviceEntryUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceEntryUpdatePage.setInitiatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceEntryUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceEntryUpdatePage.setServiceStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceEntryUpdatePage.setServiceEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceEntryUpdatePage.setEntryInput('entry'),
            serviceEntryUpdatePage.userSelectLastOption(),
            serviceEntryUpdatePage.statusSelectLastOption(),
            serviceEntryUpdatePage.serviceDefinitionSelectLastOption(),
            serviceEntryUpdatePage.geoPointSelectLastOption(),
            serviceEntryUpdatePage.addressSelectLastOption(),
        ]);

        expect(await serviceEntryUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30', 'Expected createdDate value to be equals to 2000-12-31');
        expect(await serviceEntryUpdatePage.getInitiatedDateInput()).to.contain('2001-01-01T02:30', 'Expected initiatedDate value to be equals to 2000-12-31');
        expect(await serviceEntryUpdatePage.getLastModifiedDateInput()).to.contain('2001-01-01T02:30', 'Expected lastModifiedDate value to be equals to 2000-12-31');
        expect(await serviceEntryUpdatePage.getServiceStartDateInput()).to.contain('2001-01-01T02:30', 'Expected serviceStartDate value to be equals to 2000-12-31');
        expect(await serviceEntryUpdatePage.getServiceEndDateInput()).to.contain('2001-01-01T02:30', 'Expected serviceEndDate value to be equals to 2000-12-31');
        expect(await serviceEntryUpdatePage.getEntryInput()).to.eq('entry', 'Expected Entry value to be equals to entry');

        await serviceEntryUpdatePage.save();
        expect(await serviceEntryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await serviceEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last ServiceEntry', async () => {
        const nbButtonsBeforeDelete = await serviceEntryComponentsPage.countDeleteButtons();
        await serviceEntryComponentsPage.clickOnLastDeleteButton();

        serviceEntryDeleteDialog = new ServiceEntryDeleteDialog();
        expect(await serviceEntryDeleteDialog.getDialogTitle())
            .to.eq('enotesApp.serviceEntry.delete.question');
        await serviceEntryDeleteDialog.clickOnConfirmButton();

        expect(await serviceEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
