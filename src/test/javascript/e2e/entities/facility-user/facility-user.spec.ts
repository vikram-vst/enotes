import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FacilityUserComponentsPage, FacilityUserDeleteDialog, FacilityUserUpdatePage } from './facility-user.page-object';

const expect = chai.expect;

describe('FacilityUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let facilityUserComponentsPage: FacilityUserComponentsPage;
  let facilityUserUpdatePage: FacilityUserUpdatePage;
  let facilityUserDeleteDialog: FacilityUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FacilityUsers', async () => {
    await navBarPage.goToEntity('facility-user');
    facilityUserComponentsPage = new FacilityUserComponentsPage();
    await browser.wait(ec.visibilityOf(facilityUserComponentsPage.title), 5000);
    expect(await facilityUserComponentsPage.getTitle()).to.eq('enotesApp.facilityUser.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(facilityUserComponentsPage.entities), ec.visibilityOf(facilityUserComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FacilityUser page', async () => {
    await facilityUserComponentsPage.clickOnCreateButton();
    facilityUserUpdatePage = new FacilityUserUpdatePage();
    expect(await facilityUserUpdatePage.getPageTitle()).to.eq('enotesApp.facilityUser.home.createOrEditLabel');
    await facilityUserUpdatePage.cancel();
  });

  it('should create and save FacilityUsers', async () => {
    const nbButtonsBeforeCreate = await facilityUserComponentsPage.countDeleteButtons();

    await facilityUserComponentsPage.clickOnCreateButton();

    await promise.all([
      facilityUserUpdatePage.setNameInput('name'),
      facilityUserUpdatePage.userSelectLastOption(),
      facilityUserUpdatePage.facilitySelectLastOption()
    ]);

    expect(await facilityUserUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await facilityUserUpdatePage.save();
    expect(await facilityUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await facilityUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last FacilityUser', async () => {
    const nbButtonsBeforeDelete = await facilityUserComponentsPage.countDeleteButtons();
    await facilityUserComponentsPage.clickOnLastDeleteButton();

    facilityUserDeleteDialog = new FacilityUserDeleteDialog();
    expect(await facilityUserDeleteDialog.getDialogTitle()).to.eq('enotesApp.facilityUser.delete.question');
    await facilityUserDeleteDialog.clickOnConfirmButton();

    expect(await facilityUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
