import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GenderComponentsPage, GenderDeleteDialog, GenderUpdatePage } from './gender.page-object';

const expect = chai.expect;

describe('Gender e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genderComponentsPage: GenderComponentsPage;
  let genderUpdatePage: GenderUpdatePage;
  let genderDeleteDialog: GenderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Genders', async () => {
    await navBarPage.goToEntity('gender');
    genderComponentsPage = new GenderComponentsPage();
    await browser.wait(ec.visibilityOf(genderComponentsPage.title), 5000);
    expect(await genderComponentsPage.getTitle()).to.eq('enotesApp.gender.home.title');
    await browser.wait(ec.or(ec.visibilityOf(genderComponentsPage.entities), ec.visibilityOf(genderComponentsPage.noResult)), 1000);
  });

  it('should load create Gender page', async () => {
    await genderComponentsPage.clickOnCreateButton();
    genderUpdatePage = new GenderUpdatePage();
    expect(await genderUpdatePage.getPageTitle()).to.eq('enotesApp.gender.home.createOrEditLabel');
    await genderUpdatePage.cancel();
  });

  it('should create and save Genders', async () => {
    const nbButtonsBeforeCreate = await genderComponentsPage.countDeleteButtons();

    await genderComponentsPage.clickOnCreateButton();

    await promise.all([genderUpdatePage.setNameInput('name')]);

    expect(await genderUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await genderUpdatePage.save();
    expect(await genderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await genderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Gender', async () => {
    const nbButtonsBeforeDelete = await genderComponentsPage.countDeleteButtons();
    await genderComponentsPage.clickOnLastDeleteButton();

    genderDeleteDialog = new GenderDeleteDialog();
    expect(await genderDeleteDialog.getDialogTitle()).to.eq('enotesApp.gender.delete.question');
    await genderDeleteDialog.clickOnConfirmButton();

    expect(await genderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
