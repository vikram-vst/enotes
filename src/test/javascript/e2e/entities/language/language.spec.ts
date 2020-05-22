import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LanguageComponentsPage, LanguageDeleteDialog, LanguageUpdatePage } from './language.page-object';

const expect = chai.expect;

describe('Language e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let languageComponentsPage: LanguageComponentsPage;
  let languageUpdatePage: LanguageUpdatePage;
  let languageDeleteDialog: LanguageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Languages', async () => {
    await navBarPage.goToEntity('language');
    languageComponentsPage = new LanguageComponentsPage();
    await browser.wait(ec.visibilityOf(languageComponentsPage.title), 5000);
    expect(await languageComponentsPage.getTitle()).to.eq('enotesApp.language.home.title');
    await browser.wait(ec.or(ec.visibilityOf(languageComponentsPage.entities), ec.visibilityOf(languageComponentsPage.noResult)), 1000);
  });

  it('should load create Language page', async () => {
    await languageComponentsPage.clickOnCreateButton();
    languageUpdatePage = new LanguageUpdatePage();
    expect(await languageUpdatePage.getPageTitle()).to.eq('enotesApp.language.home.createOrEditLabel');
    await languageUpdatePage.cancel();
  });

  it('should create and save Languages', async () => {
    const nbButtonsBeforeCreate = await languageComponentsPage.countDeleteButtons();

    await languageComponentsPage.clickOnCreateButton();

    await promise.all([languageUpdatePage.setIsoLanguageCodeInput('isoLanguageCode'), languageUpdatePage.setNameInput('name')]);

    expect(await languageUpdatePage.getIsoLanguageCodeInput()).to.eq(
      'isoLanguageCode',
      'Expected IsoLanguageCode value to be equals to isoLanguageCode'
    );
    expect(await languageUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await languageUpdatePage.save();
    expect(await languageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await languageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Language', async () => {
    const nbButtonsBeforeDelete = await languageComponentsPage.countDeleteButtons();
    await languageComponentsPage.clickOnLastDeleteButton();

    languageDeleteDialog = new LanguageDeleteDialog();
    expect(await languageDeleteDialog.getDialogTitle()).to.eq('enotesApp.language.delete.question');
    await languageDeleteDialog.clickOnConfirmButton();

    expect(await languageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
