import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AddressTypeComponentsPage, AddressTypeDeleteDialog, AddressTypeUpdatePage } from './address-type.page-object';

const expect = chai.expect;

describe('AddressType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let addressTypeComponentsPage: AddressTypeComponentsPage;
  let addressTypeUpdatePage: AddressTypeUpdatePage;
  let addressTypeDeleteDialog: AddressTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AddressTypes', async () => {
    await navBarPage.goToEntity('address-type');
    addressTypeComponentsPage = new AddressTypeComponentsPage();
    await browser.wait(ec.visibilityOf(addressTypeComponentsPage.title), 5000);
    expect(await addressTypeComponentsPage.getTitle()).to.eq('enotesApp.addressType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(addressTypeComponentsPage.entities), ec.visibilityOf(addressTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AddressType page', async () => {
    await addressTypeComponentsPage.clickOnCreateButton();
    addressTypeUpdatePage = new AddressTypeUpdatePage();
    expect(await addressTypeUpdatePage.getPageTitle()).to.eq('enotesApp.addressType.home.createOrEditLabel');
    await addressTypeUpdatePage.cancel();
  });

  it('should create and save AddressTypes', async () => {
    const nbButtonsBeforeCreate = await addressTypeComponentsPage.countDeleteButtons();

    await addressTypeComponentsPage.clickOnCreateButton();

    await promise.all([addressTypeUpdatePage.setNameInput('name')]);

    expect(await addressTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await addressTypeUpdatePage.save();
    expect(await addressTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await addressTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AddressType', async () => {
    const nbButtonsBeforeDelete = await addressTypeComponentsPage.countDeleteButtons();
    await addressTypeComponentsPage.clickOnLastDeleteButton();

    addressTypeDeleteDialog = new AddressTypeDeleteDialog();
    expect(await addressTypeDeleteDialog.getDialogTitle()).to.eq('enotesApp.addressType.delete.question');
    await addressTypeDeleteDialog.clickOnConfirmButton();

    expect(await addressTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
