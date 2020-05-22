import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ServiceProviderRoleComponentsPage,
  ServiceProviderRoleDeleteDialog,
  ServiceProviderRoleUpdatePage
} from './service-provider-role.page-object';

const expect = chai.expect;

describe('ServiceProviderRole e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceProviderRoleComponentsPage: ServiceProviderRoleComponentsPage;
  let serviceProviderRoleUpdatePage: ServiceProviderRoleUpdatePage;
  let serviceProviderRoleDeleteDialog: ServiceProviderRoleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceProviderRoles', async () => {
    await navBarPage.goToEntity('service-provider-role');
    serviceProviderRoleComponentsPage = new ServiceProviderRoleComponentsPage();
    await browser.wait(ec.visibilityOf(serviceProviderRoleComponentsPage.title), 5000);
    expect(await serviceProviderRoleComponentsPage.getTitle()).to.eq('enotesApp.serviceProviderRole.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceProviderRoleComponentsPage.entities), ec.visibilityOf(serviceProviderRoleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceProviderRole page', async () => {
    await serviceProviderRoleComponentsPage.clickOnCreateButton();
    serviceProviderRoleUpdatePage = new ServiceProviderRoleUpdatePage();
    expect(await serviceProviderRoleUpdatePage.getPageTitle()).to.eq('enotesApp.serviceProviderRole.home.createOrEditLabel');
    await serviceProviderRoleUpdatePage.cancel();
  });

  it('should create and save ServiceProviderRoles', async () => {
    const nbButtonsBeforeCreate = await serviceProviderRoleComponentsPage.countDeleteButtons();

    await serviceProviderRoleComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceProviderRoleUpdatePage.setNameInput('name'),
      serviceProviderRoleUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceProviderRoleUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);

    expect(await serviceProviderRoleUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await serviceProviderRoleUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await serviceProviderRoleUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await serviceProviderRoleUpdatePage.save();
    expect(await serviceProviderRoleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceProviderRoleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ServiceProviderRole', async () => {
    const nbButtonsBeforeDelete = await serviceProviderRoleComponentsPage.countDeleteButtons();
    await serviceProviderRoleComponentsPage.clickOnLastDeleteButton();

    serviceProviderRoleDeleteDialog = new ServiceProviderRoleDeleteDialog();
    expect(await serviceProviderRoleDeleteDialog.getDialogTitle()).to.eq('enotesApp.serviceProviderRole.delete.question');
    await serviceProviderRoleDeleteDialog.clickOnConfirmButton();

    expect(await serviceProviderRoleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
