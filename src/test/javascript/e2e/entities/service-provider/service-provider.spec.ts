import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServiceProviderComponentsPage, ServiceProviderDeleteDialog, ServiceProviderUpdatePage } from './service-provider.page-object';

const expect = chai.expect;

describe('ServiceProvider e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceProviderComponentsPage: ServiceProviderComponentsPage;
  let serviceProviderUpdatePage: ServiceProviderUpdatePage;
  let serviceProviderDeleteDialog: ServiceProviderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceProviders', async () => {
    await navBarPage.goToEntity('service-provider');
    serviceProviderComponentsPage = new ServiceProviderComponentsPage();
    await browser.wait(ec.visibilityOf(serviceProviderComponentsPage.title), 5000);
    expect(await serviceProviderComponentsPage.getTitle()).to.eq('enotesApp.serviceProvider.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceProviderComponentsPage.entities), ec.visibilityOf(serviceProviderComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceProvider page', async () => {
    await serviceProviderComponentsPage.clickOnCreateButton();
    serviceProviderUpdatePage = new ServiceProviderUpdatePage();
    expect(await serviceProviderUpdatePage.getPageTitle()).to.eq('enotesApp.serviceProvider.home.createOrEditLabel');
    await serviceProviderUpdatePage.cancel();
  });

  it('should create and save ServiceProviders', async () => {
    const nbButtonsBeforeCreate = await serviceProviderComponentsPage.countDeleteButtons();

    await serviceProviderComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceProviderUpdatePage.setFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceProviderUpdatePage.setThruDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceProviderUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceProviderUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceProviderUpdatePage.userSelectLastOption(),
      serviceProviderUpdatePage.serviceSelectLastOption()
    ]);

    expect(await serviceProviderUpdatePage.getFromDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fromDate value to be equals to 2000-12-31'
    );
    expect(await serviceProviderUpdatePage.getThruDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected thruDate value to be equals to 2000-12-31'
    );
    expect(await serviceProviderUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await serviceProviderUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await serviceProviderUpdatePage.save();
    expect(await serviceProviderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceProviderComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ServiceProvider', async () => {
    const nbButtonsBeforeDelete = await serviceProviderComponentsPage.countDeleteButtons();
    await serviceProviderComponentsPage.clickOnLastDeleteButton();

    serviceProviderDeleteDialog = new ServiceProviderDeleteDialog();
    expect(await serviceProviderDeleteDialog.getDialogTitle()).to.eq('enotesApp.serviceProvider.delete.question');
    await serviceProviderDeleteDialog.clickOnConfirmButton();

    expect(await serviceProviderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
