import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FacilityTypeComponentsPage, FacilityTypeDeleteDialog, FacilityTypeUpdatePage } from './facility-type.page-object';

const expect = chai.expect;

describe('FacilityType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facilityTypeComponentsPage: FacilityTypeComponentsPage;
  let facilityTypeUpdatePage: FacilityTypeUpdatePage;
  let facilityTypeDeleteDialog: FacilityTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FacilityTypes', async () => {
    await navBarPage.goToEntity('facility-type');
    facilityTypeComponentsPage = new FacilityTypeComponentsPage();
    await browser.wait(ec.visibilityOf(facilityTypeComponentsPage.title), 5000);
    expect(await facilityTypeComponentsPage.getTitle()).to.eq('enotesApp.facilityType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(facilityTypeComponentsPage.entities), ec.visibilityOf(facilityTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FacilityType page', async () => {
    await facilityTypeComponentsPage.clickOnCreateButton();
    facilityTypeUpdatePage = new FacilityTypeUpdatePage();
    expect(await facilityTypeUpdatePage.getPageTitle()).to.eq('enotesApp.facilityType.home.createOrEditLabel');
    await facilityTypeUpdatePage.cancel();
  });

  it('should create and save FacilityTypes', async () => {
    const nbButtonsBeforeCreate = await facilityTypeComponentsPage.countDeleteButtons();

    await facilityTypeComponentsPage.clickOnCreateButton();

    await promise.all([facilityTypeUpdatePage.setNameInput('name'), facilityTypeUpdatePage.setDescriptionInput('description')]);

    expect(await facilityTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await facilityTypeUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await facilityTypeUpdatePage.save();
    expect(await facilityTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await facilityTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last FacilityType', async () => {
    const nbButtonsBeforeDelete = await facilityTypeComponentsPage.countDeleteButtons();
    await facilityTypeComponentsPage.clickOnLastDeleteButton();

    facilityTypeDeleteDialog = new FacilityTypeDeleteDialog();
    expect(await facilityTypeDeleteDialog.getDialogTitle()).to.eq('enotesApp.facilityType.delete.question');
    await facilityTypeDeleteDialog.clickOnConfirmButton();

    expect(await facilityTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
