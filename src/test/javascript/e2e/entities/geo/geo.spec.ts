import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeoComponentsPage, GeoDeleteDialog, GeoUpdatePage } from './geo.page-object';

const expect = chai.expect;

describe('Geo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let geoComponentsPage: GeoComponentsPage;
  let geoUpdatePage: GeoUpdatePage;
  let geoDeleteDialog: GeoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Geos', async () => {
    await navBarPage.goToEntity('geo');
    geoComponentsPage = new GeoComponentsPage();
    await browser.wait(ec.visibilityOf(geoComponentsPage.title), 5000);
    expect(await geoComponentsPage.getTitle()).to.eq('enotesApp.geo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(geoComponentsPage.entities), ec.visibilityOf(geoComponentsPage.noResult)), 1000);
  });

  it('should load create Geo page', async () => {
    await geoComponentsPage.clickOnCreateButton();
    geoUpdatePage = new GeoUpdatePage();
    expect(await geoUpdatePage.getPageTitle()).to.eq('enotesApp.geo.home.createOrEditLabel');
    await geoUpdatePage.cancel();
  });

  it('should create and save Geos', async () => {
    const nbButtonsBeforeCreate = await geoComponentsPage.countDeleteButtons();

    await geoComponentsPage.clickOnCreateButton();

    await promise.all([
      geoUpdatePage.setNameInput('name'),
      geoUpdatePage.setCodeInput('code'),
      geoUpdatePage.setAbbreviationInput('abbreviation'),
      geoUpdatePage.geoTypeSelectLastOption()
    ]);

    expect(await geoUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await geoUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await geoUpdatePage.getAbbreviationInput()).to.eq('abbreviation', 'Expected Abbreviation value to be equals to abbreviation');

    await geoUpdatePage.save();
    expect(await geoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await geoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Geo', async () => {
    const nbButtonsBeforeDelete = await geoComponentsPage.countDeleteButtons();
    await geoComponentsPage.clickOnLastDeleteButton();

    geoDeleteDialog = new GeoDeleteDialog();
    expect(await geoDeleteDialog.getDialogTitle()).to.eq('enotesApp.geo.delete.question');
    await geoDeleteDialog.clickOnConfirmButton();

    expect(await geoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
