import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FacilityGroupComponentsPage, FacilityGroupDeleteDialog, FacilityGroupUpdatePage } from './facility-group.page-object';

const expect = chai.expect;

describe('FacilityGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facilityGroupComponentsPage: FacilityGroupComponentsPage;
  let facilityGroupUpdatePage: FacilityGroupUpdatePage;
  let facilityGroupDeleteDialog: FacilityGroupDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FacilityGroups', async () => {
    await navBarPage.goToEntity('facility-group');
    facilityGroupComponentsPage = new FacilityGroupComponentsPage();
    await browser.wait(ec.visibilityOf(facilityGroupComponentsPage.title), 5000);
    expect(await facilityGroupComponentsPage.getTitle()).to.eq('enotesApp.facilityGroup.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(facilityGroupComponentsPage.entities), ec.visibilityOf(facilityGroupComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FacilityGroup page', async () => {
    await facilityGroupComponentsPage.clickOnCreateButton();
    facilityGroupUpdatePage = new FacilityGroupUpdatePage();
    expect(await facilityGroupUpdatePage.getPageTitle()).to.eq('enotesApp.facilityGroup.home.createOrEditLabel');
    await facilityGroupUpdatePage.cancel();
  });

  it('should create and save FacilityGroups', async () => {
    const nbButtonsBeforeCreate = await facilityGroupComponentsPage.countDeleteButtons();

    await facilityGroupComponentsPage.clickOnCreateButton();

    await promise.all([facilityGroupUpdatePage.setNameInput('name'), facilityGroupUpdatePage.facilityGroupTypeSelectLastOption()]);

    expect(await facilityGroupUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await facilityGroupUpdatePage.save();
    expect(await facilityGroupUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await facilityGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last FacilityGroup', async () => {
    const nbButtonsBeforeDelete = await facilityGroupComponentsPage.countDeleteButtons();
    await facilityGroupComponentsPage.clickOnLastDeleteButton();

    facilityGroupDeleteDialog = new FacilityGroupDeleteDialog();
    expect(await facilityGroupDeleteDialog.getDialogTitle()).to.eq('enotesApp.facilityGroup.delete.question');
    await facilityGroupDeleteDialog.clickOnConfirmButton();

    expect(await facilityGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
