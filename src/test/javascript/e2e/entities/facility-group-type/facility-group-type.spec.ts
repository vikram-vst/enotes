import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  FacilityGroupTypeComponentsPage,
  FacilityGroupTypeDeleteDialog,
  FacilityGroupTypeUpdatePage
} from './facility-group-type.page-object';

const expect = chai.expect;

describe('FacilityGroupType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facilityGroupTypeComponentsPage: FacilityGroupTypeComponentsPage;
  let facilityGroupTypeUpdatePage: FacilityGroupTypeUpdatePage;
  let facilityGroupTypeDeleteDialog: FacilityGroupTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FacilityGroupTypes', async () => {
    await navBarPage.goToEntity('facility-group-type');
    facilityGroupTypeComponentsPage = new FacilityGroupTypeComponentsPage();
    await browser.wait(ec.visibilityOf(facilityGroupTypeComponentsPage.title), 5000);
    expect(await facilityGroupTypeComponentsPage.getTitle()).to.eq('enotesApp.facilityGroupType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(facilityGroupTypeComponentsPage.entities), ec.visibilityOf(facilityGroupTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FacilityGroupType page', async () => {
    await facilityGroupTypeComponentsPage.clickOnCreateButton();
    facilityGroupTypeUpdatePage = new FacilityGroupTypeUpdatePage();
    expect(await facilityGroupTypeUpdatePage.getPageTitle()).to.eq('enotesApp.facilityGroupType.home.createOrEditLabel');
    await facilityGroupTypeUpdatePage.cancel();
  });

  it('should create and save FacilityGroupTypes', async () => {
    const nbButtonsBeforeCreate = await facilityGroupTypeComponentsPage.countDeleteButtons();

    await facilityGroupTypeComponentsPage.clickOnCreateButton();

    await promise.all([facilityGroupTypeUpdatePage.setNameInput('name'), facilityGroupTypeUpdatePage.setDescriptionInput('description')]);

    expect(await facilityGroupTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await facilityGroupTypeUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await facilityGroupTypeUpdatePage.save();
    expect(await facilityGroupTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await facilityGroupTypeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FacilityGroupType', async () => {
    const nbButtonsBeforeDelete = await facilityGroupTypeComponentsPage.countDeleteButtons();
    await facilityGroupTypeComponentsPage.clickOnLastDeleteButton();

    facilityGroupTypeDeleteDialog = new FacilityGroupTypeDeleteDialog();
    expect(await facilityGroupTypeDeleteDialog.getDialogTitle()).to.eq('enotesApp.facilityGroupType.delete.question');
    await facilityGroupTypeDeleteDialog.clickOnConfirmButton();

    expect(await facilityGroupTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
