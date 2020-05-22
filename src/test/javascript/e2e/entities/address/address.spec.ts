import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AddressComponentsPage, AddressDeleteDialog, AddressUpdatePage } from './address.page-object';

const expect = chai.expect;

describe('Address e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let addressComponentsPage: AddressComponentsPage;
  let addressUpdatePage: AddressUpdatePage;
  let addressDeleteDialog: AddressDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Addresses', async () => {
    await navBarPage.goToEntity('address');
    addressComponentsPage = new AddressComponentsPage();
    await browser.wait(ec.visibilityOf(addressComponentsPage.title), 5000);
    expect(await addressComponentsPage.getTitle()).to.eq('enotesApp.address.home.title');
    await browser.wait(ec.or(ec.visibilityOf(addressComponentsPage.entities), ec.visibilityOf(addressComponentsPage.noResult)), 1000);
  });

  it('should load create Address page', async () => {
    await addressComponentsPage.clickOnCreateButton();
    addressUpdatePage = new AddressUpdatePage();
    expect(await addressUpdatePage.getPageTitle()).to.eq('enotesApp.address.home.createOrEditLabel');
    await addressUpdatePage.cancel();
  });

  it('should create and save Addresses', async () => {
    const nbButtonsBeforeCreate = await addressComponentsPage.countDeleteButtons();

    await addressComponentsPage.clickOnCreateButton();

    await promise.all([
      addressUpdatePage.setStreetAddressInput('streetAddress'),
      addressUpdatePage.setStreetAddress2Input('streetAddress2'),
      addressUpdatePage.setCityInput('city'),
      addressUpdatePage.setLandmarkInput('landmark'),
      addressUpdatePage.setPostalCodeInput('postalCode'),
      addressUpdatePage.setNoteInput('note'),
      addressUpdatePage.setCustomAddressTypeInput('customAddressType'),
      addressUpdatePage.statusSelectLastOption(),
      addressUpdatePage.stateSelectLastOption(),
      addressUpdatePage.pincodeSelectLastOption(),
      addressUpdatePage.countrySelectLastOption(),
      addressUpdatePage.addressTypeSelectLastOption(),
      addressUpdatePage.geoPointSelectLastOption(),
      addressUpdatePage.userSelectLastOption()
    ]);

    expect(await addressUpdatePage.getStreetAddressInput()).to.eq(
      'streetAddress',
      'Expected StreetAddress value to be equals to streetAddress'
    );
    expect(await addressUpdatePage.getStreetAddress2Input()).to.eq(
      'streetAddress2',
      'Expected StreetAddress2 value to be equals to streetAddress2'
    );
    expect(await addressUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await addressUpdatePage.getLandmarkInput()).to.eq('landmark', 'Expected Landmark value to be equals to landmark');
    expect(await addressUpdatePage.getPostalCodeInput()).to.eq('postalCode', 'Expected PostalCode value to be equals to postalCode');
    expect(await addressUpdatePage.getNoteInput()).to.eq('note', 'Expected Note value to be equals to note');
    const selectedIsDefault = addressUpdatePage.getIsDefaultInput();
    if (await selectedIsDefault.isSelected()) {
      await addressUpdatePage.getIsDefaultInput().click();
      expect(await addressUpdatePage.getIsDefaultInput().isSelected(), 'Expected isDefault not to be selected').to.be.false;
    } else {
      await addressUpdatePage.getIsDefaultInput().click();
      expect(await addressUpdatePage.getIsDefaultInput().isSelected(), 'Expected isDefault to be selected').to.be.true;
    }
    expect(await addressUpdatePage.getCustomAddressTypeInput()).to.eq(
      'customAddressType',
      'Expected CustomAddressType value to be equals to customAddressType'
    );

    await addressUpdatePage.save();
    expect(await addressUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Address', async () => {
    const nbButtonsBeforeDelete = await addressComponentsPage.countDeleteButtons();
    await addressComponentsPage.clickOnLastDeleteButton();

    addressDeleteDialog = new AddressDeleteDialog();
    expect(await addressDeleteDialog.getDialogTitle()).to.eq('enotesApp.address.delete.question');
    await addressDeleteDialog.clickOnConfirmButton();

    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
